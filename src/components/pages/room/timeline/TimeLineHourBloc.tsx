import { ITimeLineBloc } from '../../../../types/components/pages/room/timeline/ITimeLineBloc';
import './scss/TimeLine.scss';
import { TimeLineSlotBloc } from './TimeLineSlot';

interface ITimeLineHourBlocProps {
    minutesSlots: ITimeLineBloc[],
    hour: number,
}

export const TimeLineHourBloc = ({
    minutesSlots,
    hour,
}: ITimeLineHourBlocProps) => (
    <div className={'timeline-container__col-1 test-container'}>
        <div className={'test-container__row title'}>
            <div className={'test-container__col-1 hour-container'}>
                {hour}
            </div>
            <div className={'test-container__col-2 hour-container'}>
            </div>
        </div>
        <div className={'test-container__row'}>
            <div className={'test-container__col-1 hour-container'}>

            </div>
            <div className={'test-container__col-2 hour-container'}>
                <div className={'hour-container__row'}>

                    {minutesSlots.map((slot) => (<TimeLineSlotBloc key={`ok${slot.startMinute}${hour}`} slot={slot}/>))}
                </div>
            </div>
        </div>
    </div>
);
