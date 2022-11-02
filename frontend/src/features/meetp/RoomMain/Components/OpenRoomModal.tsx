import {
    Button,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    ModalHeader,
    Text,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useMutation } from 'react-query';
import { createRooms } from 'Services';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { ModalButtons, setRoomLink } from 'features';

import { createRoomResponse, openRoomModalTypes } from 'Types';
import { AxiosResponse } from 'axios';

import ErrorToast from 'Utils/Toast/Error';

const OpenRoomModal = ({
    inputInitalRef,
    onClose,
    nextModal,
}: openRoomModalTypes) => {
    const [roomName, setRoomName] = useState('');
    const [roomType, setRoomType] = useState<'OPEN' | 'SOCIAL' | 'PRIVATE'>(
        'OPEN',
    );
    const { login } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(event.target.value);
    };

    const handleCreateRoom = async () => {
        login
            ? roomName === ''
                ? ErrorToast('Enter a valid name')
                : await mutateAsync()
            : ErrorToast('Login!');
    };

    const handleClose = () => {
        nextModal(1);
        onClose();
    };

    const { mutateAsync, isLoading } = useMutation<
        AxiosResponse<createRoomResponse>,
        Error
    >(() => createRooms(roomName, roomType), {
        onSuccess(data: AxiosResponse<createRoomResponse>) {
            dispatch(setRoomLink(data?.data));

            nextModal((value) => value + 1);
        },
        onError(error: Error) {
            console.log(error);
            ErrorToast('Failed');
        },
    });

    return (
        <>
            <ModalHeader
                justifyContent="space-between"
                alignItems="center"
                display="flex"
            >
                <Text fontSize="1.1rem" fontWeight="700">
                    Enter the topic to be discussed
                </Text>
                <ModalCloseButton
                    position="unset"
                    onClick={handleClose}
                    data-testid="create-room-modal-close"
                />
            </ModalHeader>

            <ModalBody pb={6}>
                <Input
                    px="2rem"
                    bg="main.input-bg"
                    color="main.text.white"
                    type="text"
                    borderRadius="0.4rem"
                    placeholder="Enter room name"
                    value={roomName}
                    onChange={handleRoomName}
                    ref={inputInitalRef}
                    data-testid="create-roomname-input"
                />

                <Text pt="5" fontWeight="700" fontSize="1.05rem">
                    Room Type
                </Text>

                <ModalButtons roomType={roomType} setRoomType={setRoomType} />
            </ModalBody>

            <ModalFooter
                justifyContent="center"
                alignItems="center"
                display="flex"
                gap="2rem"
                borderTop="2px solid black"
                borderColor="main.bg.sec"
                pt="1.5rem"
            >
                <Button
                    bg="main.blue"
                    textColor="white"
                    borderRadius="0.4rem"
                    minW="6rem"
                    _hover={{ bg: 'main.blue.hover' }}
                    onClick={handleCreateRoom}
                    fontWeight={600}
                    isLoading={isLoading}
                >
                    Lets Go
                </Button>

                <Button
                    w="6rem"
                    fontWeight={600}
                    onClick={handleClose}
                    borderRadius="0.4rem"
                >
                    Cancel
                </Button>
            </ModalFooter>
        </>
    );
};

export default OpenRoomModal;
