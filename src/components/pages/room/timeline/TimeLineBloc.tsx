import { ITimeLineBloc } from '../../../../types/components/pages/room/timeline/ITimeLineBloc';
import './scss/TimeLineBloc.scss';
import './scss/TimeLine.scss';

interface ITimeLineBlocProps {
    timeLineBloc: ITimeLineBloc,
}

export const TimeLineBloc = ({ timeLineBloc }: ITimeLineBlocProps) => (
    <div className={`timeline-container__col-${timeLineBloc.minutesDuration} ${timeLineBloc.status} `}></div>);
