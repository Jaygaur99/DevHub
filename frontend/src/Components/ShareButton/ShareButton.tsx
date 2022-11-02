import { Box, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

import createShareLink from 'Utils/CreateShareLink';

import { shareButtonProps } from 'Types';

const ShareButton = ({
    ToolTipText,
    Icon,
    ButtonColor,
    roomId,
    roomPassword,
    shareType,
    type,
    toolTipAlign,
    dataTestId,
}: shareButtonProps) => {
    const [shareLink] = useState(() =>
        createShareLink(roomId, roomPassword, shareType, type),
    );

    return (
        <>
            <Tooltip label={ToolTipText} placement={toolTipAlign}>
                <a
                    href={shareLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ height: 'max-content' }}
                >
                    <Box
                        bg={ButtonColor}
                        textColor="white"
                        fontSize="1.5rem"
                        height="auto"
                        borderRadius="0.2rem"
                        _focus={{}}
                        _active={{}}
                        padding="0.4rem"
                        _hover={{ opacity: '0.8' }}
                        cursor="pointer"
                        width="max-content"
                        data-testid={dataTestId}
                    >
                        <Icon />
                    </Box>
                </a>
            </Tooltip>
        </>
    );
};

export default ShareButton;
