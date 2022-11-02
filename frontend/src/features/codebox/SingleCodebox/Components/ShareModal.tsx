import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { CopyField } from 'Components';
import { useParams } from 'react-router-dom';

const ShareModal = () => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    const { codeboxId } = useParams();

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
                            Codebox link and password
                        </Text>
                        <ModalCloseButton position="unset" onClick={onClose} />
                    </ModalHeader>

                    <ModalBody pb={4}>
                        <CopyField
                            inputCopyValue={codeboxId ?? ''}
                            labelText="Room Link"
                            marginTop="0rem"
                            fieldType="ROOM_URL"
                            key={'room link'}
                            type="code-box"
                        />

                        <CopyField
                            inputCopyValue={codeboxId ?? ''}
                            labelText="Room Id"
                            marginTop="0.7rem"
                            fieldType="ROOM_PASSWORD"
                            key={'room password'}
                            type="code-box"
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ShareModal;
