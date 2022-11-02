import { Box, Spinner, Text } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { setActivate, resetAuthenticate } from 'features';

import { activateUser } from 'Services';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { AuthStepProps } from 'Types';

import ErrorToast from 'Utils/Toast/Error';

const StepActivate = ({ onClick }: AuthStepProps) => {
    const { name, avatar, username } = useAppSelector(
        (state) => state.activate,
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useQuery(
        'user/activate',
        async () => {
            return await activateUser(name, avatar, username);
        },
        {
            onSuccess: (data: any) => {
                dispatch(setActivate(data.data));
                dispatch(resetAuthenticate());
            },
            onError: (error: Error) => {
                console.log(error);
                ErrorToast('Failed');
                navigate('/activate');
            },
        },
    );

    return (
        <>
            <Box
                width="90%"
                minHeight="20rem"
                bg={'main.bg.sec'}
                padding="2rem"
                borderRadius="0.8rem"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                position="relative"
                alignItems="center"
                margin="auto"
                data-testid="activate-card"
            >
                <Spinner
                    thickness="0.27rem"
                    speed="0.70s"
                    emptyColor="main.input-bg"
                    color="main.indigo"
                    size="xl"
                    data-testid="activate-spinner"
                />
                <Text
                    textAlign="center"
                    fontWeight="700"
                    maxWidth="15rem"
                    marginTop="1.2rem"
                    fontSize={{ ssm: '1.12rem', sm: '1rem' }}
                >
                    Activation in progress ...
                </Text>
            </Box>
        </>
    );
};

export default StepActivate;
