import { useEffect, useState } from 'react';

import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';
import { IRoomDetails } from '../../../../types/components/pages/room/IRoomDetails';
import { ReservationForm } from './form/ReservationForm';
import { getCurrentBookedSlot } from './helpers/roomBodyHelper';
import { RoomState } from './RoomState';

import './scss/RoomBody.scss';

interface IRoomBodyProps {
    bookings: IRoomBookingFront[],
    roomDetails: IRoomDetails,
    handleGetBooking: () => void,
    handleDeleteBooking: (idBooking: string) => void,
}

export const RoomBody = ({
    bookings,
    roomDetails,
    handleGetBooking,
    handleDeleteBooking,
}: IRoomBodyProps) => {
    const [bookedSlot, setBookedSlot] = useState<IRoomBookingFront>();

    useEffect(() => {
        setBookedSlot(getCurrentBookedSlot(bookings));
    }, [bookings]);

    return (
        <div className={'container--fluid room-body' }>
            <div className="container__row ">
                <div className={'container__col-sm-6 container__col-md-12'}>
                    <RoomState
                        bookedSlot={bookedSlot}
                        handleDeleteBooking={handleDeleteBooking}
                    />

                </div>

                <div className={'container__col-sm-6 container__col-md-12 room-time-selection-container'}>
                    <ReservationForm
                        bookings={bookings}
                        roomDetails={roomDetails}
                        handleGetBooking={handleGetBooking}
                    />
                </div>
            </div>
        </div>);
};
