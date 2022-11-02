import { Box, Flex, Text } from '@chakra-ui/react';
import { AuthButton } from 'Components';

import { useNavigate } from 'react-router-dom';

const RoomSection = () => {
    const navigate = useNavigate();

    return (
        <>
            <Flex
                marginTop={{
                    ssm: '3rem',
                    mmd: '4.5rem',
                    md: '5rem',
                }}
                flexDirection={{ ssm: 'column', md: 'row' }}
            >
                <Box
                    width="100%"
                    padding={{
                        ssm: '0rem',
                        sm: '1rem 2rem',
                    }}
                    data-testid="room-title"
                >
                    <Text
                        textAlign="center"
                        fontSize={{
                            ssm: '1.8rem',
                            sm: '2.2rem',
                            mmd: '2.8rem',
                            md: '3rem',
                        }}
                        fontWeight="700"
                        maxW={{
                            sm: '23rem',
                            mmd: '25rem',
                            md: '29rem',
                        }}
                        margin="auto"
                        lineHeight={{ sm: '1.2', md: '120%' }}
                        fontFamily="'Work Sans', 'sans-serif'"
                        letterSpacing="-0.025em"
                        color="#334155"
                    >
                        Where people meet and chat togther
                    </Text>
                    <Text
                        textAlign="center"
                        fontSize={{ ssm: '0.8rem', sm: '1rem' }}
                        maxW={{
                            sm: '23rem',
                            mmd: '25rem',
                            md: '29rem',
                        }}
                        margin="auto"
                        color="#334155"
                        marginTop={{
                            ssm: '1.2rem',
                            sm: '1.6rem',
                        }}
                        padding="0rem 0.5rem"
                    >
                        Listen , speak , chat and share memories with anyone in
                        just one click
                    </Text>
                    <Box
                        width="100%"
                        marginTop="2rem"
                        data-testid="room-section-button"
                    >
                        <AuthButton
                            buttonText="Create your room now"
                            marginTop="0rem"
                            onClick={() => navigate('/meetp')}
                            margin="auto"
                            padding="0rem 1rem"
                        />
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default RoomSection;
