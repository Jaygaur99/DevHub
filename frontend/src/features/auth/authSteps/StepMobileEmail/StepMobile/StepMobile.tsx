import { Input, Text } from '@chakra-ui/react';

import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { AuthButton, LoadingButton } from 'Components';

import { checkMobile } from 'Services';

import { useAppDispatch } from 'store/hooks';
import { setEmail as setEmailDispatch } from 'features';

import { AuthStepProps } from 'Types';

import ErrorToast from 'Utils/Toast/Error';

const StepMobile = ({ onClick }: AuthStepProps) => {
    const [mobile, setMobile] = useState('');
    const dispatch = useAppDispatch();

    const handleMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMobile(event.target.value);
    };

    const nextStep = async () => {
        mobile.length >= 10
            ? await mutation.mutateAsync()
            : ErrorToast('Mobile Number is not valid');
    };

    const mutation = useMutation(() => checkMobile(mobile), {
        onSuccess() {
            dispatch(
                setEmailDispatch({
                    email: '',
                    mobile: mobile,
                    authType: 'MOBILE',
                }),
            );

            onClick();
        },
        onError(error: any) {
            if (
                error?.response?.data?.message === 'Mobile number already exits'
            )
                ErrorToast('Mobile number already exits');
        },
    });

    return (
        <>
            <Input
                placeholder="+919090909090"
                maxWidth={{ ssm: '17rem ', sm: '15rem' }}
                bg="main.input-bg"
                color="main.text.white"
                type="number"
                required={true}
                marginTop="1.6rem"
                paddingX={'2rem'}
                value={mobile}
                onChange={handleMobile}
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
                By entering your number, you’re agreeing to our Terms of Service
                and Privacy Policy. Thanks!
            </Text>
        </>
    );
};

export default StepMobile;
