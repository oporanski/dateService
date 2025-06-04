# dateService
A date Service Library for vRO 

# Usage
    //Load Library
    var DateService = System.getModule("com.six.date").dateService();
    var dateService = new DateService();

    //Init data for tsts 
    var now = new Date();
    System.log("now: " + now);
    var yesterday = new Date( new Date().setDate(now.getDate()-1));
    System.log("yesterday: " + yesterday);
    var tomorrow = new Date( new Date().setDate(now.getDate()+1));
    System.log("tomorrow: " + tomorrow);

    System.log("########################################");
    System.log("####TESTS START####");

    //Today
    var today = dateService.today();
    System.log("Today: " + JSON.stringify(today));

    //INIT
    var dateServiceToday = new DateService(now);
    var dateServiceTomorrow = new DateService(tomorrow);
    var dateServiceYesterday = new DateService(yesterday);

    //Compare
    System.log("comp(now, yesterday): " + dateService.compare(now, yesterday));
    System.log("comp(now, tomorrow): " + dateService.compare(now, tomorrow));
    System.log("comp(now, now): " + dateService.compare(now, now));
    //Equals
    System.log("equals1(now, now) " + dateService.equals(now, now));
    System.log("equals(yesterday, tomorrow): " + dateService.equals(yesterday, tomorrow));
    //DaysInMonth
    System.log("daysInMonth(1,2019): " + dateService.getDaysInMonth(2019, 1));
    System.log("daysInMonth(2,2019): " + dateService.getDaysInMonth(2019, 2));
    System.log("daysInMonth(3,2019): " + dateService.getDaysInMonth(2019, 3));
    System.log("daysInMonth(1,2016): " + dateService.getDaysInMonth(2016, 1));
    //Between
    System.log("between(date, start, end)");
    System.log("between(today, yesterday, tomorrow): " + dateService.between(now, yesterday, tomorrow));
    System.log("between(yesterday, today, tomorrow): " + dateService.between(yesterday, now, tomorrow));
    //isBefore
    System.log("TEST date: " + dateServiceToday.date);
    System.log("isBefore Today.isBefore(tomorrow): " + dateServiceToday.isBefore(tomorrow)); //true
    System.log("isBefore Today.isBefore(yesterday): " + dateServiceToday.isBefore(yesterday)); //false
    System.log("isAfter Today.isAfter(tomorrow): " + dateServiceToday.isAfter(tomorrow)); //false
    System.log("isAfter Today.isAfter(yesterday): " + dateServiceToday.isAfter(yesterday)); //true

    System.log("dateServiceToday: " + dateServiceToday);
    System.log("addaddSeconds(120): " + dateServiceToday.addSeconds(120));
    System.log("addMinutes(2): " + dateServiceToday.addMinutes(2));
    System.log("addHours(1): " + dateServiceToday.addHours(1));
    //System.log("addMinutes(2): " + dateServiceToday.addMinutes(2));
    //System.log("addHours(2): " + dateServiceToday.addHours(2));
    System.log("addDays(2): " + dateServiceToday.addDays(2))
    System.log("addWeeks(1): " + dateServiceToday.addWeeks(1));
    System.log("addMonths(2): " + dateServiceToday.addMonths(2));
    System.log("addMonths(5): " + dateServiceToday.addMonths(5));
    System.log("addMonths(11): " + dateServiceToday.addMonths(11));
    System.log("addYears(2): " + dateServiceToday.addYears(2));

    System.log("--- SET TESTS ---");
    var dateServiceNew = new DateService();
    System.log("dateServiceNew: " + dateServiceNew);
    System.log("dateServiceNew.set({minute:10): " + dateServiceNew.set({minute:10}));
    System.log("dateServiceNew.set({hour:2}): " + dateServiceNew.set({hour:2}));
    System.log("dateServiceNew.set({day:20}): " + dateServiceNew.set({day:20}));
    System.log("dateServiceNew.set({month:1}): " + dateServiceNew.set({month:1}));
    System.log("dateServiceNew.set({minute:1, hour:1, day:1, month:1}): " + dateServiceNew.set({minute:1, hour:1, day:1, month:1}));
    System.log("dateServiceNew.set({month:0}): " + dateServiceNew.set({month:0}));
    System.log("dateServiceNew.set({month:1}): " + dateServiceNew.set({month:1}));
    System.log("dateServiceNew.set({month:2}): " + dateServiceNew.set({month:2}));
    System.log("dateServiceNew.set({month:3}): " + dateServiceNew.set({month:3}));
    System.log("dateServiceNew.set({year:1}): " + dateServiceNew.set({year:1}));
    dateServiceNew = new DateService();
    System.log("Reset date dateServiceNew: " + dateServiceNew);
    System.log("dateServiceNew.set({week:22}): " + dateServiceNew.set({week:22}));

    System.log("--- ADD TESTS ---");
    dateServiceNew = new DateService();
    System.log("add({days:1}): " + dateServiceNew.add({days:1}));
    System.log("add({days:1,months:1}): " + dateServiceNew.add({months:1}));
    System.log("add({days:1,months:1}): " + dateServiceNew.add({days:1,months:1}));
    System.log("add({weeks:2}): " + dateServiceNew.add({weeks:2}));
    System.log("add({years:-1}): " + dateServiceNew.add( { years: -1 } ));


    System.log("--- NEXT PATCH WINDOW CALCULATION  ---");
    dateServiceNew = new DateService();
    dateServiceNew.nextPatchWindow('First', 'Monday', '11:00')
    System.log("dateServiceNew.nextPatchWindow('First', 'Monday', '11:00'): " + dateServiceNew);

    dateServiceNew = new DateService();
    dateServiceNew.nextPatchWindow('Second', 'Wednesday', '23:00')
    System.log("dateServiceNew.nextPatchWindow('Second', 'Wednesday', '23:00'): " + dateServiceNew);

    dateServiceNew = new DateService();
    dateServiceNew.nextPatchWindow('Third', 'Sunday', '02:30');
    System.log("dateServiceNew.nextPatchWindow('Third', 'Sunday', '02:30'): " + dateServiceNew);
