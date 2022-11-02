import {
    Box,
    Flex,
    IconButton,
    Button,
    Stack,
    Collapse,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logoutUserAuth } from 'features';

import MobileNav from './MobileNav';

import { logoutUser } from 'Services';

import ErrorToast from 'Utils/Toast/Error';
import { useState } from 'react';

const Header = () => {
    const { isOpen, onToggle } = useDisclosure();
    const greyColor = useColorModeValue('gray.600', 'gray.200');
    const { login, photo, name } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [openedMenu, setOpendMenu] = useState(false);

    const handleLogout = async () => {
        await mutation.mutateAsync();
    };

    const mutation = useMutation(() => logoutUser(), {
        onSuccess() {
            dispatch(logoutUserAuth());
        },
        onError() {
            ErrorToast('Failed');
        },
    });

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH="3.8rem"
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle="solid"
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align="center"
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                    data-testid="hamburgur-menu"
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant="ghost"
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>

                <Flex
                    flex={{ base: 1 }}
                    justify={{ base: 'center', md: 'start' }}
                    data-testid="header-logo"
                >
                    <Flex
                        alignItems="center"
                        height="2rem"
                        width="2rem"
                        textAlign={useBreakpointValue({
                            base: 'center',
                            md: 'left',
                        })}
                        fontFamily="heading"
                        color={useColorModeValue('gray.800', 'white')}
                    >
                        <Link to="/">
                            <img
                                src="/logo-dark.png"
                                height="100%"
                                width="100%"
                                alt="logo"
                            ></img>
                        </Link>
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify="flex-end"
                    direction="row"
                    spacing={5}
                >
                    <Link to="/code-box" data-testid="codebox-button">
                        <Button
                            fontSize="sm"
                            fontWeight={500}
                            variant="link"
                            padding="0.5rem"
                            display={{ base: 'none', md: 'inline-flex' }}
                            color={useColorModeValue('gray.600', 'gray.200')}
                        >
                            Code Box
                        </Button>
                    </Link>

                    <Link to="/meetp" data-testid="meetp-button">
                        <Button
                            fontSize="sm"
                            fontWeight={500}
                            variant="link"
                            padding="0.5rem"
                            display={{ base: 'none', md: 'inline-flex' }}
                            color={useColorModeValue('gray.600', 'gray.200')}
                        >
                            Meetp
                        </Button>
                    </Link>

                    {!login && (
                        <Link to="/login" data-testid="login-button">
                            <Button
                                fontSize="sm"
                                fontWeight={500}
                                variant="link"
                                padding="0.5rem"
                                display={{ base: 'none', md: 'inline-flex' }}
                                color={greyColor}
                            >
                                Log in
                            </Button>
                        </Link>
                    )}

                    {!login && (
                        <Link to="/authenticate" data-testid="signup-button">
                            <Button
                                display="inline-flex"
                                fontSize="sm"
                                fontWeight={600}
                                color="white"
                                bg="main.blue"
                                _hover={{
                                    bg: 'main.blue.hover',
                                }}
                            >
                                Sign Up
                            </Button>
                        </Link>
                    )}

                    {login && (
                        <Link to="/" data-testid="logout-button">
                            <Button
                                fontSize="sm"
                                fontWeight={500}
                                variant="link"
                                padding="0.5rem"
                                display={{ base: 'none', md: 'inline-flex' }}
                                color={greyColor}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Link>
                    )}

                    {login && (
                        <>
                            <Menu
                                isLazy
                                lazyBehavior="unmount"
                                closeOnBlur
                                onOpen={() => setOpendMenu(true)}
                                onClose={() => setOpendMenu(false)}
                            >
                                <span
                                    tabIndex={-1}
                                    className="sidenav-handler"
                                    style={{
                                        display: `${
                                            openedMenu ? 'block' : 'none'
                                        }`,
                                        margin: '0px',
                                    }}
                                    data-testid="black-area-header"
                                ></span>

                                <MenuButton data-testid="avatar-button">
                                    <Avatar
                                        marginRight="0.5rem"
                                        size={'sm'}
                                        name={name}
                                        src={photo}
                                        data-testid="user-avatar-header"
                                    />
                                </MenuButton>

                                <MenuList
                                    zIndex={'9999'}
                                    data-testid="logout-menu-button"
                                >
                                    <Link to="/" onClick={handleLogout}>
                                        <MenuItem>Logout</MenuItem>
                                    </Link>
                                </MenuList>
                            </Menu>
                        </>
                    )}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
};

export default Header;
