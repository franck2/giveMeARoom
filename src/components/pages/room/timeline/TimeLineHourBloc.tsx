import { ITimeLineBloc } from '../../../../types/components/pages/room/timeline/ITimeLineBloc';
import './scss/TimeLine.scss';
import { TimeLineSlot } from './TimeLineSlot';

interface ITimeLineHourBlocProps {
    minutesSlots: ITimeLineBloc[],
    hour: number,
}

export const TimeLineHourBloc = ({
    minutesSlots,
    hour,
}: ITimeLineHourBlocProps) => (
    <div className={'timeline-container__col-1 bloc-container'}>
        <div className={'bloc-container__row title'}>
            <div className={'bloc-container__col-1 slot-container'}>
                {hour}
            </div>
            <div className={'bloc-container__col-2 slot-container'}>
            </div>
        </div>
        <div className={'bloc-container__row'}>
            <div className={'bloc-container__col-1 slot-container'}>

            </div>
            <div className={'bloc-container__col-2 slot-container'}>
                <div className={'slot-container__row'}>

                    {minutesSlots.map((slot) => (<TimeLineSlot key={`ok${slot.startMinute}${hour}`} slot={slot}/>))}
                </div>
            </div>
        </div>
    </div>
);
