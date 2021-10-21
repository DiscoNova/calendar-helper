'use strict';

/* Convenient for always getting a numeric base10 value of "anything" */
function decimalValue (digit) {
    return parseInt(digit >> 0, 10);
}

/* Zero-padding individual date/month values in string representation */
function dualDigit (digit) {
    if (!digit && digit !== 0) {
        return dualDigit(decimalValue(digit));
    }

    const numeric = decimalValue(digit);

    if (numeric < 0 || numeric > 99) {
        return '00';
    }

    return `${numeric < 10 ? '0' : ''}${numeric}`;
}

/* Returns a Date-object that corresponds to the midnight of given month's first day in UTC */
function theFirstDayOfYM (y, m) {
    return new Date(Date.UTC(y, m - 1, 1, 0, 0, 0, 0));
}

/* Returns an array of full weeks (starting on monday) representing */
function daysOfYM (y, m) {
    // Should invalid months (like -1, 0, 13, etc.) throw an error or something?
    // Native Date() -object peculiarly does its best to accommodate the input!?
    const
        dateHelper = theFirstDayOfYM(y, m),
        daysOfMonth = [];

    let noDatesBefore = (dateHelper.getDay() + 6) % 7;

    // Start by adding "no-date" = 0 in the beginning of month where necessary...
    while (noDatesBefore--) {
        daysOfMonth.push(0);
    }
    // ...then the individual dates of the month with their proper values...
    while (dateHelper.getUTCMonth() === m - 1) {
        daysOfMonth.push(dateHelper.getUTCDate());
        dateHelper.setUTCDate(dateHelper.getUTCDate() + 1);
    }
    // ...and finally add "no-date" at the end of the month's final week if needed.
    while (daysOfMonth.length % 7 > 0) {
        daysOfMonth.push(0);
    }

    return daysOfMonth;
}

function weeksOfYM (y, m) {
    const
        days = daysOfYM(y, m),
        weeks = [];

    while (days.length) {
        weeks.push(days.splice(0, 7));
    }

    return weeks;
}

module.exports = {
    // theFirstDayOfYM, // Unnecessary to test on its own?
    daysOfYM,
    decimalValue,
    dualDigit,
    weeksOfYM
};
