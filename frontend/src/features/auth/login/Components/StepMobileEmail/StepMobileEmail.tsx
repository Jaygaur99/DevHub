import { Flex, IconButton } from '@chakra-ui/react';
import { HiOutlineMail } from 'react-icons/hi';
import { MdPhoneAndroid } from 'react-icons/md';

import { useState } from 'react';

import { Card } from 'Components';
import StepMobile from './StepMobile/StepMobile';
import StepEmail from './StepEmail/StepEmail';

import { AuthStepProps } from 'Types';

const StepMobileEmail = ({ onClick }: AuthStepProps) => {
    const [phoneEmail] = useState({
        phone: StepMobile,
        email: StepEmail,
    });
    const [type, setType] = useState('email');
    const CurrentComponent = phoneEmail[type as keyof typeof phoneEmail];

    return (
        <>
            <Card
                icon={`${type === 'email' ? 'email' : 'telephone'}`}
                title={`Enter your ${
                    type === 'email' ? 'email id' : 'phone number'
                } to login`}
                key={'phone number and email'}
                dataTestId="login-phone-email-card"
            >
                <CurrentComponent onClick={onClick} />
                <Flex
                    gap="1rem"
                    alignItems="center"
                    position="absolute"
                    right="0"
                    top="-3.2rem"
                >
                    <IconButton
                        variant="ghost"
                        bg={`${type === 'email' ? 'main.blue' : 'main.bg.sec'}`}
                        colorScheme="main.text"
                        aria-label="mail"
                        fontSize="1.5rem"
                        icon={
                            <HiOutlineMail
                                color={`${
                                    type === 'email' ? 'white' : 'black'
                                }`}
                            />
                        }
                        onClick={() => setType('email')}
                    />
                    <IconButton
                        variant="ghost"
                        bg={`${type === 'phone' ? 'main.blue' : 'main.bg.sec'}`}
                        colorScheme="main.text"
                        aria-label="phone"
                        fontSize="1.5rem"
                        icon={
                            <MdPhoneAndroid
                                color={`${
                                    type === 'phone' ? 'white' : 'black'
                                }`}
                            />
                        }
                        onClick={() => setType('phone')}
                    />
                </Flex>
            </Card>
        </>
    );
};

export default StepMobileEmail;
