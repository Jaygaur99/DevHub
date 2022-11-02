import { CopyIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Input,
    Text,
    Tooltip,
    useClipboard,
} from '@chakra-ui/react';

import { copyFieldProps } from 'Types';

const CopyField = ({
    inputCopyValue,
    labelText,
    marginTop,
    fieldType,
    type,
}: copyFieldProps) => {
    const { onCopy, hasCopied } = useClipboard(
        fieldType === 'ROOM_URL'
            ? `${process.env.REACT_APP_FRONTEND_URL}/${type}/${inputCopyValue}`
            : `${inputCopyValue}`,
    );

    return (
        <>
            <Box mt={marginTop}>
                <Text
                    fontWeight="600"
                    fontSize="0.95rem"
                    marginBottom="0.25rem"
                >
                    {labelText}
                </Text>
                <Flex gap="0.8rem" align="center">
                    <Input
                        px="1rem"
                        bg="main.input-bg"
                        color="main.input.bg"
                        height="2.4rem"
                        width="100%"
                        bgColor="main.bg.sec"
                        borderRadius="0.3rem"
                        readOnly
                        fontWeight="600"
                        value={
                            fieldType === 'ROOM_URL'
                                ? `${process.env.REACT_APP_FRONTEND_URL}/${type}/${inputCopyValue}`
                                : `${inputCopyValue}`
                        }
                        _focus={{}}
                        _active={{}}
                    />

                    <Tooltip
                        label={`${hasCopied ? 'Copied' : 'Copy'}`}
                        placement="right"
                    >
                        <CopyIcon
                            fontSize="1.2rem"
                            color="main.icon"
                            cursor="pointer"
                            onClick={onCopy}
                        />
                    </Tooltip>
                </Flex>
            </Box>
        </>
    );
};

export default CopyField;
