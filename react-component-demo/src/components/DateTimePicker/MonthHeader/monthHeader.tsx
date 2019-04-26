import React from 'react';
import DateUtilities from '../../../utilities/dateUtilities';
import './monthHeader.scss'
import classNames from 'classnames';

type MonthHeaderProps = {
    view: Date;
    onMove: Function;
}
type MonthHeaderState = {
    enabled: boolean;
    view: Date
}
export default class MonthHeader extends React.Component<MonthHeaderProps, MonthHeaderState> {
    constructor(props: MonthHeaderProps) {
        super(props);

        this.state = {
            view: DateUtilities.clone(this.props.view),
            enabled: true
        };

        this.moveBackward = this.moveBackward.bind(this);
        this.moveForward = this.moveForward.bind(this);
    }

    moveBackward() {
        const view = DateUtilities.clone(this.state.view);
        view.setMonth(view.getMonth() - 1);
        this.move(view, false);
    };

    moveForward() {
        const view = DateUtilities.clone(this.state.view);
        view.setMonth(view.getMonth() + 1);
        this.move(view, true);
    };

    move(view: Date, isForward: boolean) {
        if (!this.state.enabled)
            return;

        this.setState({
            view: view,
            enabled: false
        });

        this.props.onMove(view, isForward);
    };

    enable() {
        this.setState({enabled: true});
    };

    render() {
        const enabled = this.state.enabled;
        const iconClassName = classNames({'disabled': !enabled});
        return (
            <div className='c-month-header'>
                <i className={iconClassName}
                   onClick={this.moveBackward}>{String.fromCharCode(9664)}</i>
                <span>{DateUtilities.toMonthAndYearString(this.state.view)}</span>
                <i className={iconClassName}
                   onClick={this.moveForward}>{String.fromCharCode(9654)}</i>
            </div>
        );
    }
}
