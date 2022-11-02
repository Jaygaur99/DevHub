import { Button, Flex, Input, Text, useDisclosure } from '@chakra-ui/react';

import { useState, ChangeEvent } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

import { AuthButton, LoadingButton } from 'Components';

import { CodeboxType } from 'features';

import { createCodebox } from 'Services';
import { AxiosResponse } from 'axios';

import ErrorToast from 'Utils/Toast/Error';

import { codeBoxCreateResponse } from 'Types';

const CreateCodeBox = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [codeboxName, setCodeboxName] = useState('');
    const { language } = useAppSelector((state) => state.codebox);
    const navigate = useNavigate();

    const handleRoomNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCodeboxName(event.target.value);
    };

    const { mutateAsync, isLoading } = useMutation<
        AxiosResponse<codeBoxCreateResponse>,
        Error
    >(() => createCodebox(codeboxName, language), {
        onSuccess(data: AxiosResponse<codeBoxCreateResponse>) {
            navigate(`/code-box/${data.data.room.codebox_id}`);
        },
        onError(error: Error) {
            console.log(error);
            ErrorToast('Failed');
        },
    });

    const handleCreateCodebox = async () => {
        codeboxName === ''
            ? ErrorToast('Enter a valid name')
            : await mutateAsync();
    };

    return (
        <>
            <Input
                placeholder="Codebox name..."
                maxWidth="20rem"
                bg="main.input-bg"
                color="main.text.white"
                type="email"
                required={true}
                marginTop="5"
                value={codeboxName}
                onChange={handleRoomNameChange}
            />
            <Flex
                marginTop="5"
                width="100%"
                alignItems="center"
                maxWidth="20rem"
                gap="1rem"
                flexDirection="column"
            >
                <Text
                    bg="main.input-bg"
                    color="main.text.white"
                    width="100%"
                    p="0.5rem 1.25rem"
                    borderRadius="0.4rem"
                    flex="1"
                    textTransform="capitalize"
                >
                    {language.toLowerCase()}
                </Text>
                <Button
                    margin="auto"
                    width="100%"
                    bg="#d1d5db"
                    fontWeight="700"
                    onClick={onOpen}
                >
                    Select Code Type
                </Button>
            </Flex>

            {isLoading ? (
                <LoadingButton marginTop="1.6rem" />
            ) : (
                <AuthButton
                    buttonText="Next"
                    marginTop="1.1rem"
                    onClick={handleCreateCodebox}
                />
            )}

            <CodeboxType isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default CreateCodeBox;
