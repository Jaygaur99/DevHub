import { Box, Flex, Text, Textarea } from '@chakra-ui/react';

import React, { memo } from 'react';

import { inputFieldMonaco } from 'Types';

const InputField = ({
    label,
    setValue,
    value,
    readonly,
    valueRef,
}: inputFieldMonaco) => {
    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setValue && setValue(() => event.target.value);
    };

    return (
        <>
            <Box
                height="50%"
                display="flex"
                width="100%"
                flexDir="column"
                pt="0.5rem"
                pb="0.75rem"
            >
                <Text px="0.5rem" fontWeight="semibold">
                    {label}
                </Text>
                <Flex
                    mt="0.5rem"
                    flexDir="column"
                    height="100%"
                    width="100%"
                    bg="#ffffff"
                >
                    <Textarea
                        resize="none"
                        px="1rem"
                        py="0.8rem"
                        _focusVisible={{}}
                        bg="rgb(249, 249, 249)"
                        _focus={{}}
                        fontWeight="600"
                        outline="none"
                        fontSize="0.85rem"
                        border="none"
                        height="100%"
                        width="100%"
                        fontFamily="League Mono"
                        ref={valueRef}
                        value={value}
                        onChange={handleInputChange}
                        readOnly={readonly}
                    />
                </Flex>
            </Box>
        </>
    );
};

export default memo(InputField);
