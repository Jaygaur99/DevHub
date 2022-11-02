import { Box, Spinner } from '@chakra-ui/react';

const ContainerLoader = () => {
    return (
        <>
            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
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

export default ContainerLoader;
