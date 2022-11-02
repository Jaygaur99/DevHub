import { useCallback, useEffect, useRef, useState } from 'react';
import {
    addChatType,
    addUserType,
    cbRefType,
    initialChatType,
    initialUsersType,
    updateStateWithCallback,
} from 'Types';

const useStateWithCallBack: updateStateWithCallback = (
    initalUsers,
    initalChats,
) => {
    // users state
    const [users, setUsers] = useState<initialUsersType>(initalUsers);
    const cbRef = useRef<cbRefType>({ stateFunction: null });

    const [chats, setChats] = useState<initialChatType>(initalChats);

    // add user based on many checks
    const addUser: addUserType = useCallback(
        (newUserInfo, cb) => {
            const isAdded =
                typeof newUserInfo === 'function'
                    ? -1
                    : users.findIndex(
                          (user) => user.userId === newUserInfo?.userId,
                      );

            if (isAdded === -1) {
                cbRef.current.stateFunction = cb ? cb : null;

                setUsers((prev) => {
                    if (typeof newUserInfo === 'function') {
                        return newUserInfo(prev);
                    }

                    return [...prev, newUserInfo];
                });
            }
        },
        [users],
    );

    const addChats: addChatType = useCallback(
        (newChat) => {
            const isAdded =
                typeof newChat === 'function'
                    ? -1
                    : chats.findIndex(
                          (chat) => chat.messageId === newChat.messageId,
                      );

            if (isAdded === -1) {
                setChats((prev) => {
                    if (typeof newChat === 'function') {
                        return newChat(prev);
                    }

                    return [...prev, newChat];
                });
            }
        },
        [chats],
    );

    // cb -> do when clients update
    useEffect(() => {
        if (cbRef.current) {
            cbRef.current.stateFunction?.(users);
            cbRef.current.stateFunction = null;
        }
    }, [users]);

    return [users, addUser, chats, addChats];
};

export default useStateWithCallBack;
