import { useEffect, useState } from 'react';

import { useGetRoomBooking } from '../../../../api/rooms/calls/useGetRoomBooking';
import { ITimeLineBloc } from '../../../../types/components/pages/room/timeline/ITimeLineBloc';
import { mapBookingToTimeLineBloc } from './helpers/timeLineMappers';
import { TimeLineHourBloc } from './TimeLineHourBloc';
import './scss/TimeLine.scss';

interface ITimLineProps {
    idRoom: string,
}

export const TimeLine = ({ idRoom }: ITimLineProps) => {
    const { bookings } = useGetRoomBooking(idRoom);

    const [timelineBlocs, setTimeLineBlocs] = useState<Map<number, ITimeLineBloc[]>>(new Map());

    useEffect(() => {
        if (bookings) {
            setTimeLineBlocs(mapBookingToTimeLineBloc(bookings));
        }
    }, [bookings]);

    return (
        <div className={'timeline-container'}>
            <div className={'timeline-container__row'}>
                {
                    [...timelineBlocs].map((bloc) => (
                        <TimeLineHourBloc
                            key={`timeline-bloc-${bloc[0]}`}
                            hour={bloc[0] + 1}
                            minutesSlots={bloc[1]}
                        />
                    ))
                }
            </div>
        </div>);
};
