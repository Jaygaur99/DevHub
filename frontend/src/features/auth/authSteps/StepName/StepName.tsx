import { Input, Text } from '@chakra-ui/react';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { AuthButton, Card } from 'Components';

import ErrorToast from 'Utils/Toast/Error';

import { AuthStepProps } from 'Types';

import { setName as setNameDispatch } from 'features';

const StepName = ({ onClick }: AuthStepProps) => {
    const dispatch = useAppDispatch();
    const { name } = useAppSelector((state) => state.activate);
    const [fullName, setFullName] = useState(name);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };

    const handleNextStep = () => {
        if (fullName === '') {
            ErrorToast('Enter a valid name');
            return;
        } else if (fullName.length >= 40) {
            ErrorToast('Name cannot be greater than 40');
            return;
        }

        dispatch(setNameDispatch({ name: fullName }));
        onClick();
    };

    return (
        <>
            <Card
                icon="handshake"
                title="What's your full name?"
                key={'namecard'}
                dataTestId="activate-full-name-card"
            >
                <Input
                    placeholder="Your fullname"
                    px="2rem"
                    maxWidth="19rem"
                    bg="main.input-bg"
                    color="main.text.white"
                    type="text"
                    required={true}
                    marginTop="1.4rem"
                    value={fullName}
                    onChange={handleNameChange}
                />

                <Text
                    textAlign="center"
                    fontSize="0.95rem"
                    fontWeight="500"
                    maxWidth="15rem"
                    marginTop="1.3rem"
                >
                    People use their real names at devhouse {':)'}
                </Text>
                <AuthButton
                    buttonText="Next"
                    marginTop="1.3rem"
                    onClick={handleNextStep}
                />
            </Card>
        </>
    );
};

export default StepName;
