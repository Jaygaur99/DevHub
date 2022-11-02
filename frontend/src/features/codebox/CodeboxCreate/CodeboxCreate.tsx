import { Box, Container, Flex, Image, Text } from '@chakra-ui/react';

import { useState } from 'react';

import { Container as MainContainer } from 'Components';

import { CreateCodeBox, JoinCodeBox } from 'features';

const CodeboxCreate = () => {
    const [cardType, setCardType] = useState<'CREATE' | 'JOIN'>('CREATE');

    const toggleCardType = (type: 'CREATE' | 'JOIN') => {
        setCardType(type);
    };

    return (
        <>
            <MainContainer center={true} marginBottom="1">
                <Container>
                    <Box
                        width={{ ssm: '100%', sm: '90%' }}
                        minHeight="20rem"
                        bg={'main.bg.sec'}
                        borderRadius="0.8rem"
                        display="flex"
                        flexDirection="column"
                        margin="auto"
                        overflow="hidden"
                    >
                        <Flex
                            outline="2px solid #6b7280"
                            width="100%"
                            textAlign="center"
                            fontWeight="bold"
                            cursor="pointer"
                        >
                            <Box
                                padding="2"
                                width="50%"
                                borderRight="2px solid #6b7280"
                                onClick={() => toggleCardType('CREATE')}
                                bg={
                                    cardType === 'CREATE'
                                        ? 'rgba(0,119,225, 0.4)'
                                        : ''
                                }
                            >
                                Create Room
                            </Box>
                            <Box
                                width="50%"
                                padding="2"
                                onClick={() => toggleCardType('JOIN')}
                                bg={
                                    cardType === 'JOIN'
                                        ? 'rgba(0,119,225, 0.4)'
                                        : ''
                                }
                            >
                                Join Room
                            </Box>
                        </Flex>

                        <Box
                            display="flex"
                            flex="1"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            padding="1rem"
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap="0.5rem"
                                marginTop="1"
                            >
                                <Image
                                    src={`/images/code.svg`}
                                    boxSize="1.5rem"
                                    alt="logo"
                                />

                                <Text
                                    fontSize="1.23rem"
                                    fontWeight="bold"
                                    color={'main.text'}
                                    textAlign="center"
                                >
                                    {cardType === 'CREATE'
                                        ? 'Enter name of codebox room'
                                        : 'Enter codebox room id'}
                                </Text>
                            </Box>
                            {cardType === 'CREATE' ? (
                                <CreateCodeBox />
                            ) : (
                                <JoinCodeBox />
                            )}
                        </Box>
                    </Box>
                </Container>
            </MainContainer>
        </>
    );
};

export default CodeboxCreate;
