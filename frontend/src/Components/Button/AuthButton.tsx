import { Button } from '@chakra-ui/react';
import { BsArrowRightShort } from 'react-icons/bs';
import { AuthButtonProps } from 'Types';

const AuthButton = ({
    buttonText,
    marginTop,
    onClick,
    margin,
    padding = '0rem 2rem',
}: AuthButtonProps) => {
    return (
        <>
            <Button
                width="100%"
                display="flex"
                fontSize={{ ssm: '1rem ', sm: '0.96rem' }}
                fontWeight={600}
                padding={padding}
                color="white"
                bg="main.blue"
                margin={margin}
                marginTop={marginTop}
                _active={{ bg: 'main.blue.hover' }}
                _hover={{ bg: 'main.blue.hover' }}
                alignItems="center"
                maxW="11.8rem"
                iconSpacing="0.2rem"
                onClick={onClick}
                rightIcon={
                    <BsArrowRightShort fontSize="1rem" strokeWidth="0.9" />
                }
            >
                {buttonText}
            </Button>
        </>
    );
};

export default AuthButton;
