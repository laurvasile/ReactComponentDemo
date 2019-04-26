import React, {RefObject} from 'react';
import DateUtilities from '../../utilities/dateUtilities';
import Calendar from './Calendar/calendar';
import './dateTimePicker.scss'
import Helpers from '../../utilities/helpers';
import Time from './Time/time';
import classNames from 'classnames';

type DateTimePickerProps = {
    selected?: Date;
    onSelect?: Function;
    isTimeVisible?: boolean
    isCalendarVisible?: boolean
}

type DateTimePickerState = {
    id: string;
    maxDate?: Date;
    minDate?: Date;
    isCalendarVisible: boolean;
    calendarStyles?: {};
    isTimeVisible: boolean;
    timeStyles?: {};
    selected: Date;
    view: Date;
}
export default class DateTimePicker extends React.Component<DateTimePickerProps, DateTimePickerState> {
    constructor(props: DateTimePickerProps) {
        super(props);

        const def = this.props.selected || new Date();
        this.dateInputRef = React.createRef();
        this.timeInputRef = React.createRef();

        this.state = {
            id: Helpers.getUniqueIdentifier(),
            view: DateUtilities.clone(def),
            selected: DateUtilities.clone(def),
            isCalendarVisible: this.props.isCalendarVisible || false,
            isTimeVisible: this.props.isTimeVisible ||false
        };

        this.showCalendar = this.showCalendar.bind(this);
        this.showTime = this.showTime.bind(this);
        this.onDateSelect = this.onDateSelect.bind(this);
        this.onTimeSelect = this.onTimeSelect.bind(this);
    }

    public dateInputRef: RefObject<any>;
    public timeInputRef: RefObject<any>;


    componentDidMount() {
        document.addEventListener('click', this.hideCalendarOnDocumentClick.bind(this));
    };

    componentWillUnmount() {
       document.removeEventListener('click', this.hideCalendarOnDocumentClick.bind(this));
    };

    hideCalendarOnDocumentClick(e: any) {
        if (!e.target.className.includes(`date-picker-trigger-${this.state.id}`)) {
            this.hideCalendar();
            this.hideTime()
        }
    };



    setMinDate(date: Date) {
        this.setState({minDate: date});
    };

    setMaxDate(date: Date) {
        this.setState({maxDate: date});
    };

    onDateSelect(day: Date) {
        const newDateTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), this.state.selected.getHours(), this.state.selected.getMinutes(), this.state.selected.getSeconds());

        this.setState({selected: newDateTime});
        this.hideCalendar();

        if (this.props.onSelect)
            this.props.onSelect(newDateTime);
    };

    onTimeSelect(time: Date) {
        const newDateTime = new Date(this.state.selected.getFullYear(), this.state.selected.getMonth(), this.state.selected.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());

        this.setState({selected: newDateTime});
        this.hideTime();

        if (this.props.onSelect)
            this.props.onSelect(newDateTime);
    };

    showCalendar() {
        const trigger = this.dateInputRef.current,
            rect = trigger.getBoundingClientRect(),
            isTopHalf = rect.top > window.innerHeight / 2,
            calendarHeight = 203;
        this.setState({
            isCalendarVisible: true,
            isTimeVisible: false,
            calendarStyles: {
                top: isTopHalf ? (rect.top + window.scrollY - calendarHeight - 3) : (rect.top + trigger.clientHeight + window.scrollY + 3),
                left: rect.left
            }
        });
    };

    showTime() {
        const trigger = this.timeInputRef.current,
            rect = trigger.getBoundingClientRect(),
            isTopHalf = rect.top > window.innerHeight / 2,
            calendarHeight = 203;

        this.setState({
            isTimeVisible: true,
            isCalendarVisible: false,
            timeStyles: {
                top: isTopHalf ? (rect.top + window.scrollY - calendarHeight - 3) : (rect.top + trigger.clientHeight + window.scrollY + 3),
                left: rect.left
            }
        });
    }

    hideCalendar() {
        this.setState({
            isCalendarVisible: false
        });
    };

    hideTime() {
        this.setState({
            isTimeVisible: false
        });
    };

    render() {
        const calendarInputClassName = classNames(`date-input date-picker-trigger-${this.state.id}`, {
            'is-open': this.state.isCalendarVisible
        });

        const timeInputClassName = classNames(`time-input date-picker-trigger-${this.state.id}`, {
            'is-open': this.state.isTimeVisible
        });
        return (
            <div className="c-datetime-picker">
                <input
                    ref={this.dateInputRef}
                    type="text"
                    className={calendarInputClassName}
                    readOnly={true}
                    value={DateUtilities.toString(this.state.selected)}
                    onClick={this.showCalendar}
                />

                <input
                    ref={this.timeInputRef}
                    type="text"
                    className={timeInputClassName}
                    readOnly={true}
                    value={DateUtilities.toTimeString(this.state.selected)}
                    onClick={this.showTime}/>

                <Calendar id={this.state.id}
                          visible={this.state.isCalendarVisible}
                          view={this.state.view}
                          selected={this.state.selected}
                          onSelect={this.onDateSelect}
                          minDate={this.state.minDate}
                          maxDate={this.state.maxDate}
                styles={this.state.calendarStyles}/>

                <Time id={this.state.id}
                      selected={this.state.selected}
                      visible={this.state.isTimeVisible}
                      styles={this.state.timeStyles}
                      onSelect={this.onTimeSelect}/>
            </div>
        )
    }

}
