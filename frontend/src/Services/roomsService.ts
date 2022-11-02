import Axios from './Axios';

const getAllRooms = () => Axios.get('/room/rooms');

const createRooms = (
    roomName: string,
    roomType: 'OPEN' | 'SOCIAL' | 'PRIVATE',
) =>
    Axios.post('/room/create', {
        name: roomName,
        type: roomType,
    });

const singleRoom = (room_id: string) => Axios.get(`/room/single/${room_id}`);

const verifyRoomPassword = (room_id: string, password: string) =>
    Axios.post(`room/verify/${room_id}`, {
        password,
    });

export { getAllRooms, createRooms, singleRoom, verifyRoomPassword };
