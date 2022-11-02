import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { removeFileFolder } from 'features';

import { useAppDispatch, useAppSelector } from 'store/hooks';

import { fileFormat } from 'Types';

const DeleteFileModel = ({
    isOpen,
    onClose,
    currentFile,
}: {
    isOpen: boolean;
    onClose: () => void;
    currentFile: fileFormat;
}) => {
    const dispatch = useAppDispatch();
    const { codebox_id, allFiles } = useAppSelector((state) => state.codebox);

    const handleFileDelete = () => {
        onClose();
        removeFileFolder(dispatch, codebox_id, currentFile, allFiles);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount
                isCentered
                closeOnOverlayClick={false}
                closeOnEsc
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        justifyContent="space-between"
                        alignItems="center"
                        display="flex"
                    >
                        <Text fontSize="1.1rem" fontWeight="700">
                            Delete File
                        </Text>
                        <ModalCloseButton onClick={onClose} position="unset" />
                    </ModalHeader>

                    <ModalBody pb="1.5rem">
                        <Box width="100%">
                            <Text
                                fontWeight="600"
                                fontSize="0.95rem"
                                marginBottom="0.2rem"
                            >
                                Are you sure you want to delete{' '}
                                {currentFile.name} ? The {currentFile.type} will
                                be permanently removed.
                            </Text>
                        </Box>
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
                            border="2px solid"
                            borderColor="main.blue"
                            textColor="main.blue"
                            borderRadius="0.4rem"
                            bg="inherit"
                            minW="6rem"
                            _hover={{
                                bg: 'main.blue',
                                borderColor: 'transparent',
                                color: 'white',
                            }}
                            fontWeight={700}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            minW="6rem"
                            fontWeight={700}
                            bg="red.500"
                            color="white"
                            _hover={{
                                bg: 'red.300',
                            }}
                            _focus={{
                                outlineColor: 'red.300',
                            }}
                            onClick={handleFileDelete}
                            borderRadius="0.4rem"
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteFileModel;
