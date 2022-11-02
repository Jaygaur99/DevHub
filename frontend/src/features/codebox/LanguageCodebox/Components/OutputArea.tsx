import { Box, Button, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { memo } from 'react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { InputField, formatCode, resetCodeFn } from 'features';

import { outputMonacoArea } from 'Types';
import { Console } from 'console-feed';
import { ErrorBoundary } from 'react-error-boundary';

const OutputArea = ({
    executeCode,
    inputContent,
    outputContent,
    setInputContent,
    isExecutingCode,
    iframeRef,
}: outputMonacoArea) => {
    const { language, selectedFile, allFiles, codeBoxType, codebox_id } =
        useAppSelector((state) => state.codebox);
    const dispatch = useAppDispatch();

    return (
        <Box
            display="flex"
            flexDir="column"
            flex="1 1 0px"
            px="0.5rem"
            minW="20%"
            height="100%"
        >
            <Box
                p="0.5rem"
                minW={{ sm: '20%', md: '40%' }}
                width="100%"
                display="flex"
                alignItems="center"
                gap="0.7rem"
                flexWrap="wrap"
                justifyContent="center"
            >
                <Tooltip label="Run Code">
                    <Button
                        bg="rgb(249, 249, 249)"
                        onClick={executeCode}
                        isLoading={isExecutingCode}
                        _loading={{
                            color: '#30baee',
                            fontWeight: '600',
                            fontSize: '1.2rem',
                        }}
                    >
                        Run
                    </Button>
                </Tooltip>

                <Tooltip label="Format Code">
                    <Button
                        bg="rgb(249, 249, 249)"
                        p="0rem"
                        onClick={() =>
                            formatCode(
                                dispatch,
                                selectedFile,
                                codebox_id,
                                allFiles,
                            )
                        }
                    >
                        <Image
                            src={`/images/prettier.svg`}
                            alt="logo"
                            boxSize="1.4rem"
                            _hover={{ bgColor: 'gray.200' }}
                            _focus={{ boxShadow: 'shadow.outline' }}
                        />
                    </Button>
                </Tooltip>

                <Tooltip label="Reset Code">
                    <Button
                        bg="rgb(249, 249, 249)"
                        p="0rem"
                        onClick={() =>
                            resetCodeFn(
                                true,
                                dispatch,
                                language,
                                codeBoxType,
                                codebox_id,
                            )
                        }
                    >
                        <Image
                            src={`/images/reset.svg`}
                            alt="logo"
                            boxSize="1.4rem"
                            _hover={{ bgColor: 'gray.200' }}
                            _focus={{ boxShadow: 'shadow.outline' }}
                        />
                    </Button>
                </Tooltip>
            </Box>

            <Flex flexDir="column" flex="1 1 0px" height="auto">
                <InputField
                    label="Input -"
                    value={inputContent}
                    setValue={setInputContent}
                    readonly={false}
                />
                <Flex height="50%" width="100%" flexDir="column" pt="2" pb="3">
                    <Text as="p" paddingInline="2" mb="2" fontWeight="semibold">
                        Output:-
                    </Text>

                    <Box overflow="auto" height="100%">
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            resetKeys={[outputContent]}
                        >
                            <Console
                                styles={{
                                    BASE_FONT_FAMILY:
                                        'League Mono, sans-serif;',
                                    BASE_FONT_SIZE: 13,
                                    LOG_ERROR_COLOR: 'hsl(0deg 99% 57% / 90%)',
                                    LOG_WARN_COLOR: 'hsl(60deg 91% 57% / 90%)',
                                }}
                                logs={outputContent}
                                variant="light"
                            />
                        </ErrorBoundary>
                    </Box>
                </Flex>
                <iframe
                    height="0"
                    width="0"
                    ref={iframeRef}
                    title="code-runner"
                    style={{ display: 'none' }}
                ></iframe>
            </Flex>
        </Box>
    );
};

const ErrorFallback = memo(({ error }: { error: Error }) => {
    return (
        <Flex p="4" flexDir="column" textAlign="center" gap="2">
            <Text as="span" color="red">
                Something went wrong
            </Text>
        </Flex>
    );
});

export default OutputArea;
