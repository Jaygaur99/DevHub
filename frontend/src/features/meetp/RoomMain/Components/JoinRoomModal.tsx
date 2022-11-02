import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BsEye, BsEyeSlash } from 'react-icons/bs';

import { useMutation } from 'react-query';
import { setUserRoomJoined } from 'features';
import { useAppDispatch } from 'store/hooks';
import { verifyRoomPassword } from 'Services';

import { AxiosResponse } from 'axios';
import { CreateRoomModalProps } from 'Types';

import ErrorToast from 'Utils/Toast/Error';

const JoinRoomModal = ({
    inputInitalRef,
    isOpen,
    onClose,
}: CreateRoomModalProps) => {
    const [roomId, setRoomId] = useState('');
    const [roomPassword, setRoomPassword] = useState('');
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const toggleConfirmPassword = () =>
        setConfirmPasswordShow(!confirmPasswordShow);

    const handleChange = (
        type: 'roomId' | 'roomPassword',
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (type === 'roomId') {
            setRoomId(event.target.value);
        } else {
            setRoomPassword(event.target.value);
        }
    };

    const { mutateAsync, isLoading } = useMutation<AxiosResponse<any>, Error>(
        () => verifyRoomPassword(roomId, roomPassword),
        {
            onSuccess() {
                dispatch(setUserRoomJoined());
                navigate(`/meetp/${roomId}`);
            },
            onError(error: Error) {
                console.log(error);
                ErrorToast('Wrong Password');
            },
        },
    );

    const handleJoinRoom = async () => {
        if (roomId === '') {
            ErrorToast('Fill all details');
            return;
        }

        await mutateAsync();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount
                isCentered
                initialFocusRef={inputInitalRef}
                closeOnOverlayClick={false}
            >
                <ModalOverlay backdropFilter="blur(3px)" />

                <ModalContent data-testid="join-room-modal">
                    <ModalHeader
                        justifyContent="space-between"
                        alignItems="center"
                        display="flex"
                    >
                        <Text fontSize="1.1rem" fontWeight="700">
                            Join Room
                        </Text>
                        <ModalCloseButton
                            position="unset"
                            data-testid="join-room-modal-close"
                        />
                    </ModalHeader>

                    <ModalBody pb="1.5rem">
                        <Box width="100%">
                            <Text
                                fontWeight="600"
                                fontSize="0.95rem"
                                marginBottom="0.2rem"
                            >
                                Room Id
                            </Text>
                            <Input
                                px="2rem"
                                width="100%"
                                type={'text'}
                                placeholder="Enter room id..."
                                bg="main.input-bg"
                                color="main.text.white"
                                required={true}
                                borderRadius="0.4rem"
                                value={roomId}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                    handleChange('roomId', event);
                                }}
                                ref={inputInitalRef}
                                data-testid="create-roomid-input"
                            />
                        </Box>

                        <Box marginTop="1.6rem" width="100%">
                            <Text
                                fontWeight="600"
                                fontSize="0.95rem"
                                marginBottom="0.2rem"
                            >
                                Confirm Password
                            </Text>
                            <InputGroup>
                                <Input
                                    px="2rem"
                                    type={
                                        confirmPasswordShow
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Enter room password..."
                                    bg="main.input-bg"
                                    color="main.text.white"
                                    required={true}
                                    borderRadius="0.4rem"
                                    value={roomPassword}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        handleChange('roomPassword', event);
                                    }}
                                    data-testid="create-roompassword-input"
                                />
                                <InputRightElement
                                    width="3rem"
                                    color="main.text.white"
                                    onClick={toggleConfirmPassword}
                                >
                                    {confirmPasswordShow ? (
                                        <BsEye
                                            cursor="pointer"
                                            fontSize="1.3rem"
                                        />
                                    ) : (
                                        <BsEyeSlash
                                            cursor="pointer"
                                            fontSize="1.3rem"
                                        />
                                    )}
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                    </ModalBody>

                    <ModalFooter
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                        gap="2rem"
                        borderTop="2px solid black"
                        borderColor="main.bg.sec"
                        pt="1rem"
                    >
                        <Button
                            bg="main.blue"
                            textColor="white"
                            borderRadius="1.4rem"
                            minW="6rem"
                            _hover={{ bg: 'main.blue.hover' }}
                            onClick={handleJoinRoom}
                            fontWeight={600}
                            isLoading={isLoading}
                            data-testid="join-room-submit-button"
                        >
                            Join Room
                        </Button>

                        <Button
                            w="6rem"
                            fontWeight={600}
                            onClick={onClose}
                            borderRadius="1.4rem"
                            data-testid="cancel-join-room-button"
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default JoinRoomModal;
