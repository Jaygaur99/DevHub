import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import { useMutation } from 'react-query';
import { executeCodebox } from 'Services';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import {
    SideDock,
    MonacoEditor,
    OutputArea,
    setSidebarComponent,
    ChatSide,
    UserSide,
    ShareSide,
    transformCode,
} from 'features';

import { Hook, Unhook } from 'console-feed';

import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import { AxiosResponse } from 'axios';
import { runCodeResponse, sidebarIcons } from 'Types';

import type { Message } from 'console-feed/lib/definitions/Component';

import ErrorToast from 'Utils/Toast/Error';

const sideBarIcons: sidebarIcons = [
    {
        type: 'USERS',
        tooltipLabel: 'Users',
        icon: 'users',
    },
    {
        type: 'CHAT',
        icon: 'chat',
        tooltipLabel: 'Chat',
    },
    {
        type: 'SHARE',
        tooltipLabel: 'Collaborate',
        icon: 'share',
    },
];

const LanguageCodebox = () => {
    const { language, allFiles } = useAppSelector((state) => state.codebox);
    const [inputContent, setInputContent] = useState('');
    const [outputContent, setOutputContent] = useState<Message[]>([]);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const { sidebarComponent } = useAppSelector((state) => state.codebox);
    const dispatch = useAppDispatch();

    const { mutateAsync, isLoading } = useMutation<
        AxiosResponse<runCodeResponse>,
        Error
    >(
        async () =>
            await executeCodebox(
                // @ts-ignore
                language,
                allFiles?.[Object.keys(allFiles)?.pop() ?? ''].code,
                inputContent,
            ),
        {
            onSuccess(data: AxiosResponse<runCodeResponse>) {
                Array.isArray(data.data.message)
                    ? data.data.message.forEach((message) =>
                          setOutputContent((prev) => [
                              ...prev,
                              {
                                  data: [message],
                                  id: Date.now().toString(),
                                  method: 'log',
                              },
                          ]),
                      )
                    : setOutputContent((prev) => [
                          ...prev,
                          {
                              data: [data.data.message],
                              id: Date.now().toString(),
                              method: 'log',
                          },
                      ]);
            },
            onError(error: Error) {
                console.log(error);
                ErrorToast('Failed');
            },
        },
    );

    const executeCode = async () => {
        const ext = Object.keys(allFiles).pop()?.split('.').at(-1);

        setOutputContent([]);

        if (ext === 'js' || ext === 'ts') {
            const result = await transformCode(
                allFiles?.[Object.keys(allFiles)?.pop() ?? ''].code ?? '',
                ext,
            );

            if (result.type === 'error') {
                setOutputContent(() => [
                    {
                        data: [result.code.toString()],
                        id: Date.now().toString(),
                        method: 'error',
                    },
                ]);
            } else if (iframeRef.current && result.type === 'code') {
                iframeRef.current.contentWindow?.document?.body
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

                setTimeout(() => {
                    iframeRef.current?.contentWindow?.postMessage(
                        result.code,
                        '*',
                    );
                }, 50);
            }
        } else {
            await mutateAsync();
        }
    };

    useEffect(() => {
        window.onmessage = (message: MessageEvent) => {
            if (message.data && message.data.source === 'iframe') {
                setOutputContent((prev) => [
                    ...prev,
                    {
                        data: [message.data.message.toString()],
                        id: Date.now().toString(),
                        method: 'error',
                    },
                ]);
            }
        };

        iframeRef.current?.contentWindow &&
            Hook(
                // @ts-ignore
                iframeRef.current.contentWindow?.console,
                (log: any) => {
                    setOutputContent((prev) => [
                        ...prev,
                        {
                            data: [...log.data],
                            id: String(
                                Date.now() + Math.floor(Math.random() * 100000),
                            ),
                            method: 'log',
                        },
                    ]);
                },
                false,
            );

        dispatch(setSidebarComponent({ component: 'Users' }));

        return () => {
            iframeRef.current?.contentWindow &&
                // @ts-ignore
                // eslint-disable-next-line react-hooks/exhaustive-deps
                Unhook(iframeRef.current.contentWindow?.console);
        };
    }, [dispatch]);

    return (
        <>
            <SideDock buttonsArray={sideBarIcons} />

            <Allotment maxSize={Infinity}>
                <Allotment.Pane
                    minSize={150}
                    maxSize={230}
                    preferredSize={200}
                    visible={sidebarComponent !== 'None'}
                >
                    <Box
                        flexDir="column"
                        flex="1"
                        display={
                            sidebarComponent !== 'None' ? 'inline-flex' : 'none'
                        }
                        height="100%"
                        width="100%"
                    >
                        {sidebarComponent === 'Users' && (
                            <>
                                <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    display="flex"
                                    flex="0"
                                    pt="4"
                                    pb="4"
                                    fontSize="large"
                                    fontWeight="semibold"
                                    paddingInline="6"
                                    alignContent="center"
                                >
                                    <Text textAlign="center">All Users</Text>
                                </Box>
                                <UserSide />
                            </>
                        )}
                        {sidebarComponent === 'Chat' && (
                            <>
                                <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    display="flex"
                                    flex="0"
                                    pt="4"
                                    pb="4"
                                    fontSize="large"
                                    fontWeight="semibold"
                                    paddingInline="6"
                                    alignContent="center"
                                >
                                    <Text textAlign="center">Chat Box</Text>
                                </Box>
                                <ChatSide />
                            </>
                        )}
                        {sidebarComponent === 'Collaborate' && (
                            <>
                                <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    display="flex"
                                    flex="0"
                                    pt="4"
                                    pb="4"
                                    fontSize="large"
                                    fontWeight="semibold"
                                    paddingInline="6"
                                    alignContent="center"
                                >
                                    <Text textAlign="center">Collaborate</Text>
                                </Box>
                                <ShareSide />
                            </>
                        )}
                    </Box>
                </Allotment.Pane>

                <Allotment.Pane minSize={200} preferredSize={'70%'}>
                    <MonacoEditor />
                </Allotment.Pane>

                <Allotment.Pane minSize={200} preferredSize={'30%'}>
                    <OutputArea
                        executeCode={executeCode}
                        inputContent={inputContent}
                        setInputContent={setInputContent}
                        outputContent={outputContent}
                        isExecutingCode={isLoading}
                        iframeRef={iframeRef}
                    />
                </Allotment.Pane>
            </Allotment>
        </>
    );
};

export default LanguageCodebox;
