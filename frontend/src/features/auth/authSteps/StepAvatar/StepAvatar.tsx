import { Avatar, WrapItem, Text, Flex, Input } from '@chakra-ui/react';

import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setAvatar } from 'features';

import { AuthButton, Card } from 'Components';

import { AuthStepProps } from 'Types';

const StepAvatar = ({ onClick }: AuthStepProps) => {
    const { avatar, name } = useAppSelector((state) => state.activate);
    const disptach = useAppDispatch();

    const [image, setImage] = useState(avatar);
    const avatarRef = useRef(null);

    const captureImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // @ts-ignore
            setImage(reader.result);
        };
    };

    const handleNext = () => {
        disptach(setAvatar({ avatar: image }));
        onClick();
    };

    useEffect(() => {
        let unMounted = false;

        const createFile = async () => {
            const response = await fetch('images/defaultavatar.jpg');
            const data = await response.blob();
            const file = new File([data], 'defaultavatar.jpg', {
                type: 'image/jpg',
            });

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (image === '') setImage(reader.result?.toString() ?? '');

                if (!unMounted)
                    disptach(
                        setAvatar({ avatar: reader.result?.toString() ?? '' }),
                    );
            };
        };

        createFile();

        return () => {
            unMounted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Card
                icon="avatar"
                title={`Okay, ${name}!`}
                key={'avatarcard'}
                dataTestId="activate-avatar-card"
            >
                <Text
                    marginTop="0.4rem"
                    fontSize={{ ssm: '0.95rem', sm: '0.86rem' }}
                    fontWeight={500}
                    color={'main.text'}
                    gap="0.4rem"
                >
                    How's this photo?
                </Text>

                <WrapItem marginTop="0.9rem">
                    <Avatar
                        size="xl"
                        showBorder
                        name="user avatar"
                        borderColor="main.blue"
                        borderWidth="0.22rem"
                        overflow="hidden"
                        src={image}
                        data-testid="activate-user-avatar"
                    />
                </WrapItem>
                <Flex
                    fontSize={{ ssm: '0.92rem', sm: '0.9rem' }}
                    fontWeight={500}
                    marginTop="0.8rem"
                    color="main.blue"
                    gap="0.4rem"
                    cursor="pointer"
                    // @ts-ignore
                    onClick={() => avatarRef.current.click()}
                >
                    <Input
                        type="file"
                        accept="image/png ,image/jpg, image/jpeg, image/gif, image/webp , image/svg"
                        display="none"
                        ref={avatarRef}
                        onChange={captureImage}
                        required
                        aria-required
                    />
                    Choose a different photo
                </Flex>
                <AuthButton
                    buttonText="Next"
                    marginTop="1rem"
                    onClick={handleNext}
                />
            </Card>
        </>
    );
};

export default StepAvatar;
