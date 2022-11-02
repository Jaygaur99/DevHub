import { Button, Tooltip } from '@chakra-ui/react';
import { SingleRoomButton as SingleRoomButtonProps } from 'Types';

const SingleRoomButton = ({
    buttonText,
    tooltipLabel,
    btnRef,
    onClick,
    dataTestId,
}: SingleRoomButtonProps) => {
    return (
        <>
            <Tooltip label={tooltipLabel}>
                <Button
                    bg="white"
                    textColor="main.input-bg"
                    borderRadius="0.4rem"
                    _focus={{}}
                    _active={{}}
                    _hover={{
                        bg: 'main.input-bg',
                        textColor: 'white',
                    }}
                    fontSize="0.9rem"
                    onClick={onClick}
                    ref={btnRef}
                    data-testid={dataTestId}
                >
                    {buttonText}
                </Button>
            </Tooltip>
        </>
    );
};

export default SingleRoomButton;
