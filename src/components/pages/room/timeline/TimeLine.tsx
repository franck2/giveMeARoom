import { useEffect, useState } from 'react';

import { useAuthContext } from '../../../../providers/AuthProvider';
import { IRoomBookingFront } from '../../../../types/components/pages/room/IRoomBooking';
import { ITimeLineBloc } from '../../../../types/components/pages/room/timeline/ITimeLineBloc';
import { mapBookingToTimeLineBloc } from './helpers/timeLineMappers';
import { TimeLineHourBloc } from './TimeLineHourBloc';
import './scss/TimeLine.scss';

interface ITimLineProps {
    bookings: IRoomBookingFront[],
}

export const TimeLine = ({ bookings }: ITimLineProps) => {
    const [timelineBlocs, setTimeLineBlocs] = useState<Map<number, ITimeLineBloc[]>>(new Map());
    const { auth } = useAuthContext();

    useEffect(() => {
        setTimeLineBlocs(mapBookingToTimeLineBloc(bookings, auth?.userId));
    }, [bookings, auth?.userId]);

    return (
        <div className={'timeline-container'}>
            <div className={'timeline-container__row'}>
                {
                    [...timelineBlocs].map((bloc) => (
                        <TimeLineHourBloc
                            key={`timeline-bloc-${bloc[0]}`}
                            hour={bloc[0]}
                            minutesSlots={bloc[1]}
                        />
                    ))
                }
            </div>
        </div>);
};
