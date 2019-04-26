import React from 'react';
import './weekHeader.scss';

type WeekHeaderProps = {
}

type WeekHeaderState = {
}
export default class WeekHeader extends React.Component<WeekHeaderProps, WeekHeaderState> {
    constructor(props: WeekHeaderProps) {
        super(props)
    }

    render() {
        return React.createElement("div", {className: "c-week-header"},
            React.createElement("span", null, "Sun"),
            React.createElement("span", null, "Mon"),
            React.createElement("span", null, "Tue"),
            React.createElement("span", null, "Wed"),
            React.createElement("span", null, "Thu"),
            React.createElement("span", null, "Fri"),
            React.createElement("span", null, "Sat")
        );
    }
}
