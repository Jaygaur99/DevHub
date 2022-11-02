import { Box, Tooltip, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { setSidebarComponent } from 'features';
import { sidebarProps } from 'Types';
import { useAppDispatch, useAppSelector } from 'store/hooks';

const SideDock = ({ buttonsArray }: sidebarProps) => {
    const dispatch = useAppDispatch();
    const { sidebarComponent } = useAppSelector((state) => state.codebox);

    const handleSidebarOpen = (
        buttonType: 'Chat' | 'Collaborate' | 'Files' | 'Users',
    ) => {
        if (sidebarComponent === buttonType)
            return dispatch(setSidebarComponent({ component: 'None' }));

        dispatch(setSidebarComponent({ component: buttonType }));
    };

    return (
        <>
            <Box
                as="nav"
                display="flex"
                flexDirection="column"
                margin="0px"
                alignItems="center"
                pos="sticky"
                bottom="0"
                left="0"
                py="1.5rem"
                px="0.5rem"
                borderRight="2px solid"
                gap="1.5rem"
                bg="hsl(0deg 0% 100%)"
                borderColor={useColorModeValue('gray.200', 'gray.900')}
            >
                {buttonsArray.map((button) => (
                    <Tooltip
                        label={button.tooltipLabel}
                        key={button.type}
                        placement="right"
                    >
                        <Box
                            width="2rem"
                            height="2rem"
                            objectFit="contain"
                            overflow="hidden"
                            cursor="pointer"
                            opacity="0.7"
                            transition="transform 200ms cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s, opacity 200ms ease-in-out 100ms"
                            animation="0.5s cubic-bezier(0.22, 0.29, 0.12, 2) 0.5s 1 normal backwards running icon"
                            _hover={{ transform: 'scale(1.2)', opacity: '1' }}
                            onClick={() =>
                                handleSidebarOpen(button.tooltipLabel)
                            }
                            key={button.type}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            p="0.2rem"
                        >
                            {button.icon === 'chat' && (
                                <React.Fragment key={button.type}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        width="100%"
                                        height="100%"
                                    >
                                        <path
                                            fill="#1565c0"
                                            d="M38,5H15c-2.761,0-5,2.239-5,5v27l6.965-7H38c2.761,0,5-2.239,5-5V10C43,7.239,40.761,5,38,5z"
                                        />
                                        <path
                                            fill="#2196f3"
                                            d="M33,11H10c-2.761,0-5,2.239-5,5v27l6.965-7H33c2.761,0,5-2.239,5-5V16C38,13.239,35.761,11,33,11z"
                                        />
                                    </svg>
                                </React.Fragment>
                            )}
                            {button.icon === 'share' && (
                                <React.Fragment key={button.type}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        width="100%"
                                        height="100%"
                                    >
                                        <path
                                            fill="#25B7D3"
                                            d="M7.9,256C7.9,119,119,7.9,256,7.9C393,7.9,504.1,119,504.1,256c0,137-111.1,248.1-248.1,248.1C119,504.1,7.9,393,7.9,256z"
                                        />
                                        <path
                                            fill="#FFF"
                                            d="M154.4 203.09999999999997A53.8 53.8 0 1 0 154.4 310.7 53.8 53.8 0 1 0 154.4 203.09999999999997zM318.7 107.39999999999999A53.8 53.8 0 1 0 318.7 215 53.8 53.8 0 1 0 318.7 107.39999999999999zM318.7 297A53.8 53.8 0 1 0 318.7 404.6 53.8 53.8 0 1 0 318.7 297z"
                                        />
                                        <g>
                                            <path
                                                fill="#FFF"
                                                d="M222.1 112.2H251V302.3H222.1z"
                                                transform="rotate(59.786 236.552 207.272)"
                                            />
                                        </g>
                                        <g>
                                            <path
                                                fill="#FFF"
                                                d="M141.5 288.5H331.6V317.4H141.5z"
                                                transform="rotate(30.214 236.576 302.965)"
                                            />
                                        </g>
                                    </svg>
                                </React.Fragment>
                            )}
                            {button.icon === 'users' && (
                                <React.Fragment key={button.type}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        width="100%"
                                        height="100%"
                                    >
                                        <path
                                            fill="#2196f3"
                                            d="M0 35c0-3.866 3.582-7 8-7s8 3.134 8 7H0zM32 35c0-3.866 3.582-7 8-7s8 3.134 8 7H32z"
                                        />
                                        <path
                                            fill="#ef8d3c"
                                            d="M42.001 26h-4v3c0 0 .328 1 1.959 1s2.041-1 2.041-1V26zM43.5 22A1.5 1.5 0 1 0 43.5 25 1.5 1.5 0 1 0 43.5 22zM36.5 22A1.5 1.5 0 1 0 36.5 25 1.5 1.5 0 1 0 36.5 22z"
                                        />
                                        <path
                                            fill="#ffb74d"
                                            d="M44,20.216C44,18.01,42.206,18,40,18s-4,0.01-4,2.216c0,0.347,0,3.436,0,3.784c0,2.206,1.794,4,4,4 s4-1.794,4-4C44,23.653,44,20.564,44,20.216z"
                                        />
                                        <path
                                            fill="#424242"
                                            d="M39.781,16C37.344,16.219,35,17.93,35,21.574V23l1,1v-3l6.31-2.201L44,21v3l1-1v-1.203 c0-2.414-0.135-4.205-3-4.797l-0.485-1H39.781z"
                                        />
                                        <path
                                            fill="#ef8d3c"
                                            d="M10.001 26h-4v3c0 0 .328 1 1.959 1s2.041-1 2.041-1V26zM11.5 22A1.5 1.5 0 1 0 11.5 25 1.5 1.5 0 1 0 11.5 22zM4.5 22A1.5 1.5 0 1 0 4.5 25 1.5 1.5 0 1 0 4.5 22z"
                                        />
                                        <path
                                            fill="#ffb74d"
                                            d="M12,20.216C12,18.01,10.206,18,8,18s-4,0.01-4,2.216C4,20.563,4,23.652,4,24c0,2.206,1.794,4,4,4 s4-1.794,4-4C12,23.653,12,20.564,12,20.216z"
                                        />
                                        <path
                                            fill="#424242"
                                            d="M7.781,16C5.344,16.219,3,17.93,3,21.574V23l1,1v-3l6.31-2.201L12,21v3l1-1v-1.203 c0-2.414-0.135-4.205-3-4.797l-0.485-1H7.781z"
                                        />
                                        <path
                                            fill="#ffa726"
                                            d="M32,20.5c0,0.828-0.672,1.5-1.5,1.5c-0.829,0-1.5-0.672-1.5-1.5s0.671-1.5,1.5-1.5 C31.328,19,32,19.672,32,20.5 M19,20.5c0-0.828-0.672-1.5-1.5-1.5S16,19.672,16,20.5s0.672,1.5,1.5,1.5S19,21.328,19,20.5"
                                        />
                                        <path
                                            fill="#ff9800"
                                            d="M28,29c0,0,0,4-4,4s-4-4-4-4"
                                        />
                                        <path
                                            fill="#4fc3f7"
                                            d="M27.75,29L27.75,29L24,29.77L20.25,29c0,0-8.25,1.527-8.25,10h24C36,30.559,27.75,29,27.75,29"
                                        />
                                        <path
                                            fill="#ff9800"
                                            d="M24,33c-4,0-4-4-4-4v-4h8v4C28,29,28,33,24,33z"
                                        />
                                        <path
                                            fill="#ffb74d"
                                            d="M31,16.68c0-5.879-14-3.828-14,0v4.391C17,24.895,20.133,28,24,28c3.866,0,7-3.105,7-6.93V16.68z"
                                        />
                                        <path
                                            fill="#01579b"
                                            d="M24,35c3.059,0,5.578-2.292,5.948-5.25c-0.884-0.398-1.603-0.607-1.954-0.693 C27.963,31.238,26.19,33,24,33s-3.964-1.762-3.994-3.945c-0.353,0.086-1.071,0.293-1.955,0.688C18.417,32.705,20.939,35,24,35z"
                                        />
                                        <path
                                            fill="#795548"
                                            d="M24,9c-4.86,0-8,4.313-8,8.172V19l2,2v-4l9.2-3l2.8,3v4l2-2v-0.809c0-3.218-0.831-6.803-4.8-7.592 L26.399,9H24z"
                                        />
                                        <path
                                            fill="#784719"
                                            d="M26,20c0-0.551,0.448-1,1-1s1,0.449,1,1s-0.448,1-1,1S26,20.551,26,20 M20,20c0,0.551,0.448,1,1,1 s1-0.449,1-1s-0.448-1-1-1S20,19.449,20,20"
                                        />
                                    </svg>
                                </React.Fragment>
                            )}
                            {button.icon === 'files' && (
                                <React.Fragment key={button.type}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        width="100%"
                                        height="100%"
                                    >
                                        <linearGradient
                                            id="JX0fixNgnsUBoIw83q4Xsa"
                                            x1="24"
                                            x2="24"
                                            y1="231.292"
                                            y2="223.023"
                                            gradientTransform="matrix(1 0 0 -1 0 238)"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop
                                                offset="0"
                                                stop-color="#eba600"
                                            />
                                            <stop
                                                offset="1"
                                                stop-color="#c28200"
                                            />
                                        </linearGradient>
                                        <path
                                            fill="url(#JX0fixNgnsUBoIw83q4Xsa)"
                                            d="M24.414,10.414l-2.536-2.536C21.316,7.316,20.553,7,19.757,7H5C3.895,7,3,7.895,3,9v30	c0,1.105,0.895,2,2,2h38c1.105,0,2-0.895,2-2V13c0-1.105-0.895-2-2-2H25.828C25.298,11,24.789,10.789,24.414,10.414z"
                                        />
                                        <linearGradient
                                            id="JX0fixNgnsUBoIw83q4Xsb"
                                            x1="24"
                                            x2="24"
                                            y1="227.146"
                                            y2="197.017"
                                            gradientTransform="matrix(1 0 0 -1 0 238)"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop
                                                offset="0"
                                                stop-color="#ffd869"
                                            />
                                            <stop
                                                offset="1"
                                                stop-color="#fec52b"
                                            />
                                        </linearGradient>
                                        <path
                                            fill="url(#JX0fixNgnsUBoIw83q4Xsb)"
                                            d="M21.586,14.414l3.268-3.268C24.947,11.053,25.074,11,25.207,11H43c1.105,0,2,0.895,2,2v26	c0,1.105-0.895,2-2,2H5c-1.105,0-2-0.895-2-2V15.5C3,15.224,3.224,15,3.5,15h16.672C20.702,15,21.211,14.789,21.586,14.414z"
                                        />
                                        <path
                                            d="M26.164,18.5H18.75c-1.517,0-2.75,1.233-2.75,2.75v14c0,1.517,1.233,2.75,2.75,2.75h10.5	c1.517,0,2.75-1.233,2.75-2.75V24.336L26.164,18.5z"
                                            opacity=".05"
                                        />
                                        <path
                                            d="M25.957,19H18.75c-1.24,0-2.25,1.009-2.25,2.25v14c0,1.241,1.01,2.25,2.25,2.25h10.5	c1.24,0,2.25-1.009,2.25-2.25V24.543L25.957,19z"
                                            opacity=".07"
                                        />
                                        <path
                                            fill="#50e6ff"
                                            d="M31,24.75v10.5c0,0.966-0.784,1.75-1.75,1.75h-10.5C17.784,37,17,36.216,17,35.25v-14	c0-0.966,0.784-1.75,1.75-1.75h7L31,24.75z"
                                        />
                                        <linearGradient
                                            id="JX0fixNgnsUBoIw83q4Xsc"
                                            x1="26.238"
                                            x2="28.418"
                                            y1="213.738"
                                            y2="215.918"
                                            gradientTransform="matrix(1 0 0 -1 0 238)"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop
                                                offset="0"
                                                stop-color="#3079d6"
                                            />
                                            <stop
                                                offset="1"
                                                stop-color="#297cd2"
                                            />
                                        </linearGradient>
                                        <path
                                            fill="url(#JX0fixNgnsUBoIw83q4Xsc)"
                                            d="M25.75,19.5V23c0,0.966,0.784,1.75,1.75,1.75H31L25.75,19.5z"
                                        />
                                    </svg>
                                </React.Fragment>
                            )}
                        </Box>
                    </Tooltip>
                ))}
            </Box>
        </>
    );
};

export default SideDock;
