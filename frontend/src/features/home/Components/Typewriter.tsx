import { Text } from '@chakra-ui/react';

import Typewrite from 'typewriter-effect';

import { typewriterProps } from 'Types';

const Typewriter = ({
    nonTypewriterText,
    typewriterText,
    delay,
    afterWidthSM,
    afterWidthMMD,
    afterWidthLG,
}: typewriterProps) => {
    return (
        <>
            <Text
                as="header"
                width="max-content"
                fontSize={{
                    ssm: '1.8rem',
                    sm: '2.5rem',
                    mmd: '3.5rem',
                    lg: '4rem',
                }}
                fontWeight="bold"
                position="relative"
                _after={{
                    content: `""`,
                    width: {
                        sm: afterWidthSM,
                        mmd: afterWidthMMD,
                        lg: afterWidthLG,
                    },
                    height: { sm: '8%', mmd: '9%' },
                    position: 'absolute',
                    bottom: {
                        sm: '1rem',
                        mmd: '1.3rem',
                        lg: '1.5rem',
                    },
                    left: '0px',
                    zIndex: '-1',
                    background: '#03a9f4',
                    display: { ssm: 'none', sm: 'block' },
                }}
                background="linear-gradient(34deg, rgba(0,101,149,1) 25%, rgba(0,236,255,1) 100%)"
                css={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
                fontFamily="'Work Sans', 'sans-serif'"
                userSelect="none"
            >
                {nonTypewriterText}{' '}
                <Typewrite
                    options={{
                        strings: typewriterText,
                        autoStart: true,
                        loop: true,
                        delay: delay,
                    }}
                />
            </Text>
        </>
    );
};

export default Typewriter;
