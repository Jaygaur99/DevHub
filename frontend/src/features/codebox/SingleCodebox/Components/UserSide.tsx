import { Avatar, Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { useAppSelector } from 'store/hooks';

const UserSide = () => {
    const { users } = useAppSelector((state) => state.codebox);

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                gap="0.7rem"
                scrollBehavior="smooth"
                role="chat"
                px="0.6rem"
                paddingInlineStart="2"
                paddingInlineEnd="2"
                paddingTop="2"
                paddingBottom="2"
                flex="1"
                overflow="auto"
                flexDir="column"
                marginTop="1rem"
            >
                <Flex
                    gap="1rem"
                    width="100%"
                    alignItems="center"
                    flexWrap="wrap"
                    columnGap="0.5rem"
                    overflowY="auto"
                >
                    {users.map((user) => (
                        <Box
                            width="max-content"
                            textAlign="center"
                            margin="auto"
                            key={`codebox ${user.userId}`}
                        >
                            <Tooltip label={user.username} placement="right">
                                <Avatar
                                    height="3rem"
                                    width="3rem"
                                    showBorder
                                    name="user avatar"
                                    borderColor="main.blue"
                                    borderWidth="0.14rem"
                                    overflow="hidden"
                                    src={user.photo}
                                    mb="0.2rem"
                                    bg="transparent"
                                    borderRadius="0.4rem"
                                    p="0.4rem"
                                />
                            </Tooltip>
                            <Text
                                fontSize="0.9rem"
                                fontWeight="700"
                                overflow="hidden"
                                display="-webkit-box"
                                maxW="4.5rem"
                                style={{
                                    WebkitLineClamp: '1',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                @{user.username}
                            </Text>
                        </Box>
                    ))}
                </Flex>
            </Box>
        </>
    );
};

export default UserSide;
