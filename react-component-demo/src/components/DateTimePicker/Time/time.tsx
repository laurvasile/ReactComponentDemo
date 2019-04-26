import React, {RefObject} from 'react';
import DateUtilities from '../../../utilities/dateUtilities';
import './time.scss';

type TimeProps = {
    selected: Date;
    id: string;
    onSelect: Function;
    visible: boolean;
    styles?: {}
}

export default class Time extends React.PureComponent<TimeProps> {
    private closestDate: Date;
    private timeRef: RefObject<HTMLDivElement>;

    constructor(props: TimeProps) {
        super(props);
    }

    buildTimes(): Date[] {
        const start = new Date(this.props.selected.getFullYear(), this.props.selected.getMonth(), this.props.selected.getDate(), 0, 0, 0, 0);
        const times = [];
        const interval = 15;
        for (let i = 0; i < 60 / interval * 24; i++) {

            const time = DateUtilities.clone(start);
            times.push(time);


            start.setMinutes(start.getMinutes() + 15);
        }


        const today = this.props.selected.getTime();
        const closest = times.reduce((a, b) => {
            const diff = a.getTime() - today;
            return diff >= 0 && diff < b.getTime() - today ? a : b;
        });

        this.closestDate = new Date(closest);
        return times;

    }

    onSelect(time: Date) {
        this.props.onSelect(time);
    };

    getTimeItemClassNames(time: Date): string {
        let className = 'item';

        if (time.getTime() === this.closestDate.getTime()) {
            className += ' selected'
        }

        return className;
    }

    render() {
        const timeClass = `c-time-${this.props.id} c-time${this.props.visible ? ' time-show' : ' time-hide'}`;
        const times = this.buildTimes();
        return (
            <div ref={this.timeRef} className={timeClass} style={this.props.styles}>
                {
                    times.map((time, i) => {
                        return (
                            <div key={i}
                                 className={this.getTimeItemClassNames(time)}
                                 onClick={this.onSelect.bind(this, time)}>
                                {DateUtilities.toTimeString(time)}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
