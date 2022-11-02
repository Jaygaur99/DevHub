import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { joinCodebox } from 'Services';

import {
    LanguageCodebox,
    LibraryCodebox,
    resetCodeboxState,
    setUserJoinedCodebox,
    ShareModal,
    resetCodeFn,
    addUsers,
    setSelectedFile,
    initializeEsbuild,
} from 'features';
import {
    Container as MainContainer,
    MainLoader,
    NotFoundTemplate,
} from 'Components';

import {
    ACTIONS_ADD_CODE_USER,
    ACTIONS_ADD_FILES_CODE_SERVER,
    ACTIONS_CODE_CHAT,
    ACTIONS_CODE_LEAVE,
    ACTIONS_REMOVE_CODE_USER,
    ACTIONS_REMOVE_FILES_CODE_SERVER,
    ACTIONS_RENAME_CODE_FILE_SERVER,
    ACTIONS_RESET_CODE_SERVER,
    ACTIONS_SEND_CODE_SERVER_CODE,
} from 'Socket/actions';
import {
    socketAddUser,
    socketChat,
    socketCode,
    socketCodeFileAdd,
    socketCodeFileRemove,
    socketCodeRename,
    socketCodeReset,
    socketEmit,
    socketRemoveUser,
} from 'Socket/codeboxSocketHandler';
import { socket } from 'Socket/socket';

import { codeBoxCreateResponse } from 'Types';
import { AxiosResponse } from 'axios';

import ErrorToast from 'Utils/Toast/Error';

const SingleCodebox = () => {
    const { codeboxId } = useParams();
    const { codeBoxType, codebox_id, allFiles, selectedFile, esbuildReady } =
        useAppSelector((state) => state.codebox);
    const { photo, username, userId } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const { isLoading, isError } = useQuery<
        AxiosResponse<codeBoxCreateResponse>,
        Error
    >(
        '/codebox/singleRoom',
        // @ts-ignore
        async () => await joinCodebox(codeboxId),
        {
            retry: 3,
            refetchOnWindowFocus: false,
            onSuccess: (data: AxiosResponse<codeBoxCreateResponse>) => {
                dispatch(setUserJoinedCodebox(data.data.room));

                resetCodeFn(
                    false,
                    dispatch,
                    data.data.room.language,
                    data.data.room.codebox_type,
                    data.data.room.codebox_id,
                );
            },
            onError: (error: Error) => {
                console.log(error);
                ErrorToast('Failed');
            },
        },
    );

    useEffect(() => {
        const initalize = () => {
            dispatch(addUsers({ user: { photo, userId, username } }));

            socketEmit(codebox_id, { photo, userId, username });

            socketAddUser({
                dispatch,
                currentUserId: userId,
            });

            socketRemoveUser({
                dispatch,
            });

            socketChat({
                dispatch,
            });

            socketCode({
                dispatch,
            });

            socketCodeReset({
                dispatch,
            });

            socketCodeRename({
                dispatch,
            });

            socketCodeFileAdd({
                dispatch,
            });
        };

        codebox_id && initalize();

        return () => {
            socket.emit(ACTIONS_CODE_LEAVE, { codeboxId });
            socket.off(ACTIONS_ADD_CODE_USER);
            socket.off(ACTIONS_REMOVE_CODE_USER);
            socket.off(ACTIONS_CODE_CHAT);
            socket.off(ACTIONS_SEND_CODE_SERVER_CODE);
            socket.off(ACTIONS_RESET_CODE_SERVER);
            socket.off(ACTIONS_RENAME_CODE_FILE_SERVER);
            socket.off(ACTIONS_ADD_FILES_CODE_SERVER);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codebox_id]);

    useEffect(() => {
        socketCodeFileRemove({
            dispatch,
            allFiles,
        });

        !Object.keys(allFiles)
            .map((filePath) => selectedFile === filePath)
            .filter(Boolean)
            .pop() &&
            dispatch(
                setSelectedFile({
                    filePath: Object.keys(allFiles)[0],
                }),
            );

        return () => {
            socket.off(ACTIONS_REMOVE_FILES_CODE_SERVER);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allFiles]);

    useEffect(() => {
        return () => {
            dispatch(resetCodeboxState());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!esbuildReady) {
            initializeEsbuild(dispatch);
        }
    }, [dispatch, esbuildReady]);

    if (isLoading) {
        return <MainLoader />;
    } else if (isError) {
        return (
            <NotFoundTemplate
                mainContent="Codebox not found"
                buttonLink="/codebox"
                buttonText="Return to home"
            />
        );
    }

    return (
        <>
            <MainContainer center={false} marginBottom="0">
                <Flex
                    pos="relative"
                    display="flex"
                    flex="1 1 0px"
                    width="100%"
                    height="100%"
                >
                    {codeBoxType === 'LIBRARY' ? (
                        <LibraryCodebox />
                    ) : (
                        <LanguageCodebox />
                    )}
                </Flex>

                {/* share modal on page load */}
                <ShareModal />
            </MainContainer>
        </>
    );
};

export default SingleCodebox;
