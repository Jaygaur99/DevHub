import { Box, Tooltip } from '@chakra-ui/react';

import { HiQrcode } from 'react-icons/hi';
import { AiOutlineWhatsApp, AiOutlineTwitter } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';

import { ShareButton } from 'Components';

import { shareModalProps } from 'Types';

import { useAppSelector } from 'store/hooks';

const ShareModalFooter = ({ qrModalOnOpen }: shareModalProps) => {
    const { roomId, roomPassword } = useAppSelector((state) => state.rooms);

    return (
        <>
            <Tooltip label="Qr Code">
                <Box
                    bg="rgb(99 179 237)"
                    textColor="white"
                    fontSize="1.5rem"
                    height="auto"
                    borderRadius="0.2rem"
                    _focus={{}}
                    _active={{}}
                    p="0.4rem"
                    _hover={{ opacity: '0.8' }}
                    cursor="pointer"
                    onClick={qrModalOnOpen}
                    data-testid="qr-code-box"
                >
                    <HiQrcode />
                </Box>
            </Tooltip>

            <ShareButton
                ToolTipText="Share on whatsapp"
                Icon={AiOutlineWhatsApp}
                ButtonColor={'rgb(37, 211, 102)'}
                roomId={roomId}
                roomPassword={roomPassword}
                key={'share on whatsapp'}
                shareType={'WHATSAPP'}
                toolTipAlign="bottom"
                type="meetp"
                dataTestId="whatsapp-box"
            />

            <ShareButton
                ToolTipText="Share on twitter"
                Icon={AiOutlineTwitter}
                ButtonColor={'rgb(85, 172, 238);'}
                roomId={roomId}
                roomPassword={roomPassword}
                key={'share on twitter'}
                shareType={'TWITTER'}
                toolTipAlign="bottom"
                type="meetp"
                dataTestId="twitter-box"
            />

            <ShareButton
                ToolTipText="Share on telegram"
                Icon={FaTelegramPlane}
                ButtonColor={'rgb(85, 172, 238)'}
                roomId={roomId}
                roomPassword={roomPassword}
                key={'share on telegram'}
                shareType={'TELEGRAM'}
                toolTipAlign="bottom"
                type="meetp"
                dataTestId="telegram-box"
            />
        </>
    );
};

export default ShareModalFooter;
