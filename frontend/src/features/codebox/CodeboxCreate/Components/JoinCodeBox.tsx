import { Input } from '@chakra-ui/react';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { joinCodebox } from 'Services';

import { AuthButton, LoadingButton } from 'Components';

import { codeBoxCreateResponse } from 'Types';
import { AxiosResponse } from 'axios';

import ErrorToast from 'Utils/Toast/Error';

const JoinCodeBox = () => {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(event.target.value);
    };

    const { mutateAsync, isLoading } = useMutation<
        AxiosResponse<codeBoxCreateResponse>,
        Error
    >(() => joinCodebox(roomId), {
        onSuccess(data: AxiosResponse<codeBoxCreateResponse>) {
            navigate(`/code-box/${data.data.room.codebox_id}`);
        },
        onError(error: Error) {
            console.log(error);
            ErrorToast('Failed');
        },
    });

    const handleCreateCodebox = async () => {
        roomId === '' ? ErrorToast('Enter a valid name') : await mutateAsync();
    };

    return (
        <>
            <Input
                placeholder="Codebox Id..."
                maxWidth="20rem"
                bg="main.input-bg"
                color="main.text.white"
                type="email"
                required={true}
                marginTop="5"
                value={roomId}
                onChange={handleRoomIdChange}
            />
            {isLoading ? (
                <LoadingButton marginTop="1.6rem" />
            ) : (
                <AuthButton
                    buttonText="Next"
                    marginTop="1.1rem"
                    onClick={handleCreateCodebox}
                />
            )}
        </>
    );
};

export default JoinCodeBox;
