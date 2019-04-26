import React, {RefObject} from 'react';
import DateUtilities from '../../../utilities/dateUtilities';
import Week from '../Week/week';
import './weeks.scss'

type WeeksProps = {
    ref: RefObject<Weeks>;
    view: Date;
    selected: Date;
    onTransitionEnd: Function;
    onSelect: Function;
    minDate?: Date;
    maxDate?: Date;
}

type WeeksState = {
    view: Date;
    other: Date;
    sliding: string;
}
export default class Weeks extends React.Component<WeeksProps, WeeksState> {
    constructor(props: WeeksProps) {
        super(props);

        this.state = {
            view: DateUtilities.clone(this.props.view),
            other: DateUtilities.clone(this.props.view),
            sliding: null
        };

        this.current = React.createRef();
        this.other = React.createRef();

        this.renderWeeks = this.renderWeeks.bind(this);
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
    }

    public current: RefObject<any>;
    public other: RefObject<any>;


    componentDidMount() {
        this.current.current.addEventListener('transitionend', this.onTransitionEnd);
    };

    onTransitionEnd() {
        this.setState({
            sliding: null,
            view: DateUtilities.clone(this.state.other)
        });

        this.props.onTransitionEnd();
    };

    getWeekStartDates(view: Date): Date[] {
        view.setDate(1);
        view = DateUtilities.moveToDayOfWeek(DateUtilities.clone(view), 0);

        const current = DateUtilities.clone(view);
        current.setDate(current.getDate() + 7);

        const starts = [view],
            month = current.getMonth();

        while (current.getMonth() === month) {
            starts.push(DateUtilities.clone(current));
            current.setDate(current.getDate() + 7);
        }
        return starts;
    };

    moveTo(view: Date, isForward: boolean) {
        this.setState({
            sliding: isForward ? 'left' : 'right',
            other: DateUtilities.clone(view)
        });
    };

    renderWeeks(view: Date) {
        const starts = this.getWeekStartDates(view),
            month = starts[1].getMonth();

        return starts.map((s: Date, i: number) => {
            return (
                <Week month={month}
                      selected={this.props.selected}
                      onSelect={this.props.onSelect}
                      start={s}
                      key={i}
                      minDate={this.props.minDate}
                      maxDate={this.props.maxDate}/>
            )
        })
    }

    render() {
        const currentClass = `current${this.state.sliding ? (' sliding ' + this.state.sliding) : ''}`;
        const otherClass = `other${this.state.sliding ? (' sliding ' + this.state.sliding) : ''}`;
        return (
            <div className="c-weeks">
                <div ref={this.current} className={currentClass}>
                    {this.renderWeeks(this.state.view)}
                </div>
                <div ref={this.other} className={otherClass}>
                    {this.renderWeeks(this.state.other)}
                </div>
            </div>
        );
    }

}
