import { Image, Tooltip } from '@chakra-ui/react';

import { memo } from 'react';

import { codeBoxSingleIcon } from 'Types';

const CodeboxSingleIcon = ({
    type,
    setCodeboxType,
    langauage,
    disabled,
}: codeBoxSingleIcon) => {
    return (
        <>
            <Tooltip
                label={
                    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
                }
            >
                <Image
                    margin="0.75rem"
                    cursor="pointer"
                    flexDirection="column"
                    _hover={{
                        bg: '#f9fafb',
                        boxShadow:
                            '0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)',
                    }}
                    borderRadius="0.4rem"
                    p="0.8rem"
                    height="4rem"
                    width="4rem"
                    bg="main.codeBox"
                    boxShadow="0 1px 6px 0 rgb(0 0 0 / 10%), 0 1px 3px -1px rgb(0 0 0 / 10%)"
                    src={`/images/${type.toLowerCase()}.svg`}
                    outline={
                        langauage === type
                            ? '2px solid rgba(66, 153, 225, 0.6)'
                            : ''
                    }
                    objectFit="contain"
                    onClick={() => (disabled ? null : setCodeboxType())}
                />
            </Tooltip>
        </>
    );
};

export default memo(CodeboxSingleIcon);
