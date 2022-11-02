import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { SingleChatProps } from 'Types';

const SingleChat = ({ chatContent, username }: SingleChatProps) => {
    return (
        <>
            <Flex
                gap="0.3rem"
                flexDirection="column"
                background="main.message"
                padding="0.5rem"
                borderRadius="0.3rem"
            >
                <Text
                    className="tracking-overflow"
                    fontSize="0.97rem"
                    fontWeight="700"
                >
                    @{username}
                </Text>
                <Text>{chatContent}</Text>
            </Flex>
        </>
    );
};

export default memo(SingleChat);
