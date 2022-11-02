import {
    Box,
    Button,
    Container,
    Flex,
    Text,
    useDisclosure,
} from '@chakra-ui/react';

import { useRef } from 'react';

import { BottomContainer, Container as MainContainer } from 'Components';

import { AllRooms, CreateRoomModal } from 'features';
import JoinRoomModal from './Components/JoinRoomModal';

const Rooms = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const roomRef = useRef<HTMLInputElement>(null);
    const {
        isOpen: isOpenJoinRoom,
        onClose: onCloseJoinRoom,
        onOpen: onOpenJoinRoom,
    } = useDisclosure();
    const joinRoomRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <MainContainer marginBottom="0">
                <Container paddingTop="2rem" maxW="container.xl">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Flex
                            gap={{ md: '1rem', lg: '1.5rem' }}
                            alignItems="flex-end"
                        >
                            <Box width={{ ssm: '5rem', md: '6rem' }}>
                                <Text textAlign="center">All rooms</Text>
                                <Box
                                    borderBottom="3px solid"
                                    borderBottomColor="main.blue"
                                    borderRadius="1.4rem"
                                ></Box>
                            </Box>
                        </Flex>
                        <Box>
                            <Button
                                bg="main.blue"
                                textColor="white"
                                borderRadius="0.4rem"
                                _focus={{}}
                                _active={{}}
                                _hover={{ bg: 'main.blue.hover' }}
                                onClick={onOpen}
                                marginRight="0.5rem"
                                data-testid="start-room-button"
                            >
                                Start room
                            </Button>

                            <Button
                                bg="main.blue"
                                textColor="white"
                                borderRadius="0.4rem"
                                _focus={{}}
                                _active={{}}
                                _hover={{ bg: 'main.blue.hover' }}
                                onClick={onOpenJoinRoom}
                                data-testid="join-room-button"
                            >
                                Join room
                            </Button>
                        </Box>
                    </Flex>
                </Container>

                <CreateRoomModal
                    isOpen={isOpen}
                    onClose={onClose}
                    key="CreateRoomModal"
                    inputInitalRef={roomRef}
                />

                <JoinRoomModal
                    isOpen={isOpenJoinRoom}
                    onClose={onCloseJoinRoom}
                    inputInitalRef={joinRoomRef}
                    key="joinRoomModal"
                />

                <AllRooms />
            </MainContainer>

            <BottomContainer />
        </>
    );
};

export default Rooms;
