import { Box } from '@chakra-ui/react';

const BottomContainer = () => {
    return (
        <>
            <Box
                height="2.5rem"
                width="100%"
                position="sticky"
                bottom="0"
                background="linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, rgb(82 82 82 / 28%) 50%, #514e4e 100%)"
            ></Box>
        </>
    );
};

export default BottomContainer;
