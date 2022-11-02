import { Image } from '@chakra-ui/react';
import { singleIconProps } from 'Types';

const SingleIcon = ({ iconName }: singleIconProps) => {
    return (
        <>
            <Image
                src={`/images/${iconName}.svg`}
                transition="transform 200ms cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s, opacity 200ms ease-in-out 100ms"
                opacity="0.7"
                animation="1s cubic-bezier(0.22, 0.29, 0.12, 2) 1s 1 normal backwards running icon"
                _hover={{
                    opacity: '1',
                    transform: 'scale(1.2)',
                }}
                height={{
                    ssm: '3rem',
                    md: '3.5rem',
                }}
                width={{
                    ssm: '3rem',
                    md: '3.5rem',
                }}
            />
        </>
    );
};

export default SingleIcon;
