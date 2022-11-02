import { Button, Flex, Icon, Text, Tooltip } from '@chakra-ui/react';
import { memo, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { IconType } from 'react-icons/lib';
import { FiSkipBack } from 'react-icons/fi';
import { RiRefreshLine } from 'react-icons/ri';
import { SiPrettier } from 'react-icons/si';

import { ErrorBoundary } from 'react-error-boundary';

import { Hook, Unhook } from 'console-feed';

import {
    formatCode as formatCodeFn,
    resetCodeFn,
    setConsoleLogs,
    PreviewError,
    PreviewLoader,
    compileCode,
    compileError,
} from 'features';
import { isJSON } from 'Utils/Files';

const Preview = () => {
    const dispatch = useAppDispatch();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const {
        language,
        selectedFile,
        codeBoxType,
        codebox_id,
        allFiles,
        outputCode,
        outputCss,
        initializationCompilationState,
        esbuildReady,
        outputInitError,
    } = useAppSelector((state) => state.codebox);

    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    const refreshPanel = () => {
        setIsRefreshing(true);

        compileCode(dispatch, allFiles);

        setTimeout(() => {
            setIsRefreshing(false);
        }, 2000);
    };

    useEffect(() => {
        window.onmessage = (message: MessageEvent) => {
            if (message.data && message.data.source === 'iframe') {
                dispatch(
                    compileError({
                        message: message.data.message.toString(),
                    }),
                );
                dispatch(
                    setConsoleLogs({
                        data: [`${message.data.message}`],
                        id: `${message.timeStamp}`,
                        method: 'error',
                    }),
                );
            }
        };

        iframeRef.current?.contentWindow &&
            Hook(
                // @ts-ignore
                iframeRef.current.contentWindow?.console,
                (log: any) => {
                    dispatch(setConsoleLogs(log));
                },
                false,
            );

        return () => {
            iframeRef.current?.contentWindow &&
                // @ts-ignore
                // eslint-disable-next-line react-hooks/exhaustive-deps
                Unhook(iframeRef.current.contentWindow?.console);
        };
    }, [dispatch]);

    useEffect(() => {
        let previewPostCode: ReturnType<typeof setTimeout> | null = null;

        // check if file exists
        if (
            iframeRef.current?.contentWindow &&
            esbuildReady &&
            isJSON(allFiles?.['/buildConfig.json']?.code) &&
            allFiles?.[
                JSON.parse(allFiles['/buildConfig.json'].code)?.entry_html_file
            ]?.code
        ) {
            //   add html style and script
            iframeRef.current.contentWindow.document.open();
            iframeRef.current.contentWindow.document.writeln(
                allFiles[
                    JSON.parse(allFiles['/buildConfig.json'].code)
                        .entry_html_file
                ].code,
            );
            iframeRef.current.contentWindow.document.head
                .appendChild(document.createElement('style'))
                .appendChild(document.createTextNode(outputCss));
            iframeRef.current.contentWindow.document.body
                .appendChild(document.createElement('script'))
                .appendChild(
                    document.createTextNode(`
                    window.onerror = function (err) {
                        window.parent.postMessage(
                          { source: "iframe", type: "iframe_error", message: err },
                          "*"
                        );
                      };
        
                    window.onunhandledrejection = function (err) {
                        window.parent.postMessage(
                            { source: "iframe", type: "iframe_error", message: err.reason },
                            "*"
                        );
                    };
        
                    window.onmessage = function (event) {
                        try {
                          eval(event.data);
                        } catch (error) {
                           throw error;
                        }
                    };`),
                );
            iframeRef.current.contentWindow.document.close();

            // add js
            previewPostCode = setTimeout(() => {
                iframeRef.current?.contentWindow?.postMessage(outputCode, '*');
            }, 100);
        } else {
            esbuildReady &&
                iframeRef.current &&
                dispatch(
                    compileError({
                        message: 'Check buildConfig.json for entry_html_file',
                    }),
                );
        }

        return () => {
            previewPostCode && clearTimeout(previewPostCode);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, esbuildReady, outputCode, outputCss]);

    useEffect(() => {
        if (
            allFiles &&
            esbuildReady &&
            initializationCompilationState !== 'COMPILING'
        ) {
            compileCode(dispatch, allFiles);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allFiles, esbuildReady]);

    const resetCode = () =>
        resetCodeFn(true, dispatch, language, codeBoxType, codebox_id);

    const formatCode = () =>
        formatCodeFn(dispatch, selectedFile, codebox_id, allFiles);

    return (
        <>
            <Flex
                flex="1"
                flexDir="column"
                height="100%"
                width="100%"
                pos="relative"
            >
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    color="hsl(210deg,10%,40%)"
                    borderBottom="2px  solid  hsl(210deg,14%,66%)"
                    padding="0.2rem 0.8rem"
                    overflowY="hidden"
                    overflowX="auto"
                    className="hide-scrollbar"
                    gap="2rem"
                    pos="relative"
                    minHeight="2.1rem"
                >
                    <Text
                        textTransform="uppercase"
                        fontSize="1rem"
                        fontWeight="700"
                        lineHeight="25px"
                    >
                        RESULT
                    </Text>

                    <Flex alignItems="center" gap="1rem">
                        <PreviewIcon
                            height="1.2rem"
                            icon={RiRefreshLine}
                            tooltipLabel="Refresh"
                            key="refresh screen"
                            onClick={refreshPanel}
                            className={isRefreshing ? 'buttonLoading' : ''}
                        />

                        <PreviewIcon
                            height="1rem"
                            icon={SiPrettier}
                            tooltipLabel="Format"
                            key="format code"
                            onClick={formatCode}
                        />

                        <PreviewIcon
                            height="1.2rem"
                            icon={FiSkipBack}
                            tooltipLabel="Reset"
                            key="reset code"
                            onClick={resetCode}
                        />
                    </Flex>
                </Flex>

                <Flex
                    height="100%"
                    flex="1"
                    pos="relative"
                    borderRadius="0.2rem"
                    background="inherit"
                    width="100%"
                    maxWidth="100%"
                    h="100%"
                    margin="0"
                    overflow="auto"
                >
                    {initializationCompilationState === 'COMPILING' && (
                        <PreviewLoader />
                    )}

                    {outputInitError &&
                        initializationCompilationState === 'COMPILED' && (
                            <>
                                <PreviewError />
                            </>
                        )}

                    <ErrorBoundary
                        FallbackComponent={ErrorFallback}
                        onReset={() => compileCode(dispatch, allFiles)}
                        resetKeys={[outputCode, outputCss]}
                    >
                        <iframe
                            className="iframe"
                            title="code-runner"
                            frameBorder="0"
                            loading="lazy"
                            scrolling="auto"
                            src="about:blank"
                            ref={iframeRef}
                            allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
                            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                        ></iframe>
                    </ErrorBoundary>
                </Flex>
            </Flex>
        </>
    );
};

const PreviewIcon = memo(
    ({
        tooltipLabel,
        icon,
        height,
        onClick,
        className,
    }: {
        tooltipLabel: 'Format' | 'Reset' | 'Refresh';
        icon: IconType;
        height: string;
        className?: string;
        onClick: () => void;
    }) => {
        const { initializationCompilationState } = useAppSelector(
            (state) => state.codebox,
        );

        return (
            <>
                <Tooltip label={tooltipLabel}>
                    <button className={`button ${className}`} onClick={onClick}>
                        <Icon
                            as={icon}
                            height={height}
                            width={height}
                            _hover={{
                                transform: 'scale(1.2)',
                                opacity: '1',
                            }}
                            opacity="0.8"
                            transition="transform 200ms cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s, opacity 200ms ease-in-out 100ms"
                            animation={`1s cubic-bezier(0.22, 0.29, 0.12, 2) 1s 1 normal backwards ${
                                initializationCompilationState === 'COMPILING'
                                    ? 'running'
                                    : ''
                            } icon`}
                        />
                    </button>
                </Tooltip>
            </>
        );
    },
);

const ErrorFallback = memo(
    ({
        error,
        resetErrorBoundary,
    }: {
        error: Error;
        resetErrorBoundary: () => void;
    }) => {
        return (
            <Flex p="4" flexDir="column" textAlign="center" gap="2">
                <Text as="span" color="red">
                    Something went wrong
                </Text>
                <Button onClick={resetErrorBoundary}>Try again</Button>
            </Flex>
        );
    },
);

export default memo(Preview);
