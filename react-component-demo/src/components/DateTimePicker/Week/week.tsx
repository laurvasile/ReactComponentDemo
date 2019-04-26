import React from 'react';
import DateUtilities from '../../../utilities/dateUtilities';
import './week.scss';

type WeekProps = {
    month: number;
    selected: Date;
    onSelect: Function;
    minDate?: Date;
    maxDate?: Date;
    start: Date;
    key: number;
}

type WeekState = {}

export default class Week extends React.Component<WeekProps, WeekState> {
    constructor(props: WeekProps) {
        super(props);
    }

    buildDays(start: Date): Date[] {

        let days = [DateUtilities.clone(start)],
            clone = DateUtilities.clone(start);
        for (let i = 1; i <= 6; i++) {
            clone = DateUtilities.clone(clone);
            clone.setDate(clone.getDate() + 1);
            days.push(clone);
        }
        return days;
    };

    getDayClassName(day: any) {
        let className = 'day';
        if (DateUtilities.isSameDay(day, new Date()))
            className += ' today';
        if (this.props.month !== day.getMonth())
            className += ' other-month';
        if (this.props.selected && DateUtilities.isSameDay(day, this.props.selected))
            className += ' selected';
        if (this.isDisabled(day))
            className += ' disabled';
        return className;
    }


    onSelect(day: Date) {
        if (!this.isDisabled(day))
            this.props.onSelect(day);
    };

    isDisabled(day: Date) {
        const minDate = this.props.minDate,
            maxDate = this.props.maxDate;

        return (minDate && DateUtilities.isBefore(day, minDate)) || (maxDate && DateUtilities.isAfter(day, maxDate));
    };

    render() {
        const days = this.buildDays(this.props.start);
        return (
            <div className="c-week">
                {
                    days.map((day: Date, i: number) => {
                        return (
                            <div key={i} className={this.getDayClassName(day)}
                                 onClick={this.onSelect.bind(this, day)}>
                                {DateUtilities.toDayOfMonthString(day)}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
