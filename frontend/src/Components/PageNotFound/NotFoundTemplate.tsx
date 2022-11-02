import { Box, Button, Container, Text } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import { Container as MainContainer } from 'Components';

import { notFoundTemplateProps } from 'Types';

const NotFoundTemplate = ({
    mainContent,
    buttonText,
    buttonLink,
}: notFoundTemplateProps) => {
    return (
        <MainContainer center={true} marginBottom="1">
            <Container
                width="max-content"
                position="relative"
                marginBottom="1rem"
            >
                <Text
                    fontSize="8rem"
                    fontWeight="extrabold"
                    color="main.input-bg"
                    letterSpacing="0.1rem"
                    position="relative"
                >
                    404
                </Text>
                <Box
                    backgroundColor="main.blue"
                    paddingX="0.5rem"
                    fontSize="0.85rem"
                    borderRadius="0.25rem"
                    color="white"
                    position="absolute"
                    top="50%"
                    left="30%"
                    style={{ transform: 'rotate(12deg)' }}
                >
                    {mainContent}
                </Box>
                <Box
                    display="flex"
                    fontSize="0.85rem"
                    fontWeight="medium"
                    marginTop="-0.55rem"
                >
                    <Link to={buttonLink} style={{ margin: 'auto' }}>
                        <Button
                            backgroundColor="main.blue"
                            color="white"
                            _hover={{
                                backgroundColor: 'main.light.blue.hover',
                            }}
                        >
                            {buttonText}
                        </Button>
                    </Link>
                </Box>
            </Container>
        </MainContainer>
    );
};

export default NotFoundTemplate;
