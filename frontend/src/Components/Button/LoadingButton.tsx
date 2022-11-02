import { Button } from '@chakra-ui/react';
import { LoadingButtonProps } from 'Types';

const LoadingButton = ({ marginTop }: LoadingButtonProps) => {
    return (
        <>
            <Button
                isLoading
                loadingText="Submitting"
                colorScheme="teal"
                variant="outline"
                fontSize={{ ssm: '1rem ', sm: '0.96rem' }}
                fontWeight={600}
                px="2rem"
                color="white"
                bg="main.blue"
                marginTop="1.6rem"
                _active={{}}
                _hover={{}}
                minWidth="11.8rem"
            >
                Submit
            </Button>
        </>
    );
};

export default LoadingButton;
