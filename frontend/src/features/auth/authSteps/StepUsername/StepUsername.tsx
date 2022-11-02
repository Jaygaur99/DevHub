import { Input, Text } from '@chakra-ui/react';

import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setUsername as setUsernameDisptach } from 'features';

import { AuthButton, Card, LoadingButton } from 'Components';

import { checkUsername } from 'Services';

import ErrorToast from 'Utils/Toast/Error';

import { AuthStepProps } from 'Types';

const StepUsername = ({ onClick }: AuthStepProps) => {
    const { username: globalUsername } = useAppSelector(
        (state) => state.activate,
    );
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState(globalUsername);

    const handleUsernameChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setUsername(event.target.value);
    };

    const handleNext = async () => {
        if (username === '') {
            ErrorToast('Fill Valid Username');
            return;
        } else if (username.length >= 40) {
            ErrorToast('Username cannot be greater than 40');
            return;
        }

        await mutation.mutateAsync();
    };

    const mutation = useMutation(() => checkUsername(username), {
        onSuccess() {
            dispatch(setUsernameDisptach({ username }));
            onClick();
        },
        onError(error: any) {
            error?.response?.data?.message === 'Username already exits'
                ? ErrorToast('Username already exits')
                : ErrorToast('Failed');
        },
    });

    return (
        <>
            <Card
                icon="username"
                title="Pick a username"
                key={'namecard'}
                dataTestId="activate-username-card"
            >
                <Input
                    placeholder="@"
                    px="2rem"
                    maxWidth="18rem"
                    bg="main.input-bg"
                    color="main.text.white"
                    type="text"
                    required={true}
                    marginTop="1.4rem"
                    value={username}
                    onChange={handleUsernameChange}
                />

                <Text
                    textAlign="center"
                    fontSize="0.95rem"
                    fontWeight="500"
                    maxWidth="15rem"
                    marginTop={{ ssm: '1.7rem', sm: '1.3rem' }}
                >
                    Username can be used for login
                </Text>
                {mutation.isLoading ? (
                    <LoadingButton marginTop="1.7rem" />
                ) : (
                    <AuthButton
                        onClick={handleNext}
                        buttonText="Next"
                        marginTop="1.7rem"
                    />
                )}
            </Card>
        </>
    );
};

export default StepUsername;
