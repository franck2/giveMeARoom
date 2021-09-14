import './scss/RoomHeader.scss';

export const RoomHeader = () => (
    <div className={'room-bar-container'}>
        <div className={'room-bar-container__row'}>
            <div className={'room-bar-container__col-2'}></div>
            <div className={'room-bar-container__col-8'}>Current Room</div>
            <div className={'room-bar-container__col-2'}>Hour To Display</div>
        </div>
    </div>);
