import React from 'react';
import {storiesOf} from '@storybook/react';
import DateTimePicker from "../src/components/DateTimePicker/dateTimePicker";

storiesOf('DateTimePicker', module)
    .add('default state', () => {
        return <DateTimePicker/>
    })
    .add('date focused', () => {
        return <DateTimePicker isCalendarVisible={true}/>
    })
    .add('time focused', () => {
        return <DateTimePicker isTimeVisible={true}/>
    })
    .add('filled', () => {
        return <DateTimePicker selected={new Date()}/>
    })
    .add('custom placeholder', () => {
        return <DateTimePicker placeholder='Custom...'/>
    });
