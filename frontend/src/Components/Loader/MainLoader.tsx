import { Box, Spinner } from '@chakra-ui/react';

const MainLoader = () => {
    return (
        <>
            <Box
                position="fixed"
                top="0"
                left="0"
                width="100%"
                height="100%"
                zIndex="999999"
                bg="white"
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    position="relative"
                    top="45%"
                >
                    <Spinner
                        thickness="0.27rem"
                        speed="0.70s"
                        emptyColor="main.input-bg"
                        color="main.indigo"
                        size="xl"
                    />
                </Box>
            </Box>
        </>
    );
};

export default MainLoader;
