import { Input, Text } from '@chakra-ui/react';

import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { AuthButton, LoadingButton } from 'Components';

import { AuthStepProps } from 'Types';

import { verifyEmail } from 'Services';

import ErrorToast from 'Utils/Toast/Error';

import { setEmail as setEmailDispatch } from 'features';
import { useAppDispatch } from 'store/hooks';

const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const StepEmail = ({ onClick }: AuthStepProps) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);

    const dispatch = useAppDispatch();

    const handleEmail = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;

        setEmail(newEmail);
        setIsValidEmail(emailRegex.test(newEmail));
    };

    const nextStep = async () => {
        isValidEmail
            ? await mutation.mutateAsync()
            : ErrorToast('Email is not valid');
    };

    const mutation = useMutation(() => verifyEmail(email), {
        onSuccess() {
            dispatch(
                setEmailDispatch({
                    email: email,
                    mobile: '',
                    authType: 'EMAIL',
                }),
            );
            onClick();
        },
        onError(error: any) {
            error?.response?.data?.message === 'Email is not registered'
                ? ErrorToast('Email is not registered')
                : ErrorToast('Failed');
        },
    });

    return (
        <>
            <Input
                placeholder="devhouse@gmail.com"
                maxWidth={{ ssm: '17rem ', sm: '15rem' }}
                bg="main.input-bg"
                color="main.text.white"
                type="email"
                _focus={{
                    boxShadow: `${
                        isValidEmail ? '0 0 0px 1px #3182ce' : '0 0 0 1px red'
                    }`,
                    borderColor: `${isValidEmail ? '#3182ce' : 'red'}`,
                    zIndex: '1',
                }}
                required={true}
                marginTop="1.6rem"
                value={email}
                onChange={handleEmail}
            />

            {mutation.isLoading ? (
                <LoadingButton marginTop="1.6rem" />
            ) : (
                <AuthButton
                    buttonText="Next"
                    marginTop="1.6rem"
                    onClick={nextStep}
                />
            )}

            <Text
                textAlign="center"
                fontSize={{ ssm: '0.8rem ', sm: '0.75rem' }}
                maxWidth="21rem"
                marginTop="1.2rem"
                color="main.text"
            >
                By entering your email, you’re agreeing to our Terms of Service
                and Privacy Policy. Thanks!
            </Text>
        </>
    );
};

export default StepEmail;
