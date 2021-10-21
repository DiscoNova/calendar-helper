# calendar-helper

[![Build Status](https://app.travis-ci.com/DiscoNova/calendar-helper.svg?branch=master)](https://travis-ci.com/DiscoNova/calendar-helper) [![Coverage Status](https://coveralls.io/repos/github/DiscoNova/calendar-helper/badge.svg)](https://coveralls.io/github/DiscoNova/calendar-helper)

Selection of utility-/helper-functions that I too often seem to be reimplementing in various projects.

## Why this package exists?

Basically because I personally seem to be re-inventing the wheel over and over again every time I need to implement a calendar, a date-picker or something like that in whichever project happens to come my way. MIT-licensing allows others to use it, improve it and fork it as deemed necessary.

As said, though... this is mostly meant for my personal projects and - I happen to like the way it is set up.

## Why are dates internally handled in UTC?

Because I believe it is a great idea to have a date representation that isn't pinned to user's local timezone - so many projects these days are global and ... local datetimes just cause difficulties. For example, UTC doesn't have "daylight savings" or any other such local nonsense; it is just a reference time which is easy to use, generally takes a few bits less space when stored in database, and is quite easy to convert into any other date-/time-representation when necessary.

Internally, each date is represented as midnight UTC (even though the helper doesn't really consider the "time" aspect of a datetime).

## Why does the week start on Monday?

Because that's the way ISO8601 has defined a week since its inception in 1988. Weeks start on Monday and end on Sunday.

Granted, there are countries that traditionally print their calendars with weeks starting on Sundays, but those are a minority; most countries in the world do follow ISO8601 ... just makes it easier to apply consistent week numbering.
