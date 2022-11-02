import { Flex, Spinner, Text } from '@chakra-ui/react';

import { FiTerminal } from 'react-icons/fi';

import { useAppSelector } from 'store/hooks';

import { libraryFooterProps } from 'Types';

const LibraryFooter = ({ handleConsoleVisiblity }: libraryFooterProps) => {
    const { initializationCompilationState } = useAppSelector(
        (state) => state.codebox,
    );

    return (
        <>
            <Flex
                borderTop="2px solid hsl(210deg,14%,66%)"
                justifyContent="flex-end"
                px="5"
                py="0.3rem"
                gap="2rem"
                alignItems="center"
            >
                {initializationCompilationState === 'COMPILING' && (
                    <Spinner size="sm" thickness="3px" />
                )}
                <Flex
                    alignItems="center"
                    gap="0.2rem"
                    fontSize="1rem"
                    fontWeight="700"
                    cursor="pointer"
                    onClick={handleConsoleVisiblity}
                >
                    <FiTerminal />

                    <Text
                        fontSize="1rem"
                        pr="0.2rem"
                        fontWeight="700"
                        lineHeight="25px"
                        as="span"
                    >
                        Console
                    </Text>
                </Flex>
            </Flex>
        </>
    );
};

export default LibraryFooter;
