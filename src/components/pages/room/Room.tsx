import { useGetRoomDetails } from '../../../api/rooms/calls/useGetRoomDetails';
import { RoomHeader } from './RoomHeader';

export const Room = () => {
    const { roomDetails } = useGetRoomDetails();
    // const { booking } = useGetRoomBooking(roomDetails?.id);

    return (
        <>
            {roomDetails && <RoomHeader roomName={roomDetails?.name}/>}
            <div>MyRoom</div>
        </>);
};
