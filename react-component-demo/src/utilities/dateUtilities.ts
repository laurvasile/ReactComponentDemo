const DateUtilities = {
    clone(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    },

    pad(value: string, length: number) {
        while (value.length < length)
            value = '0' + value;
        return value;
    },

    toString(date: Date): string {
        if(!date) {
            return '';
        }
        return `${DateUtilities.pad(date.getDate().toString(), 2)}/${DateUtilities.pad((date.getMonth() + 1).toString(), 2)}/${date.getFullYear()}`;
    },

    toDayOfMonthString(date: Date): String {
        return DateUtilities.pad(date.getDate().toString(), 1);
    },

    toMonthAndYearString(date: Date) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    },

    moveToDayOfWeek(date: Date, dayOfWeek: number): Date {
        while (date.getDay() !== dayOfWeek)
            date.setDate(date.getDate() - 1);
        return date;
    },

    isSameDay(first: Date, second: Date): boolean {
        return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
    },

    isBefore(first: Date, second: Date): boolean {
        return first.getTime() < second.getTime();
    },

    isAfter(first: Date, second: Date): boolean {
        return first.getTime() > second.getTime();
    },

    toTimeString(date: Date): string {
        if(!date) {
            return '';
        }
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strMinute = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${strMinute} ${ampm}`;
    }
};

export default DateUtilities;
