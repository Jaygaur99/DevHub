import {
    AspectRatio,
    Box,
    Flex,
    Image,
    Tooltip,
    useClipboard,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

import { ShareButton } from 'Components';

import { AiOutlineWhatsApp, AiOutlineTwitter } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';

import { iconBoxProps } from 'Types';

import SuccessToast from 'Utils/Toast/Success';

import { socket } from 'Socket/socket';
import { ACTIONS_CODE_LEAVE } from 'Socket/actions';

const ShareSide = () => {
    const { qrcode, codebox_id } = useAppSelector((state) => state.codebox);
    const navigate = useNavigate();

    const handleUserExit = () => {
        socket.emit(ACTIONS_CODE_LEAVE, {
            codeboxId: codebox_id,
        });
        navigate('/code-box');
    };

    return (
        <>
            <Flex
                px="0.5rem"
                paddingInlineStart="2"
                paddingInlineEnd="2"
                paddingTop="6"
                paddingBottom="2"
                flex="1"
                overflowY="auto"
                flexDir="column"
                gap="1.5rem"
            >
                <Flex
                    width="100%"
                    gap="0.5rem"
                    flexWrap="wrap"
                    justifyContent="space-evenly"
                    overflowY="auto"
                >
                    <ShareButton
                        Icon={AiOutlineWhatsApp}
                        ButtonColor={'rgb(37, 211, 102)'}
                        roomId={codebox_id}
                        roomPassword={''}
                        shareType={'WHATSAPP'}
                        toolTipAlign="right"
                        type="code-box"
                        ToolTipText="Share on whatsapp"
                        key={'share on whatsapp'}
                    />

                    <ShareButton
                        ToolTipText="Share on twitter"
                        Icon={AiOutlineTwitter}
                        ButtonColor={'rgb(85, 172, 238);'}
                        roomId={codebox_id}
                        roomPassword={''}
                        toolTipAlign="right"
                        key={'share on twitter'}
                        shareType={'TWITTER'}
                        type="code-box"
                    />

                    <ShareButton
                        ToolTipText="Share on telegram"
                        Icon={FaTelegramPlane}
                        ButtonColor={'rgb(85, 172, 238)'}
                        roomId={codebox_id}
                        roomPassword={''}
                        toolTipAlign="right"
                        key={'share on telegram'}
                        shareType={'TELEGRAM'}
                        type="code-box"
                    />
                </Flex>

                <Tooltip label="QR Code" placement="right">
                    <Box display="flex" justifyContent="center">
                        <AspectRatio
                            objectFit="contain"
                            ratio={4 / 3}
                            boxSize="9rem"
                        >
                            <Image
                                boxSize="100%"
                                src={qrcode?.secure_url}
                                alt="Room Qr Code"
                                style={{ objectFit: 'contain' }}
                            />
                        </AspectRatio>
                    </Box>
                </Tooltip>
            </Flex>

            <Box
                gap="0.7rem"
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                padding="0.65rem"
                flexDirection="column"
                paddingBottom="4"
            >
                <IconBox
                    bgColor="linear-gradient(58deg, rgba(39,148,199,1) 28%, rgba(2,201,224,1) 100%)"
                    buttonText="Share Link"
                    color="hsl(0deg , 0% , 100%)"
                    outline="1px solid linear-gradient(58deg, rgba(39,148,199,1) 28%, rgba(2,201,224,1) 100%)"
                    clipboardValue={`${process.env.REACT_APP_FRONTEND_URL}/code-box/${codebox_id}`}
                    key="Share Room Link"
                    toolTipLabel="Share Room Link"
                />
                <IconBox
                    bgColor="linear-gradient(58deg, rgba(39,148,199,1) 28%, rgba(2,201,224,1) 100%)"
                    buttonText="Share Id"
                    color="hsl(0deg , 0% , 100%)"
                    outline="1px solid linear-gradient(58deg, rgba(39,148,199,1) 28%, rgba(2,201,224,1) 100%)"
                    key="Share Room Id"
                    toolTipLabel="Share Room Id"
                    clipboardValue={codebox_id}
                />
                <IconBox
                    bgColor="inherit"
                    buttonText="Exit Room"
                    color="hsl(333deg 100% 45%)"
                    outline="2px solid hsl(333deg 100% 45%)"
                    onClick={() => handleUserExit()}
                    key="Exit Room"
                    toolTipLabel="Exit Room"
                />
            </Box>
        </>
    );
};

const IconBox = ({
    bgColor,
    buttonText,
    color,
    onClick,
    outline,
    toolTipLabel,
    clipboardValue,
}: iconBoxProps) => {
    const { onCopy } = useClipboard(clipboardValue ?? '');

    const handleCopy = () => {
        onCopy();
        SuccessToast(`${buttonText} copied`);
    };

    return (
        <>
            <Tooltip label={toolTipLabel} placement="right">
                <Box
                    outline={outline}
                    width="100%"
                    textAlign="center"
                    fontWeight="700"
                    fontSize="1.1rem"
                    p="0.25rem"
                    borderRadius="0.25rem"
                    bg={bgColor}
                    color={color}
                    cursor="pointer"
                    onClick={onClick ?? handleCopy}
                >
                    {buttonText}
                </Box>
            </Tooltip>
        </>
    );
};

export default ShareSide;
