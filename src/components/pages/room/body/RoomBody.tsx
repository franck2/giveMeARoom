import './scss/RoomBody.scss';

export const RoomBody = () => (
    <div className={'container--fluid room-body' }>
        <div className="container__row ">
            <div className={'container__col-sm-6 container__col-md-12 higher room-msg'}>
                <div>La salle est Libre</div>

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
