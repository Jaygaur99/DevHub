import { Container } from '@chakra-ui/react';
import { useState } from 'react';
import { Container as MainContainer } from 'Components';
import { StepLoginMobileEmail, StepLoginPassword } from 'features';

const Login = () => {
    const [authSteps] = useState({
        1: StepLoginMobileEmail,
        2: StepLoginPassword,
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

export default Login;
