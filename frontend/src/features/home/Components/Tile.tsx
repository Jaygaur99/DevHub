import { Box, Image, Text } from '@chakra-ui/react';
import { tileProps } from 'Types';

const Tile = ({ iconName, headingTitle, comment }: tileProps) => {
    return (
        <>
            <Box
                p="1.5rem 1rem"
                borderRadius="0.3rem"
                width="100%"
                textAlign="center"
                background="main.bg.sec"
                height="100%"
                minH={{ mdlg: '17rem' }}
            >
                <Image
                    src={`/images/${iconName}.svg`}
                    animation="1s cubic-bezier(0.22, 0.29, 0.12, 2) 1s 1 normal backwards running icon"
                    height="3.5rem"
                    width="3.5rem"
                    margin="auto"
                />
                <Text
                    marginTop="0.7rem"
                    fontSize={{ ssm: '1.6rem', mdlg: '1.4rem' }}
                    fontWeight="700"
                    fontFamily="'Work Sans', 'sans-serif'"
                    lineHeight={{ sm: '1.2', md: '120%' }}
                    letterSpacing="-0.025em"
                >
                    {headingTitle}
                </Text>
                <Text
                    textAlign="center"
                    fontSize="0.88rem"
                    margin="auto"
                    color="#334155"
                    marginTop="0.8rem"
                    padding="0rem 0.5rem"
                    style={{
                        overflow: 'hidden',
                        display: '-webkit-inline-box',
                        WebkitLineClamp: '4',
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {comment}
                </Text>
            </Box>
        </>
    );
};

export default Tile;
