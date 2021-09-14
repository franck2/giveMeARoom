import { useGetRoomDetails } from './hooks/useGetRoomDetails';
import { RoomHeader } from './RoomHeader';

export const Room = () => {
    const { roomDetails } = useGetRoomDetails();

    return <>{roomDetails && <RoomHeader roomName={roomDetails?.name}/>}<div>MyRoom</div></>;
};
