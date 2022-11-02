import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { BsArrowLeftShort } from 'react-icons/bs';

import React, { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyRoomPassword } from 'Services';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setUserRoomJoined } from 'features';

import { AxiosResponse } from 'axios';

import ErrorToast from 'Utils/Toast/Error';

const PasswordModal = () => {
    const { onClose } = useDisclosure();
    const { authenticated } = useAppSelector((state) => state.rooms);
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState('');
    const { roomId } = useParams();
    const navigate = useNavigate();
    const passwordRefFocus = useRef(null);

    const { mutateAsync, isLoading } = useMutation<AxiosResponse<any>, Error>(
        // @ts-ignore
        () => verifyRoomPassword(roomId, password),
        {
            onSuccess() {
                dispatch(setUserRoomJoined());
            },
            onError(error: Error) {
                console.log(error);
                ErrorToast('Wrong Password');
            },
        },
    );

    const handleSubmitPassword = async () => {
        mutateAsync();
    };

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPassword(event.target.value);
    };

    const handleBackButton = () => {
        navigate('/meetp');
    };

    return (
        <>
            <Modal
                isOpen={authenticated === 'NOTAUTHENTICATED'}
                onClose={onClose}
                blockScrollOnMount={false}
                isCentered
                closeOnOverlayClick={false}
                size={'md'}
                initialFocusRef={passwordRefFocus}
            >
                <ModalOverlay backdropFilter="blur(4px)" />

                <ModalContent>
                    <ModalHeader
                        justifyContent="space-between"
                        alignItems="center"
                        display="flex"
                        textAlign={'center'}
                        fontSize="1.1rem"
                        fontWeight="700"
                        margin="auto"
                    >
                        <Button
                            alignItems="center"
                            display="flex"
                            justifyContent="center"
                            flexShrink="0"
                            width="32px"
                            height="32px"
                            borderRadius="md"
                            position="absolute"
                            top="3"
                            left="6"
                            padding="0"
                            onClick={handleBackButton}
                        >
                            <BsArrowLeftShort fontSize="1.7rem" />
                        </Button>
                        Enter password to enter
                    </ModalHeader>

                    <ModalBody pb="1.5rem">
                        <Input
                            placeholder="Password....."
                            bg="main.input-bg"
                            color="main.text.white"
                            type="email"
                            required={true}
                            marginTop="1rem"
                            value={password}
                            onChange={handlePasswordChange}
                            ref={passwordRefFocus}
                        />

                        <Button
                            isLoading={isLoading}
                            loadingText="Submitting"
                            colorScheme="teal"
                            variant="outline"
                            fontSize={{ ssm: '1rem ', sm: '0.96rem' }}
                            fontWeight={600}
                            px="2rem"
                            color="white"
                            bg="main.blue"
                            marginTop="1rem"
                            _active={{}}
                            _hover={{}}
                            width="100%"
                            onClick={handleSubmitPassword}
                        >
                            Submit
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PasswordModal;
