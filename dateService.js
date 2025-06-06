/**
 * @return {string}
 */
(function () {
    /**
     * @namespace com.opo.date.dateService
     */
    var logger = System.getModule("com.vmware.pscoe.library.logging").getLogger("com.opo.date.DateService"); //Dependency
    var Class = System.getModule("com.vmware.pscoe.library.class").Class(); //Dependency

    /**
     * Build on code from Datejs library.
     * @class
     */
    var DateService = Class.define(
        /**
         * Initiates a new DateService.
         * @descriprion Class to provide helper functions for date calculations in js.
         * @constructs @DateService
         * @memberof com.opo.date.dateService
         * @param {*} [Date=now] Date or Date formated string
         */
        function DateService(_date){
            _date = typeof _date !== 'undefined' ? _date : new Date();
            this.date = _date;
            logger.debug("Init this.date: " + this.date);

            /** 
            * Gets a date that is set to the current date. The time is set to the start of the day (00:00 or 12:00 AM).
            * @returns {Date} The current date.
            */
            this.today = function () {
                this.date = clearTime(new Date());
                return this;
            };
            
            /**
            * check if date time value is today.  
            * @returns {boolean}  true = today, false = not today.
            */
            this.isToday = function () {        
                //today = clearTime(new Date());
                var dateToCheck = this.date;
                var todayDate = new Date();
                {
                    logger.debug("dateToCheck: " + dateToCheck);
                    logger.debug("todayDate: " + todayDate);
                }
                if(dateToCheck.setHours(0,0,0,0) == todayDate.setHours(0,0,0,0)) {
                    return true;
                }
                /*    
                var dateYear = dateToCheck.getFullYear();
                var dateMonth = dateToCheck.getMonth();
                var dateDay = dateToCheck.getDay();
                var todayYear = todayDate.getFullYear();
                var todayMonth = todayDate.getMonth();
                var todayDay = todayDate.getDay();        
                {
                    logger.info("dateYear: " + dateYear);
                    logger.info("dateMonth: " + dateMonth);
                    logger.info("dateDay: " + dateDay);
                    logger.info("todayYear: " + todayYear);
                    logger.info("todayMonth: " + todayMonth);
                    logger.info("todayDay: " + todayDay);
                }
                if (dateYear = todayYear && dateMonth == todayYear && dateDay == todayDay){
                    return true;
                }
                */
                return false;
            }

            /**
            * Compares the first date to the second date and returns an number indication of their relative values.  
            * @param {Date} date1 - First Date object to compare [Required].
            * @param {Date} date2 - Second Date object to compare to [Required].
            * @returns {Number}  -1 = date1 is lessthan date2. 0 = values are equal. 1 = date1 is greaterthan date2.
            */
            this.compare = function (date1, date2) {
                if (isNaN(date1) || isNaN(date2)) { 
                    throw new Error(date1 + " - " + date2); 
                } else if (date1 instanceof Date && date2 instanceof Date) {
                    return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
                } else { 
                    throw new TypeError(date1 + " - " + date2); 
                }
            };
                
            /**
            * Compares the first Date object to the second Date object and returns true if they are equal.  
            * @param {Date} date1 - First Date object to compare [Required]
            * @param {Date} date1 - Second Date object to compare to [Required]
            * @returns {Boolean} true if dates are equal. false if they are not equal.
            */
            this.equals = function (date1, date2) { 
                return (this.compare(date1,date2) === 0); 
            };
            
            /**
            * Gets the number of days in the month, given a year and month value. Automatically corrects for LeapYear.
            * @param {Number}   The year.
            * @param {Number}   The month (0-11).
            * @returns {Number}  The number of days in the month.
            */
            this.getDaysInMonth = function (year, month) {
                return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
            };
            
            /**
            * Determines if this instance is between a range of two dates or equal to either the start or end dates.
            * @param {Date}     date to compare [Required]
            * @param {Date}     Start of range [Required]
            * @param {Date}     End of range [Required]
            * @returns {Boolean} true is this is between or equal to the start and end dates, else false
            */
            this.between = function (date, start, end) {
                return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
            };
            
            /**
            * Determines if this date occurs after the date to compare to.
            * @param {Date}     Date object to compare. If no date to compare, new Date() ("now") is used.
            * @returns {Boolean} true if this date instance is greater than the date to compare to (or "now"), otherwise false.
            */
            this.isAfter = function (date) {
                return (this.compareTo(date || new Date()) === 1);
            };
            
            /**
            * Determines if this date occurs before the date to compare to.
            * @param {Date}     Date object to compare. If no date to compare, new Date() ("now") is used.
            * @returns {Boolean} true if this date instance is less than the date to compare to (or "now").
            */
            this.isBefore = function (date) {
                return (this.compareTo(date || new Date()) === -1);
            };
            
            /**
            * Compares this instance to a Date object and returns an number indication of their relative values.  
            * @param {Date}     Date object to compare [Required]
            * @returns {Number}  -1 = this is lessthan date. 0 = values are equal. 1 = this is greaterthan date.
            */
            this.compareTo = function (date) {
                return this.compare(this.date, date);
            };

            /**
            **** HELPERS ****
            * Internal library functions 
            */

            /**
             * Returns a new Date object that is an exact date and time copy of the original instance.
             * @param {date}   date to clone  [Required]
             * @returns {Date}    A new Date instance
             */
            function clone(date) {
                return new Date(date.getTime()); 
            };

            /**
             * Adds the specified number of milliseconds to this instance. 
             * @param {Number}   The number of milliseconds to add. The number can be positive or negative [Required]
             * @returns {Date}    this
             */
            this.addMilliseconds = function addMilliseconds(value) {
                this.date = new Date(Date.parse(this.date) + value * 1);
                return this;
            };

            /**
             * Adds the specified number of seconds to this instance. 
             * @param {Number}   The number of seconds to add. The number can be positive or negative [Required]
             * @returns {Date}    this
             */
            this.addSeconds = function addSeconds(value) { 
                return this.addMilliseconds(value * 1000); 
            };

            /**
             * Adds the specified number of seconds to this instance. 
             * @param {Number}   The number of seconds to add. The number can be positive or negative [Required]
             * @returns {Date}    this
             */
            this.addMinutes = function addMinutes(value) {
                return this.addMilliseconds(value * 60000); /* 60*1000 */
            };

            /**
             * Adds the specified number of hours to this instance. 
             * @param {Number}   The number of hours to add. The number can be positive or negative [Required]
             * @returns {Date}    this
             */
            this.addHours = function addHours(value) { 
                return this.addMilliseconds(value * 3600000); /* 60*60*1000 */
            };

            /**
             * Adds the specified number of days to this instance. 
             * @param {Number}   The number of days to add. The number can be positive or negative [Required]
             * @returns {Date}    this
             */
            this.addDays = function (value) {
                this.date.setDate(this.date.getDate() + value * 1);
                return this;
            };

            /**
             * Adds the specified number of weeks to this instance. 
             * @param {Number}   The number of weeks to add. The number can be positive or negative [Required]
             * @returns {Date}    this
             */
            this.addWeeks = function addWeeks(value) { 
                this.addDays(value * 7);
                return this;
            };

            /**
             * Adds the specified number of months to this instance. 
             * @param {Number}   The number of months to add. The number can be positive or negative [Required]
             * @returns {Date}    this
             */
            this.addMonths = function addMonths(value) {
                var n = this.date.getDate();
                this.date.setDate(1);
                this.date.setMonth(this.date.getMonth() + value * 1);
                this.date.setDate(Math.min(n, this.getDaysInMonth(this.date.getFullYear(), this.date.getMonth())));
                return this;
            };

            /**
             * Adds the specified number of years to this instance. 
             * @param {Number}   The number of years to add. The number can be positive or negative [Required]
             * @returns {Date}    this
             */
            this.addYears = function addYears(value) {
                return this.addMonths(value * 12);
            };

            /**
             * Adds (or subtracts) to the value of the years, months, weeks, days, hours, minutes, seconds, milliseconds of the date instance using given configuration object. Positive and Negative values allowed.
             * Example
            <pre><code>
            Date.today().add( { days: 1, months: 1 } )
            
            new Date().add( { years: -1 } )
            </code></pre> 
            * @param {Object}   Configuration object containing attributes (months, days, etc.)
            * @returns {Date}    this
            */
            this.add = function (config) {
                if (typeof config == "number") {
                    this._orient = config;
                    return this;    
                }
                
                var x = config;
                
                if (x.milliseconds) { 
                    this.addMilliseconds(x.milliseconds); 
                }
                if (x.seconds) { 
                    this.addSeconds(x.seconds); 
                }
                if (x.minutes) { 
                    this.addMinutes(x.minutes); 
                }
                if (x.hours) { 
                    this.addHours(x.hours); 
                }
                if (x.weeks) { 
                    this.addWeeks(x.weeks); 
                }    
                if (x.months) { 
                    this.addMonths(x.months); 
                }
                if (x.years) { 
                    this.addYears(x.years); 
                }
                if (x.days) {
                    this.addDays(x.days); 
                }
                return this;
            };
        

            //var y, m, d;
        /**
             * Get the week number. Week one (1) is the week which contains the first Thursday of the year. Monday is considered the first day of the week.
             * This algorithm is a JavaScript port of the work presented by Claus Tøndering at http://www.tondering.dk/claus/cal/node8.html#SECTION00880000000000000000
             * .getWeek() Algorithm Copyright (c) 2008 Claus Tondering.
             * The .getWeek() function does NOT convert the date to UTC. The local datetime is used. Please use .getISOWeek() to get the week of the UTC converted date.
             * @returns {Number}  1 to 53
             */
            this.getWeek = function () {
                var a, b, c, d, e, f, g, n, s, w, y, m;
                
        /*        y = (!y) ? this.date.getFullYear() : y;
                m = (!m) ? this.date.getMonth() + 1 : m;
                d = (!d) ? this.date.getDate() : d;
        */
                y = this.date.getFullYear();
                m = this.date.getMonth() + 1;
                d = this.date.getDate();

                if (m <= 2) {
                    a = y - 1;
                    b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
                    c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
                    s = b - c;
                    e = 0;
                    f = d - 1 + (31 * (m - 1));
                } else {
                    a = y;
                    b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
                    c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
                    s = b - c;
                    e = s + 1;
                    f = d + ((153 * (m - 3) + 2) / 5) + 58 + s;
                }
                
                g = (a + b) % 7;
                d = (f + g - e) % 7;
                n = (f + 3 - d) | 0;

                if (n < 0) {
                    w = 53 - ((g - s) / 5 | 0);
                } else if (n > 364 + s) {
                    w = 1;
                } else {
                    w = (n / 7 | 0) + 1;
                }
                
                y = m = d = null;
                
                return w;
            };
            
        // private
            var validate = function (n, min, max, name) {
                if (typeof n == "undefined") {
                    return false;
                } else if (typeof n != "number") {
                    throw new TypeError(n + " is not a Number."); 
                } else if (n < min || n > max) {
                    throw new RangeError(n + " is not a valid value for " + name + "."); 
                }
                return true;
            };

            /**
             * Validates the number is within an acceptable range for milliseconds [0-999].
             * @param {Number}   The number to check if within range.
             * @returns {Boolean} true if within range, otherwise false.
             */
            this.validateMillisecond = function validateMillisecond(value) {
                return validate(value, 0, 999, "millisecond");
            };

            /**
             * Validates the number is within an acceptable range for seconds [0-59].
             * @param {Number}   The number to check if within range.
             * @returns {Boolean} true if within range, otherwise false.
             */
            this.validateSecond = function validateSecond(value) {
                return validate(value, 0, 59, "second");
            };

            /**
             * Validates the number is within an acceptable range for minutes [0-59].
             * @param {Number}   The number to check if within range.
             * @returns {Boolean} true if within range, otherwise false.
             */
            this.validateMinute = function validateMinute(value) {
                return validate(value, 0, 59, "minute");
            };

            /**
             * Validates the number is within an acceptable range for hours [0-23].
             * @param {Number}   The number to check if within range.
             * @returns {Boolean} true if within range, otherwise false.
             */
            this.validateHour = function validateHour(value) {
                return validate(value, 0, 23, "hour");
            };

            /**
             * Validates the number is within an acceptable range for the days in a month [0-MaxDaysInMonth].
             * @param {Number}   The number to check if within range.
             * @returns {Boolean} true if within range, otherwise false.
             */
            this.validateDay = function validateDay(value, year, month) {
                return validate(value, 1, this.getDaysInMonth(year, month), "day");
            };

            /**
             * Validates the number is within an acceptable range for months [0-11].
             * @param {Number}   The number to check if within range.
             * @returns {Boolean} true if within range, otherwise false.
             */
            this.validateMonth = function validateMonth(value) {
                return validate(value, 0, 11, "month");
            };

            /**
             * Validates the number is within an acceptable range for years.
             * @param {Number}   The number to check if within range.
             * @returns {Boolean} true if within range, otherwise false.
             */
            this.validateYear = function validateYear(value) {
                return validate(value, 0, 9999, "year");
            };
                                                        
            /**
             * Set the value of year, month, day, hour, minute, second, millisecond of date instance using given configuration object.
             * Example
            <pre><code>
            Date.today().set( { day: 20, month: 1 } )

            new Date().set( { millisecond: 0 } )
            </code></pre>
            * 
            * @param {Object}   Configuration object containing attributes (month, day, etc.)
            * @returns {Date}    this
            */
            this.set = function set(config) {
                if (this.validateMillisecond(config.millisecond)) {
                    this.addMilliseconds(config.millisecond - this.date.getMilliseconds()); 
                }
        
                if (this.validateSecond(config.second)) {
                    this.addSeconds(config.second - this.date.getSeconds()); 
                }
                
                if (this.validateMinute(config.minute)) {
                    this.addMinutes(config.minute - this.date.getMinutes()); 
                }
                
                if (this.validateHour(config.hour)) {
                    this.addHours(config.hour - this.date.getHours()); 
                }
                
                if (this.validateMonth(config.month)) {
                    this.addMonths(config.month - this.date.getMonth()); 
                }

                if (this.validateYear(config.year)) {
                    this.addYears(config.year - this.date.getFullYear()); 
                }
                
                /* day has to go last because you can't validate the day without first knowing the month */
                if (this.validateDay(config.day, this.date.getFullYear(), this.date.getMonth())) {
                    this.addDays(config.day - this.date.getDate()); 
                }
                
                if (config.week && validate(config.week, 0, 53, "week")) {
                    this.setWeek(config.week);
                }
                
                return this;   
            };

            /**
             * Moves the date to Monday of the week set. Week one (1) is the week which contains the first Thursday of the year.
             * @param {Number}   A Number (1 to 53) that represents the week of the year.
             * @returns {Date}    this
             */    
            this.setWeek = function (n) {
                this.addWeeks(n - this.getWeek());
                this.moveToDayOfWeek(1);
            return this; 
            };

            /**
             * Moves the date to the last day of the month.
             * @returns {Date}    this
             */
            this.moveToLastDayOfMonth = function (date) { 
                return this.set({ day: this.getDaysInMonth(this.getFullYear(), this.getMonth())});
            };

            /**
             * Moves the date to the first day of the month.
             * @returns {Date}    this
             */
            this.moveToFirstDayOfMonth = function () {
                return this.set({ day: 1 });
            };

            /**
             * Moves the date to the next n'th occurrence of the dayOfWeek starting from the beginning of the month. The number (-1) is a magic number and will return the last occurrence of the dayOfWeek in the month.
             * @param {Number}   The dayOfWeek to move to
             * @param {Number}   The n'th occurrence to move to. Use (-1) to return the last occurrence in the month
             * @returns {Date}    this
             */
            this.moveToNthOccurrence = function (dayOfWeek, occurrence) {
                var shift = 0;
                if (occurrence > 0) {
                    shift = occurrence - 1;
                }
                else if (occurrence === -1) {
                    var date = moveToLastDayOfMonth(date);
                    if (this.date.getDay() !== dayOfWeek) {
                        this.date.moveToDayOfWeek(dayOfWeek, -1);
                    }
                    return this;
                }
                
                return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek, +1).addWeeks(shift);
            };

            /**
             * Move to the next or last dayOfWeek based on the orient value.
             * @param {Number}   The dayOfWeek to move to
             * @param {Number}   Forward (+1) or Back (-1). Defaults to +1. [Optional]
             * @returns {Date}    this
             */
            this.moveToDayOfWeek = function (dayOfWeek, orient) {
                var diff = (dayOfWeek - this.date.getDay() + 7 * (orient || +1)) % 7;
                return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
            };


            /**
            * Determines if the current date instance is within a LeapYear.
            * @param {Number}   The year.
            * @returns {Boolean} true if date is within a LeapYear, otherwise false.
            */
            this.isLeapYear = function (year) { 
                return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0); 
            };
            
            /**
            * PRIVE
            * Resets the time of this Date object to 12:00 AM (00:00), which is the start of the day.
            * @param {Boolean}  .clone() this date instance before clearing Time
            * @returns {Date}    this
            */
            function clearTime (date) {
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                //logger.info(date);
                return date;
            };
            
            /**
            * Resets the time of this Date object to 12:00 AM (00:00), which is the start of the day.
            * @param {Boolean}  .clone() this date instance before clearing Time
            * @returns {Date}    this
            */
            this.setHour = function (hour, minute) {
                this.date.setHours(hour);
                this.date.setMinutes(minute);
                this.date.setSeconds(0);
                this.date.setMilliseconds(0);
                logger.debug("setHour: " + this.date);
                return this;
            };
            
            /**
            * Resets the full date of this Date object.
            * @returns {Date}    this
            */
            this.toString = function() {
                return this.date.toISOString();
            };

            /**
            * Resets timestamp.
            * @returns {Date}    this
            */
            this.getTime = function() {
                return this.date.getTime();
            };
        }
    );

    return DateService;
});
