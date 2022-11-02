import {
    Button,
    Grid,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { memo } from 'react';

import { CodeboxSingleIcon, setLanguage } from 'features';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { codeBoxType, CreateCodeboxProps } from 'Types';

const languageList: Array<codeBoxType> = [
    'JAVASCRIPT',
    'TYPESCRIPT',
    'CPP',
    'PYTHON',
    'REACT',
    'REACT TYPESCRIPT',
];

const CodeboxType = ({ isOpen, onClose }: CreateCodeboxProps) => {
    const dispatch = useAppDispatch();
    const { language: centralLanguage } = useAppSelector(
        (state) => state.codebox,
    );

    const handleLanguageChange = (language: codeBoxType) => {
        dispatch(setLanguage({ language }));
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount
                isCentered
                closeOnOverlayClick={false}
            >
                <ModalOverlay backdropFilter="blur(3px)" />

                <ModalContent>
                    <ModalHeader
                        justifyContent="space-between"
                        alignItems="center"
                        display="flex"
                    >
                        <Text fontSize="1.1rem" fontWeight="700">
                            Codebox Type
                        </Text>
                        <ModalCloseButton position="unset" />
                    </ModalHeader>

                    <ModalBody
                        pb="1.5rem"
                        className="hide-scrollbar"
                        overflowY={'scroll'}
                    >
                        <Grid
                            gridTemplateColumns="repeat(4,minmax(0,1fr))"
                            className="hide-scrollbar"
                            overflowY={'scroll'}
                        >
                            {languageList.map((language) => {
                                const handleLanguageClick = () =>
                                    handleLanguageChange(language);

                                return (
                                    <CodeboxSingleIcon
                                        disabled={
                                            language === 'CPP' ? true : false
                                        }
                                        type={language}
                                        setCodeboxType={handleLanguageClick}
                                        langauage={centralLanguage}
                                        key={language}
                                    />
                                );
                            })}
                        </Grid>
                    </ModalBody>

                    <ModalFooter
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                        gap="2rem"
                        borderTop="2px solid black"
                        borderColor="main.bg.sec"
                        pt="1rem"
                    >
                        <Button
                            bg="main.blue"
                            textColor="white"
                            borderRadius="0.4rem"
                            minW="6rem"
                            onClick={onClose}
                        >
                            Select
                        </Button>

                        <Button
                            w="6rem"
                            fontWeight={600}
                            onClick={onClose}
                            borderRadius="0.4rem"
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default memo(CodeboxType);
