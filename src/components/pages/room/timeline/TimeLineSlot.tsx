import { ITimeLineBloc } from '../../../../types/components/pages/room/timeline/ITimeLineBloc';
import './scss/TimeLineSlot.scss';
import './scss/TimeLineHourBloc.scss';

interface ITimeLineSlotProps {
    slot: ITimeLineBloc,
}

export const TimeLineSlotBloc = ({ slot }: ITimeLineSlotProps) => (
    <div className={`hour-container__col-${slot.endMinute - slot.startMinute + 1} ${slot.status}`}></div>);
