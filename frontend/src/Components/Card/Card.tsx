import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

import { CardProps } from 'Types';

const Card = ({ title, icon, children, dataTestId }: CardProps) => {
    return (
        <Box
            width={{ ssm: '100%', sm: '90%' }}
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
            data-testid={dataTestId}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginBottom="0.4rem"
                gap="0.5rem"
            >
                {icon && (
                    <Image
                        src={`/images/${icon}.svg`}
                        boxSize="1.5rem"
                        alt="logo"
                    />
                )}
                {title && (
                    <Text
                        fontSize={{ ssm: '1.4rem', sm: '1.23rem' }}
                        fontWeight={'700'}
                        color={'main.text'}
                        textAlign="center"
                    >
                        {title}
                    </Text>
                )}
            </Box>
            {children}
        </Box>
    );
};

export default Card;
