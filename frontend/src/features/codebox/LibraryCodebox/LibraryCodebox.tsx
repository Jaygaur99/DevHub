import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import {
    SideDock,
    MonacoEditor,
    Preview,
    ConsolePanel,
    LibraryFooter,
    setSidebarComponent,
    ChatSide,
    UserSide,
    ShareSide,
    FileSide,
} from 'features';

import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import { sidebarIcons } from 'Types';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const sideBarIcons: sidebarIcons = [
    { type: 'FILES', icon: 'files', tooltipLabel: 'Files' },
    { type: 'USERS', tooltipLabel: 'Users', icon: 'users' },
    { type: 'CHAT', icon: 'chat', tooltipLabel: 'Chat' },
    { type: 'SHARE', tooltipLabel: 'Collaborate', icon: 'share' },
];

const LibraryCodebox = () => {
    const [consoleVisible, setConsoleVisible] = useState(false);
    const dispatch = useAppDispatch();
    const { sidebarComponent } = useAppSelector((state) => state.codebox);

    const handleConsoleVisible = () => {
        setConsoleVisible(!consoleVisible);
    };

    useEffect(() => {
        dispatch(setSidebarComponent({ component: 'Files' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Flex flexDir="column" flex="1">
                <Flex flex="1">
                    <SideDock buttonsArray={sideBarIcons} />

                    <Allotment maxSize={Infinity}>
                        <Allotment.Pane
                            minSize={190}
                            maxSize={280}
                            preferredSize={190}
                            visible={sidebarComponent !== 'None'}
                        >
                            <Box
                                flexDir="column"
                                flex="1"
                                display={
                                    sidebarComponent !== 'None'
                                        ? 'inline-flex'
                                        : 'none'
                                }
                                height="100%"
                                width="100%"
                            >
                                {sidebarComponent === 'Files' && (
                                    <Box
                                        flex="1"
                                        pb="4"
                                        overflowY="auto"
                                        className="hide-scrollbar"
                                    >
                                        <FileSide />
                                    </Box>
                                )}
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
                                            <Text textAlign="center">
                                                All Users
                                            </Text>
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
                                            <Text textAlign="center">
                                                Chat Box
                                            </Text>
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
                                            <Text textAlign="center">
                                                Collaborate
                                            </Text>
                                        </Box>
                                        <ShareSide />
                                    </>
                                )}
                            </Box>
                        </Allotment.Pane>

                        <Allotment.Pane minSize={230} preferredSize={'50%'}>
                            <MonacoEditor />
                        </Allotment.Pane>

                        <Allotment.Pane minSize={230}>
                            <Allotment vertical={true}>
                                <Allotment.Pane preferredSize="75%">
                                    <Preview />
                                </Allotment.Pane>

                                <Allotment.Pane
                                    minSize={60}
                                    snap
                                    visible={consoleVisible}
                                >
                                    <ConsolePanel />
                                </Allotment.Pane>
                            </Allotment>
                        </Allotment.Pane>
                    </Allotment>
                </Flex>

                <LibraryFooter handleConsoleVisiblity={handleConsoleVisible} />
            </Flex>
        </>
    );
};

export default LibraryCodebox;
