import { Container } from '@chakra-ui/react';
import { useState } from 'react';
import { Container as MainContainer } from 'Components/index';

import { StepWelcome, StepMobileEmail, StepPassword } from 'features';

const Signup = () => {
    const [authSteps] = useState({
        1: StepWelcome,
        2: StepMobileEmail,
        3: StepPassword,
    });
    const [stepNumber, setStepNumber] = useState<number>(1);
    const CurrentStep = authSteps[stepNumber as keyof typeof authSteps];

    return (
        <>
            <MainContainer center={true} marginBottom="1">
                <Container>
                    <CurrentStep
                        onClick={() => setStepNumber(stepNumber + 1)}
                    />
                </Container>
            </MainContainer>
        </>
    );
};

export default Signup;
