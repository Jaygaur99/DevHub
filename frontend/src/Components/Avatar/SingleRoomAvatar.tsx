import { Avatar, Box, Image, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { SingleRoomAvatarProps } from 'Types';

const SingleRoomAvatar = ({
    src,
    username,
    addAudioRef,
    userId,
    muted,
}: SingleRoomAvatarProps) => {
    return (
        <>
            <Box
                width="max-content"
                textAlign="center"
                margin="auto"
                data-testid="user-avatar"
            >
                <Box position="relative">
                    <Avatar
                        height="5rem"
                        width="5rem"
                        showBorder
                        name="user avatar"
                        borderColor="main.blue"
                        borderWidth="0.22rem"
                        overflow="hidden"
                        src={src}
                        mb="0.2rem"
                    />

                    {muted ? (
                        <Image
                            backgroundColor="white"
                            borderRadius="50%"
                            p="0.11rem"
                            src={`/images/mic-off.svg`}
                            boxSize="1.6rem"
                            alt="mic-on icon"
                            position="absolute"
                            bottom="0px"
                            right="0px"
                        />
                    ) : (
                        <Image
                            backgroundColor="white"
                            borderRadius="50%"
                            p="0.11rem"
                            src={`/images/mic.svg`}
                            boxSize="1.6rem"
                            alt="mic-on icon"
                            position="absolute"
                            bottom="0px"
                            right="0px"
                        />
                    )}
                </Box>
                <audio
                    // @ts-ignore
                    ref={(refInstance) => addAudioRef(userId, refInstance)}
                    autoPlay
                ></audio>
                <Text
                    fontSize="0.85rem"
                    fontWeight="600"
                    className="tracking-overflow"
                    maxW="5.5rem"
                >
                    @{username}
                </Text>
            </Box>
        </>
    );
};

export default memo(SingleRoomAvatar);
