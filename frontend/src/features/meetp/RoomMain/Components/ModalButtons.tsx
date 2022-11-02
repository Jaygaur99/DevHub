import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { ModalButtonProps } from 'Types';

const ModalButtons = ({ roomType, setRoomType }: ModalButtonProps) => {
    const handleRoomType = (type: 'OPEN' | 'SOCIAL' | 'PRIVATE') => {
        setRoomType(type);
    };

    return (
        <>
            <Flex pt="5" justifyContent="space-evenly">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    objectFit="cover"
                    gap="0.2rem"
                    px="0.8rem"
                    borderRadius="0.4rem"
                    bg="main.bg.sec"
                    boxShadow={`0 0 0px 2px ${
                        roomType === 'OPEN' ? '#3182ce' : 'transparent'
                    }`}
                    onClick={() => handleRoomType('OPEN')}
                    cursor="pointer"
                    data-testid="create-room-open"
                >
                    <Image src="/images/open.svg" boxSize="14" />
                    <Text fontWeight="600">Open</Text>
                </Box>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    objectFit="cover"
                    gap="0.2rem"
                    px="0.8rem"
                    borderRadius="0.4rem"
                    bg="main.bg.sec"
                    boxShadow={`0 0 0px 2px ${
                        roomType === 'SOCIAL' ? '#3182ce' : 'transparent'
                    }`}
                    onClick={() => handleRoomType('SOCIAL')}
                    cursor="pointer"
                    data-testid="create-room-social"
                >
                    <Image src="/images/social.svg" boxSize="14" />
                    <Text fontWeight="600">Social</Text>
                </Box>

                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    objectFit="cover"
                    gap="0.2rem"
                    px="0.8rem"
                    borderRadius="0.4rem"
                    bg="main.bg.sec"
                    boxShadow={`0 0 0px 2px ${
                        roomType === 'PRIVATE' ? '#3182ce' : 'transparent'
                    }`}
                    onClick={() => handleRoomType('PRIVATE')}
                    cursor="pointer"
                    data-testid="create-room-private"
                >
                    <Image src="/images/private.svg" boxSize="14" />
                    <Text fontWeight="600">Private</Text>
                </Box>
            </Flex>
        </>
    );
};

export default ModalButtons;
