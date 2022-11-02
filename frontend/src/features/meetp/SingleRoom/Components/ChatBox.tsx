import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Text,
    Textarea,
} from '@chakra-ui/react';

import { memo, useLayoutEffect, useRef } from 'react';
import { BiSend } from 'react-icons/bi';

import { SingleChat } from 'Components';

import { ChatBoxProps } from 'Types';

const ChatBox = ({
    chats,
    btnRef,
    isOpen,
    onClose,
    handleChatFunction,
}: ChatBoxProps) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        chatRef.current !== null &&
            (chatRef.current.scrollTop = chatRef.current.scrollHeight);
    }, [chats]);

    const handleNewChat = () => {
        if (inputRef.current?.value) {
            handleChatFunction(inputRef.current.value);
            inputRef.current.value = '';
        }
    };

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                initialFocusRef={inputRef}
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader
                        justifyContent="space-between"
                        alignItems="center"
                        display="flex"
                    >
                        <Text>Chat Box</Text>
                        <DrawerCloseButton position="unset" />
                    </DrawerHeader>

                    <DrawerBody
                        display="flex"
                        flexDirection="column"
                        gap="0.7rem"
                        scrollBehavior="smooth"
                        role="chat"
                        ref={chatRef}
                    >
                        {chats.length === 0 && (
                            <Box
                                height="100%"
                                display="flex"
                                alignItems="center"
                                justifyContent={'center'}
                            >
                                Start a conversation
                            </Box>
                        )}

                        {chats.length > 0 &&
                            chats?.map((chat) => (
                                <SingleChat
                                    username={chat.username}
                                    chatContent={chat.messageBody}
                                    key={chat.messageId}
                                />
                            ))}
                    </DrawerBody>

                    <DrawerFooter gap="0.7rem">
                        <Textarea
                            placeholder="Type here..."
                            ref={inputRef}
                            borderColor="blackAlpha.900"
                            zIndex="1"
                            _hover={{}}
                            height="2rem"
                            resize="none"
                            minH="2.6rem"
                            maxH="2.6rem"
                            className="hide-scrollbar"
                        />
                        <Button padding="1rem 0rem" onClick={handleNewChat}>
                            <BiSend fontSize="1.4rem" cursor="pointer" />
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default memo(ChatBox);
