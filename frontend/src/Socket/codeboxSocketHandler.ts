import {
    addChats,
    addFile,
    addUsers,
    changeCode,
    changeFileName,
    removeFile,
    removeUsers,
    resetCodeFn,
} from 'features';

import SuccessToast from 'Utils/Toast/Success';
import {
    ACTIONS_ADD_CODE_USER,
    ACTIONS_ADD_FILES_CODE_SERVER,
    ACTIONS_CODE_CHAT,
    ACTIONS_CODE_JOIN,
    ACTIONS_REMOVE_CODE_USER,
    ACTIONS_REMOVE_FILES_CODE_SERVER,
    ACTIONS_RENAME_CODE_FILE_SERVER,
    ACTIONS_RESET_CODE_SERVER,
    ACTIONS_SEND_CODE_SERVER_CODE,
} from './actions';
import { socket } from './socket';

import {
    chatType,
    codeBoxType,
    fileFormat,
    socketCodeboxUser,
    templateFormat,
} from 'Types';
import { AppDispatch } from 'store/store';

export const socketEmit = (codebox_id: string, user: socketCodeboxUser) =>
    socket.emit(ACTIONS_CODE_JOIN, { codebox_id, user });

export const socketAddUser = ({
    dispatch,
    currentUserId,
}: {
    dispatch: AppDispatch;
    currentUserId: string;
}) =>
    socket.on(
        ACTIONS_ADD_CODE_USER,
        async ({ user }: { user: socketCodeboxUser }) => {
            dispatch(addUsers({ user }));

            if (user.username && user.userId !== currentUserId) {
                SuccessToast(`${user.username} joined`);
            }
        },
    );

export const socketRemoveUser = ({ dispatch }: { dispatch: AppDispatch }) => {
    socket.on(
        ACTIONS_REMOVE_CODE_USER,
        async ({ userId, username }: { userId: string; username: string }) => {
            dispatch(removeUsers({ userId }));
            username && SuccessToast(`${username} left`);
        },
    );
};

export const socketChat = ({ dispatch }: { dispatch: AppDispatch }) => {
    socket.on(
        ACTIONS_CODE_CHAT,
        async ({ chats }: { chats: chatType[] | chatType }) => {
            dispatch(addChats({ chat: chats }));
        },
    );
};

export const socketCode = ({ dispatch }: { dispatch: AppDispatch }) => {
    socket.on(
        ACTIONS_SEND_CODE_SERVER_CODE,
        ({ code, filePath }: { code: string; filePath: string }) => {
            dispatch(changeCode({ code, filePath }));
        },
    );
};

export const socketCodeReset = ({ dispatch }: { dispatch: AppDispatch }) => {
    socket.on(
        ACTIONS_RESET_CODE_SERVER,
        ({
            language,
            codeBoxType,
            codebox_id,
        }: {
            language: codeBoxType;
            codeBoxType: 'LIBRARY' | 'LANGUAGE';
            codebox_id: string;
        }) => {
            resetCodeFn(false, dispatch, language, codeBoxType, codebox_id);
        },
    );
};

export const socketCodeRename = ({ dispatch }: { dispatch: AppDispatch }) => {
    socket.on(
        ACTIONS_RENAME_CODE_FILE_SERVER,
        ({ file, fileName }: { file: fileFormat; fileName: string }) => {
            dispatch(changeFileName({ file, fileName }));
        },
    );
};

export const socketCodeFileAdd = ({ dispatch }: { dispatch: AppDispatch }) => {
    socket.on(
        ACTIONS_ADD_FILES_CODE_SERVER,
        ({ file }: { file: fileFormat }) => {
            dispatch(addFile({ file }));
        },
    );
};

export const socketCodeFileRemove = ({
    dispatch,
    allFiles,
}: {
    dispatch: AppDispatch;
    allFiles: templateFormat;
}) => {
    socket.on(
        ACTIONS_REMOVE_FILES_CODE_SERVER,
        ({ file }: { file: fileFormat }) => {
            dispatch(removeFile({ file, allFiles }));
        },
    );
};
