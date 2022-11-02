import {
    Box,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { useAppSelector } from 'store/hooks';

import { qrModalProps } from 'Types';

const QrModal = ({ isOpen, onClose }: qrModalProps) => {
    const { qrcode } = useAppSelector((state) => state.rooms);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                blockScrollOnMount
                isCentered
                size={'md'}
            >
                <ModalOverlay backdropFilter="blur(3px)" />

                <ModalContent>
                    <ModalHeader
                        justifyContent="space-between"
                        alignItems="center"
                        display="flex"
                    >
                        <Text fontSize="1.1rem" fontWeight="700">
                            Room Qr Code
                        </Text>
                        <ModalCloseButton
                            position="unset"
                            onClick={onClose}
                            data-testid="close-qr-modal"
                        />
                    </ModalHeader>

                    <ModalBody pb="1.5rem">
                        <Box display="flex" justifyContent="center">
                            <Image
                                boxSize="12.5rem"
                                src={qrcode}
                                data-testid="qr-code-image"
                                alt="Room Qr Code"
                            />
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default QrModal;
