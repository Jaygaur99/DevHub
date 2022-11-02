import { Container } from '@chakra-ui/react';
import { useState } from 'react';
import { Container as MainContainer } from 'Components/index';

import { StepName, StepAvatar, StepUsername, StepActivate } from 'features';

const Activate = () => {
    const [authSteps] = useState({
        1: StepName,
        2: StepAvatar,
        3: StepUsername,
        4: StepActivate,
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

export default Activate;
