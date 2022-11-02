import { Box, Container } from '@chakra-ui/react';

import { Container as MainContainer } from 'Components';
import Footer from 'Layout/Footer';
import { Header, Typewriter, HeaderTiles, RoomSection } from 'features';

const Home = () => {
    return (
        <>
            <MainContainer marginBottom="0">
                <Container paddingTop="2rem" maxW="container.xl">
                    <Box
                        padding={{
                            ssm: '0rem 0rem',
                            mmd: '0rem 2rem',
                            lg: '0rem 5rem',
                        }}
                        marginTop="1rem"
                        overflow="hidden"
                    >
                        <Typewriter
                            nonTypewriterText="Talk to"
                            typewriterText={['anyone...', 'everyone....']}
                            key="meetp"
                            delay={30}
                            afterWidthSM="8.7rem"
                            afterWidthMMD="12rem"
                            afterWidthLG="13.8rem"
                        />
                        <Typewriter
                            nonTypewriterText="Code "
                            typewriterText={['anywhere...', 'everywhere....']}
                            key="codebox"
                            delay={32.5}
                            afterWidthSM="6.5rem"
                            afterWidthMMD="9.1rem"
                            afterWidthLG="10.5rem"
                        />
                    </Box>

                    <Header />

                    <HeaderTiles />

                    <RoomSection />
                </Container>

                <Footer />
            </MainContainer>
        </>
    );
};

export default Home;
