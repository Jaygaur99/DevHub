import { Box } from '@chakra-ui/react';
import React from 'react';
import { Children } from 'Types';

const Container = ({ children, center, marginBottom }: Children) => {
    return (
        <>
            <Box
                margin="0px"
                display="flex"
                flex="1 1 0%"
                flexDirection="column"
                width="100%"
                marginBottom={`${marginBottom}rem`}
                style={{ justifyContent: center ? 'center' : '' }}
            >
                {children}
            </Box>
        </>
    );
};

export default Container;
