'use strict';

const {
    decimalValue,
    dualDigit,
    theFirstDayOfYM,
    daysOfYM,
    weeksOfYM,
} = require('../src/index.js');

describe('Exported helpers', () => {
    describe('decimalValue()', () => {
        test('returns a decimal number', () => {
            expect(decimalValue()).toEqual(0);
            expect(decimalValue('')).toEqual(0);
            expect(decimalValue('0')).toEqual(0);
            expect(decimalValue('x')).toEqual(0);
            expect(decimalValue('+1')).toEqual(1);
            expect(decimalValue('-1')).toEqual(-1);
            expect(decimalValue(5)).toEqual(5);
            expect(decimalValue('5')).toEqual(5);
            expect(decimalValue('55')).toEqual(55);
            expect(decimalValue('555')).toEqual(555);
        });
    });

    describe('dualDigit()', () => {
        test('given no input, returns zero-padded string', () => {
            expect(dualDigit()).toEqual('00');
        });

        test('given single digit number, returns zero-padded string', () => {
            expect(dualDigit(0)).toEqual('00');
            expect(dualDigit(1)).toEqual('01');
            expect(dualDigit(2)).toEqual('02');
            expect(dualDigit(3)).toEqual('03');
            expect(dualDigit(4)).toEqual('04');
            expect(dualDigit(5)).toEqual('05');
            expect(dualDigit(6)).toEqual('06');
            expect(dualDigit(7)).toEqual('07');
            expect(dualDigit(8)).toEqual('08');
            expect(dualDigit(9)).toEqual('09');
        });

        test('given two digit number, returns non-padded string', () => {
            expect(dualDigit(10)).toEqual('10');
            expect(dualDigit(99)).toEqual('99');
        });

        test('given more than two digit number, returns last two digits', () => {
            expect(dualDigit(100)).toEqual('00');
            expect(dualDigit(1000)).toEqual('00');
            expect(dualDigit(10000)).toEqual('00');
        });
    });

    // describe('theFirstDayOfYM()', () => {}); /* Unnecessary to test this standalone */

    describe('daysOfYM()', () => {
        test('first month of year', () => {
            expect(daysOfYM(2021, 1)).toEqual([
                // Note: 1.1.2021 lands on week 53
                0, 0, 0, 0, 1, 2, 3,
                4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 24,
                25, 26, 27, 28, 29, 30, 31,
            ]);
        });

        test('last month of year', () => {
            expect(daysOfYM(2021, 12)).toEqual([
                0, 0, 1, 2, 3, 4, 5,
                6, 7, 8, 9, 10, 11, 12,
                13, 14, 15, 16, 17, 18, 19,
                20, 21, 22, 23, 24, 25, 26,
                27, 28, 29, 30, 31, 0, 0,
            ]);
        });

        test('non-leap-year february', () => {
            expect(daysOfYM(2021, 2)).toEqual([
                1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12, 13, 14,
                15, 16, 17, 18, 19, 20, 21,
                22, 23, 24, 25, 26, 27, 28,
            ]);
            expect(daysOfYM(1900, 2)).toEqual([
                0, 0, 0, 1, 2, 3, 4,
                5, 6, 7, 8, 9, 10, 11,
                12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 0, 0, 0, 0,
            ]);
        });

        test('leap-year february', () => {
            expect(daysOfYM(2020, 2)).toEqual([
                0, 0, 0, 0, 0, 1, 2,
                3, 4, 5, 6, 7, 8, 9,
                10, 11, 12, 13, 14, 15, 16,
                17, 18, 19, 20, 21, 22, 23,
                24, 25, 26, 27, 28, 29, 0,
            ]);
            expect(daysOfYM(2000, 2)).toEqual([
                0, 1, 2, 3, 4, 5, 6,
                7, 8, 9, 10, 11, 12, 13,
                14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27,
                28, 29, 0, 0, 0, 0, 0,
            ]);
        });

        test('UNIX Epoch (JAN1 1970)', () => {
            expect(daysOfYM(1970, 1)).toEqual([
                0, 0, 0, 1, 2, 3, 4,
                5, 6, 7, 8, 9, 10, 11,
                12, 13, 14, 15, 16, 17, 18,
                19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30, 31, 0,
            ]);
            expect(daysOfYM(1969, 12)).toEqual([
                1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12, 13, 14,
                15, 16, 17, 18, 19, 20, 21,
                22, 23, 24, 25, 26, 27, 28,
                29, 30, 31, 0, 0, 0, 0,
            ]);
        });

        test('UNIX Epoch 32bit overflow (JAN19 2038)', () => {
            expect(daysOfYM(2038, 1)).toEqual([
                0, 0, 0, 0, 1, 2, 3,
                4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 24,
                25, 26, 27, 28, 29, 30, 31,
            ]);
        });
    });

    describe('weeksOfYM()', () => {
        test('first month of year', () => {
            expect(weeksOfYM(2021, 1)).toEqual([
                [ 0, 0, 0, 0, 1, 2, 3, ],
                [ 4, 5, 6, 7, 8, 9, 10, ],
                [ 11, 12, 13, 14, 15, 16, 17, ],
                [ 18, 19, 20, 21, 22, 23, 24, ],
                [ 25, 26, 27, 28, 29, 30, 31, ],
            ]);
        });

        test('last month of year', () => {
            expect(weeksOfYM(2021, 12)).toEqual([
                [ 0, 0, 1, 2, 3, 4, 5, ],
                [ 6, 7, 8, 9, 10, 11, 12, ],
                [ 13, 14, 15, 16, 17, 18, 19, ],
                [ 20, 21, 22, 23, 24, 25, 26, ],
                [ 27, 28, 29, 30, 31, 0, 0, ],
            ]);
        });

        test('non-leap-year february', () => {
            expect(weeksOfYM(2021, 2)).toEqual([
                [ 1, 2, 3, 4, 5, 6, 7, ],
                [ 8, 9, 10, 11, 12, 13, 14, ],
                [ 15, 16, 17, 18, 19, 20, 21, ],
                [ 22, 23, 24, 25, 26, 27, 28, ],
            ]);
            expect(weeksOfYM(1900, 2)).toEqual([
                [ 0, 0, 0, 1, 2, 3, 4, ],
                [ 5, 6, 7, 8, 9, 10, 11, ],
                [ 12, 13, 14, 15, 16, 17, 18, ],
                [ 19, 20, 21, 22, 23, 24, 25, ],
                [ 26, 27, 28, 0, 0, 0, 0, ],
            ]);
        });

        test('leap-year february', () => {
            expect(weeksOfYM(2020, 2)).toEqual([
                [ 0, 0, 0, 0, 0, 1, 2, ],
                [ 3, 4, 5, 6, 7, 8, 9, ],
                [ 10, 11, 12, 13, 14, 15, 16, ],
                [ 17, 18, 19, 20, 21, 22, 23, ],
                [ 24, 25, 26, 27, 28, 29, 0, ],
            ]);
            expect(weeksOfYM(2000, 2)).toEqual([
                [ 0, 1, 2, 3, 4, 5, 6, ],
                [ 7, 8, 9, 10, 11, 12, 13, ],
                [ 14, 15, 16, 17, 18, 19, 20, ],
                [ 21, 22, 23, 24, 25, 26, 27, ],
                [ 28, 29, 0, 0, 0, 0, 0, ],
            ]);
        });

        test('UNIX Epoch (JAN1 1970)', () => {
            expect(weeksOfYM(1970, 1)).toEqual([
                [ 0, 0, 0, 1, 2, 3, 4, ],
                [ 5, 6, 7, 8, 9, 10, 11, ],
                [ 12, 13, 14, 15, 16, 17, 18, ],
                [ 19, 20, 21, 22, 23, 24, 25, ],
                [ 26, 27, 28, 29, 30, 31, 0, ],
            ]);
            expect(weeksOfYM(1969, 12)).toEqual([
                [ 1, 2, 3, 4, 5, 6, 7, ],
                [ 8, 9, 10, 11, 12, 13, 14, ],
                [ 15, 16, 17, 18, 19, 20, 21, ],
                [ 22, 23, 24, 25, 26, 27, 28, ],
                [ 29, 30, 31, 0, 0, 0, 0, ],
            ]);
        });

        test('UNIX Epoch 32bit overflow (JAN19 2038)', () => {
            expect(weeksOfYM(2038, 1)).toEqual([
                [ 0, 0, 0, 0, 1, 2, 3, ],
                [ 4, 5, 6, 7, 8, 9, 10, ],
                [ 11, 12, 13, 14, 15, 16, 17, ],
                [ 18, 19, 20, 21, 22, 23, 24, ],
                [ 25, 26, 27, 28, 29, 30, 31, ],
            ]);
        });
    });
});
