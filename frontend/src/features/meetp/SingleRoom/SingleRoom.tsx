import { Box, Container, Flex, Text, useDisclosure } from '@chakra-ui/react';

import { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { singleRoom } from 'Services';

import { BsArrowLeftShort } from 'react-icons/bs';

import {
    Container as MainContainer,
    ContainerLoader,
    MainLoader,
    NotFoundTemplate,
} from 'Components';
import {
    ChatBox,
    SingleRoomUsers,
    Controls,
    setRoom,
    resetUserAuthRoom,
    PasswordModal,
} from 'features';

import useSingleRoomWebRtc from 'Hooks/useSingleRoomWebRtc';

import { AxiosResponse } from 'axios';
import { createRoomResponse } from 'Types';

import ErrorToast from 'Utils/Toast/Error';

const SingleRoom = () => {
    const { roomId } = useParams();

    const btnRef = useRef<HTMLButtonElement | null>(null);
    const { onOpen, isOpen, onClose } = useDisclosure();

    const dispatch = useAppDispatch();
    const { name } = useAppSelector((state) => state.rooms);
    const { authenticated, room_id } = useAppSelector((state) => state.rooms);
    const user = useAppSelector((state) => state.auth);
    const { users, chats, handleMuted, addAudioRef, handleNewChat } =
        useSingleRoomWebRtc(
            // @ts-ignore
            roomId,
            {
                photo: user.photo,
                userId: user.userId,
                username: user.username,
                muted: true,
            },
        );
    const navigate = useNavigate();

    const { isLoading, isError } = useQuery<
        AxiosResponse<createRoomResponse>,
        Error
    >(
        'rooms/singleRoom',
        // @ts-ignore
        async () => await singleRoom(roomId),
        {
            retry: 1,
            refetchOnWindowFocus: false,
            onSuccess: (data: AxiosResponse<createRoomResponse>) => {
                dispatch(setRoom(data.data));
            },
            onError: (error: Error) => {
                console.log(error);
                ErrorToast('Failed');
            },
        },
    );

    const handleBackButton = () => {
        navigate('/meetp');
    };

    useEffect(() => {
        return () => {
            dispatch(resetUserAuthRoom());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <MainLoader />;
    } else if (isError) {
        return (
            <NotFoundTemplate
                mainContent="Room Not Found"
                buttonText="Go To Rooms"
                buttonLink="/meetp"
            />
        );
    }

    return (
        <>
            <MainContainer marginBottom="0">
                <Container paddingTop="2rem" maxW="container.xl">
                    <Flex alignItems="center" gap="0.8rem">
                        <Link to="/meetp">
                            <BsArrowLeftShort
                                fontSize={'1.5rem'}
                                onClick={handleBackButton}
                            />
                        </Link>
                        <Box width="5rem">
                            <Text textAlign="center">All rooms</Text>
                            <Box
                                borderBottom="3px solid"
                                borderBottomColor="main.blue"
                                borderRadius="1.4rem"
                            ></Box>
                        </Box>
                    </Flex>
                </Container>

                <Container
                    marginTop="3rem"
                    maxW="100%"
                    bg="main.bg.sec"
                    flex="1 1 0%"
                    borderRadius="1rem 1rem 0rem 0rem"
                    paddingTop="2rem"
                    position="relative"
                >
                    {authenticated === 'NOTAUTHENTICATED' && (
                        <ContainerLoader />
                    )}

                    {authenticated === 'AUTHENTICATED' && (
                        <Container maxW="container.xl">
                            <Text
                                textAlign="center"
                                maxW="100%"
                                fontSize="1.2rem"
                                fontWeight="700"
                                data-testid="room-name"
                            >
                                {name}
                            </Text>

                            <SingleRoomUsers
                                users={users}
                                addAudioRef={addAudioRef}
                            />
                            <Controls
                                btnRef={btnRef}
                                onOpen={onOpen}
                                handleMuted={handleMuted}
                                userId={user.userId}
                            />
                        </Container>
                    )}
                </Container>

                <ChatBox
                    chats={chats}
                    btnRef={btnRef}
                    isOpen={isOpen}
                    onClose={onClose}
                    handleChatFunction={handleNewChat}
                />
            </MainContainer>
            {room_id && <PasswordModal />}
        </>
    );
};

export default SingleRoom;
