import React, {RefObject} from 'react';
import MonthHeader from '../MonthHeader/monthHeader';
import WeekHeader from '../WeekHeader/weekHeader';
import Weeks from '../Weeks/weeks';
import './calendar.scss';

type CalendarProps = {
    id: string;
    view: Date;
    selected: Date;
    onSelect: Function;
    minDate?: Date;
    maxDate?: Date;
    visible: boolean;
    styles?:{};
}
export default class Calendar extends React.PureComponent <CalendarProps> {

    constructor(props: CalendarProps) {
        super(props);

        this.monthHeaderRef = React.createRef();
        this.weeksRef = React.createRef();

        this.onTransitionEnd = this.onTransitionEnd.bind(this);
        this.onMove = this.onMove.bind(this);
    }

    public monthHeaderRef: RefObject<MonthHeader>;
    public weeksRef: RefObject<Weeks>;

    onMove(view: Date, isForward: boolean) {
        this.weeksRef.current.moveTo(view, isForward);
    };

    onTransitionEnd() {
        this.monthHeaderRef.current.enable();
    };

    render() {
        const calendarClass = `c-calendar-${this.props.id} c-calendar${this.props.visible ? ' calendar-show' : ' calendar-hide'}`;

        return (

            <div className={calendarClass} style={this.props.styles}>
                <MonthHeader ref={this.monthHeaderRef} view={this.props.view} onMove={this.onMove}/>
                <WeekHeader/>
                <Weeks ref={this.weeksRef} view={this.props.view} selected={this.props.selected}
                       onTransitionEnd={this.onTransitionEnd} onSelect={this.props.onSelect}
                       minDate={this.props.minDate}
                       maxDate={this.props.maxDate}/>
            </div>

        );
    };

}
