import { useEffect, useState } from 'react';

import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';
import { getCurrentBookedSlot } from './roomBodyHelper';
import './scss/RoomBody.scss';
import { RoomState } from './RoomState';

interface IRoomBodyProps {
    bookings: IRoomBookingFront[],
}

export const RoomBody = ({ bookings }: IRoomBodyProps) => {
    const [bookedSlot, setBookedSlot] = useState<IRoomBookingFront>();

    useEffect(() => {
        setBookedSlot(getCurrentBookedSlot(bookings));
    }, [bookings]);

    return (
        <div className={'container--fluid room-body' }>
            <div className="container__row ">
                <div className={'container__col-sm-6 container__col-md-12 higher'}>
                    <RoomState bookedSlot={bookedSlot}/>
                </div>

                <div className={'container__col-sm-6 container__col-md-12 higher room-time-selection-container'}>
                    <div className={'room-time-msg'}>
                        <div>Réserver la salle pendant</div>
                    </div>
                    <button>bouton +</button>
                    <button>bouton -</button>
                    <button>bouton réserver</button>
                </div>
            </div>
        </div>);
};
