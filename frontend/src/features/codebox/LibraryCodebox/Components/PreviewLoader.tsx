import { Box, Spinner } from '@chakra-ui/react';

const PreviewLoader = () => {
    return (
        <>
            <Box
                pos="relative"
                inset="0"
                height="100%"
                width="100%"
                zIndex="50"
                flex="1"
                backgroundColor="rgba(0,0,0,0.04)"
                backdropFilter="blur(3px)"
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

export default PreviewLoader;
