import { useEffect, useState } from 'react';

import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../../../types/components/pages/room/IRoomDetails';
import { getCurrentBookedSlot } from './helpers/roomBodyHelper';
import { ReservationForm } from './ReservationForm';
import { RoomState } from './RoomState';

import './scss/RoomBody.scss';

interface IRoomBodyProps {
    bookings: IRoomBookingFront[],
    roomDetails: IRoomDetails,
}

export const RoomBody = ({ bookings, roomDetails }: IRoomBodyProps) => {
    const [bookedSlot, setBookedSlot] = useState<IRoomBookingFront>();

    useEffect(() => {
        setBookedSlot(getCurrentBookedSlot(bookings));
    }, [bookings]);

    return (
        <div className={'container--fluid room-body' }>
            <div className="container__row ">
                <div className={'container__col-sm-6 container__col-md-12'}>
                    <RoomState bookedSlot={bookedSlot}/>
                </div>

                <div className={'container__col-sm-6 container__col-md-12 room-time-selection-container'}>
                    <ReservationForm bookings={bookings} roomDetails={roomDetails}/>
                </div>
            </div>
        </div>);
};
