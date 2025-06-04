# dateService
A date Service Library for vRO 

# Usage

    var logger = System.getModule("com.vmware.pscoe.library.logging").getLogger("com.six.date.dateTest");
    //Load Library
    var DateService = System.getModule("com.six.date").dateService();
    var dateService = new DateService();

    //Init data for tsts 
    var now = new Date();
    logger.info("now: " + now);
    var yesterday = new Date( new Date().setDate(now.getDate()-1));
    logger.info("yesterday: " + yesterday);
    var tomorrow = new Date( new Date().setDate(now.getDate()+1));
    logger.info("tomorrow: " + tomorrow);

    logger.info("########################################");
    logger.info("####TESTS START####");

    //Today
    var today = dateService.today();
    logger.info("Today: " + JSON.stringify(today));

    //INIT
    var dateServiceToday = new DateService(now);
    var dateServiceTomorrow = new DateService(tomorrow);
    var dateServiceYesterday = new DateService(yesterday);

    //Compare
    logger.info("comp(now, yesterday): " + dateService.compare(now, yesterday));
    logger.info("comp(now, tomorrow): " + dateService.compare(now, tomorrow));
    logger.info("comp(now, now): " + dateService.compare(now, now));
    //Equals
    logger.info("equals1(now, now) " + dateService.equals(now, now));
    logger.info("equals(yesterday, tomorrow): " + dateService.equals(yesterday, tomorrow));
    //DaysInMonth
    logger.info("daysInMonth(1,2019): " + dateService.getDaysInMonth(2019, 1));
    logger.info("daysInMonth(2,2019): " + dateService.getDaysInMonth(2019, 2));
    logger.info("daysInMonth(3,2019): " + dateService.getDaysInMonth(2019, 3));
    logger.info("daysInMonth(1,2016): " + dateService.getDaysInMonth(2016, 1));
    //Between
    logger.info("between(date, start, end)");
    logger.info("between(today, yesterday, tomorrow): " + dateService.between(now, yesterday, tomorrow));
    logger.info("between(yesterday, today, tomorrow): " + dateService.between(yesterday, now, tomorrow));
    //isBefore
    logger.info("TEST date: " + dateServiceToday.date);
    logger.info("isBefore Today.isBefore(tomorrow): " + dateServiceToday.isBefore(tomorrow)); //true
    logger.info("isBefore Today.isBefore(yesterday): " + dateServiceToday.isBefore(yesterday)); //false
    logger.info("isAfter Today.isAfter(tomorrow): " + dateServiceToday.isAfter(tomorrow)); //false
    logger.info("isAfter Today.isAfter(yesterday): " + dateServiceToday.isAfter(yesterday)); //true

    logger.info("dateServiceToday: " + dateServiceToday);
    logger.info("addaddSeconds(120): " + dateServiceToday.addSeconds(120));
    logger.info("addMinutes(2): " + dateServiceToday.addMinutes(2));
    logger.info("addHours(1): " + dateServiceToday.addHours(1));
    //logger.info("addMinutes(2): " + dateServiceToday.addMinutes(2));
    //logger.info("addHours(2): " + dateServiceToday.addHours(2));
    logger.info("addDays(2): " + dateServiceToday.addDays(2))
    logger.info("addWeeks(1): " + dateServiceToday.addWeeks(1));
    logger.info("addMonths(2): " + dateServiceToday.addMonths(2));
    logger.info("addMonths(5): " + dateServiceToday.addMonths(5));
    logger.info("addMonths(11): " + dateServiceToday.addMonths(11));
    logger.info("addYears(2): " + dateServiceToday.addYears(2));

    logger.info("--- SET TESTS ---");
    var dateServiceNew = new DateService();
    logger.info("dateServiceNew: " + dateServiceNew);
    logger.info("dateServiceNew.set({minute:10): " + dateServiceNew.set({minute:10}));
    logger.info("dateServiceNew.set({hour:2}): " + dateServiceNew.set({hour:2}));
    logger.info("dateServiceNew.set({day:20}): " + dateServiceNew.set({day:20}));
    logger.info("dateServiceNew.set({month:1}): " + dateServiceNew.set({month:1}));
    logger.info("dateServiceNew.set({minute:1, hour:1, day:1, month:1}): " + dateServiceNew.set({minute:1, hour:1, day:1, month:1}));
    logger.info("dateServiceNew.set({month:0}): " + dateServiceNew.set({month:0}));
    logger.info("dateServiceNew.set({month:1}): " + dateServiceNew.set({month:1}));
    logger.info("dateServiceNew.set({month:2}): " + dateServiceNew.set({month:2}));
    logger.info("dateServiceNew.set({month:3}): " + dateServiceNew.set({month:3}));
    logger.info("dateServiceNew.set({year:1}): " + dateServiceNew.set({year:1}));
    dateServiceNew = new DateService();
    logger.info("Reset date dateServiceNew: " + dateServiceNew);
    logger.info("dateServiceNew.set({week:22}): " + dateServiceNew.set({week:22}));

    logger.info("--- ADD TESTS ---");
    dateServiceNew = new DateService();
    logger.info("add({days:1}): " + dateServiceNew.add({days:1}));
    logger.info("add({days:1,months:1}): " + dateServiceNew.add({months:1}));
    logger.info("add({days:1,months:1}): " + dateServiceNew.add({days:1,months:1}));
    logger.info("add({weeks:2}): " + dateServiceNew.add({weeks:2}));
    logger.info("add({years:-1}): " + dateServiceNew.add( { years: -1 } ));


    logger.info("--- NEXT PATCH WINDOW CALCULATION  ---");
    dateServiceNew = new DateService();
    dateServiceNew.nextPatchWindow('First', 'Monday', '11:00')
    logger.info("dateServiceNew.nextPatchWindow('First', 'Monday', '11:00'): " + dateServiceNew);

    dateServiceNew = new DateService();
    dateServiceNew.nextPatchWindow('Second', 'Wednesday', '23:00')
    logger.info("dateServiceNew.nextPatchWindow('Second', 'Wednesday', '23:00'): " + dateServiceNew);

    dateServiceNew = new DateService();
    dateServiceNew.nextPatchWindow('Third', 'Sunday', '02:30');
    logger.info("dateServiceNew.nextPatchWindow('Third', 'Sunday', '02:30'): " + dateServiceNew);
