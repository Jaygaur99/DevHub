/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

import { socket } from 'Socket/socket';
import {
    socketAddUser,
    socketChat,
    socketEmit,
    socketGetIceCandidate,
    socketGetOfferAns,
    socketRemoveUser,
    socketUserMuteUnmute,
} from 'Socket/socketHandler';

import useStateWithCallback from './useStateWithCallback';
import { useAppSelector } from 'store/hooks';

import {
    addAudioRefType,
    currentUserAudioInput,
    useSingleRoomWebRtcType,
    roomUserType,
    handleNewChatFunction,
} from 'Types';

import {
    ACTIONS_ADD_USER,
    ACTIONS_REMOVE_USER,
    ACTIONS_SESSION_DESCRIPTION,
    ACTIONS_ICE_CANDIDATE,
    ACTIONS_LEAVE,
    ACTIONS_MUTE_UNMUTE,
    ACTIONS_SEND_MUTE_UNMUTE,
    ACTIONS_CHAT,
    ACTIONS_SEND_CHAT,
} from 'Socket/actions';

const useSingleRoomWebRtc: useSingleRoomWebRtcType = (roomId, user) => {
    const [users, addUser, chats, addChats] = useStateWithCallback([], []);
    const { authenticated } = useAppSelector((state) => state.rooms);

    // all clients connection  ,  all clients audio input ref for mute and unmute and audio
    const roomUsers = useRef<roomUserType>({ audio: {}, rtc: {} });

    // current user audio input box
    const currentUserAudioInput = useRef<currentUserAudioInput>({
        media: null,
    });

    // add audio to clients with ref of instance
    const addAudioRef: addAudioRefType = (userId, instance) => {
        roomUsers.current.audio[userId] = instance;
    };

    // capture user media
    const captureUserMedia = async () => {
        currentUserAudioInput.current.media =
            await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

        currentUserAudioInput.current.media &&
            (currentUserAudioInput.current.media.getTracks()[0].enabled =
                false);
    };

    const handleMuted = (userId: string) => {
        const currentUser = users.find((user) => user.userId === userId);

        // change user icons
        addUser((allUser) => {
            return allUser.map((user) =>
                user.userId === userId
                    ? {
                          ...user,
                          muted: !user.muted,
                      }
                    : user,
            );

            // return allUser.map((user) =>
            //     user.userId === userId
            //         ? ((user.muted = !user.muted), user)
            //         : user,
            // );
        }, null);

        if (currentUserAudioInput.current.media && !!currentUser) {
            currentUserAudioInput.current.media.getTracks()[0].enabled =
                currentUser.muted;

            if (currentUser.muted) {
                socket.emit(ACTIONS_SEND_MUTE_UNMUTE, {
                    roomId: roomId,
                    userId: userId,
                    mute: false,
                });
            } else {
                socket.emit(ACTIONS_SEND_MUTE_UNMUTE, {
                    roomId: roomId,
                    userId: userId,
                    mute: true,
                });
            }
        }
    };

    const handleNewChat: handleNewChatFunction = (messageBody) => {
        socket.emit(ACTIONS_SEND_CHAT, {
            roomId,
            messageBody,
            username: user.username,
        });
    };

    // called when user is authenticated for room
    useEffect(() => {
        const initalize = async () => {
            // capture user media
            await captureUserMedia();

            // add to users list
            addUser({ ...user, muted: true }, () => {
                const currentUser = roomUsers.current.audio[user.userId];

                // mute currrent user
                if (currentUser) {
                    currentUser.volume = 0;
                    currentUser.srcObject = currentUserAudioInput.current.media;
                }
            });

            // join socket
            socketEmit(roomId, { ...user, muted: user.muted });

            // handle add new user
            socketAddUser({
                addUser,
                currentUserAudioInput,
                roomUsers,
            });

            // handle ice candidate
            socketGetIceCandidate({
                roomUsers,
            });

            // handle offer and ans
            socketGetOfferAns({
                roomUsers,
            });

            socketRemoveUser({
                addUser,
                roomUsers,
            });

            socketUserMuteUnmute({
                addUser,
            });

            socketChat({
                addChats,
            });
        };

        if (authenticated === 'AUTHENTICATED') {
            initalize();
        }
    }, [authenticated, roomId]);

    // called on app mounted and unmounted
    useEffect(() => {
        return () => {
            currentUserAudioInput.current.media
                ?.getTracks()
                .forEach((track) => track.stop());
            socket.emit(ACTIONS_LEAVE, { roomId });
            for (const socketId in roomUsers.current.rtc) {
                roomUsers.current.rtc[socketId].close();
                delete roomUsers.current.rtc[socketId];
            }
            socket.off(ACTIONS_ADD_USER);
            socket.off(ACTIONS_ICE_CANDIDATE);
            socket.off(ACTIONS_SESSION_DESCRIPTION);
            socket.off(ACTIONS_REMOVE_USER);
            socket.off(ACTIONS_MUTE_UNMUTE);
            socket.off(ACTIONS_CHAT);
        };
    }, []);

    return { users, chats, addAudioRef, handleMuted, handleNewChat };
};

export default useSingleRoomWebRtc;
