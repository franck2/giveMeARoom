import { useEffect, useState } from 'react';

import { useGetRoomBooking } from '../../../../api/rooms/calls/useGetRoomBooking';
import { ITimeLineBloc } from '../../../../types/components/pages/room/timeline/ITimeLineBloc';
import { mapBookingToTimeLineBloc } from './helpers/timeLineMappers';
import { TimeLineBloc } from './TimeLineBloc';

interface ITimLineProps {
    idRoom: string,
}

export const TimeLine = ({ idRoom }: ITimLineProps) => {
    const { bookings } = useGetRoomBooking(idRoom);

    const [timelineBlocs, setTimeLineBlocs] = useState<ITimeLineBloc[]>([]);

    useEffect(() => {
        if (bookings) {
            setTimeLineBlocs(mapBookingToTimeLineBloc(bookings));
        }
    }, [bookings]);

    return (
        <div className={'timeline-container'}>
            <div className={'timeline-container__row'}>
                {
                    timelineBlocs.map((bloc) => (

                        <TimeLineBloc key={`timeline-bloc-${bloc.minutesFromBegining}`} timeLineBloc={bloc}/>
                    ))
                }
            </div>
        </div>);
};
