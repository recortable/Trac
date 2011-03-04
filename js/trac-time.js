(function() {

    var Trac = window.Trac;

    Trac.toDate = function(date) {
        return _.isDate(date) ? date : new Date(date);
    };


    Trac.date = function(date) {
        date = Trac.toDate(date);
        var day = "" + date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
    };

    Trac.time = function(date) {
        date = Trac.toDate(date);
        var hours = "" + date.getHours();
        var minutes = "" + date.getMinutes();

        if (minutes < 10)
            minutes = "0" + minutes;
        return hours + ":" + minutes;
    };

    Trac.duration = function(A) {
        var seconds = parseInt((A / 1000) % 60);
        var minutes = parseInt((A / (1000 * 60)) % 60);
        //var hours = (A / (1000 * 60 * 60)) % 24;
        return "" + minutes + ":" + (seconds  < 10 ? '0' + seconds : seconds);
    };


    Handlebars.registerHelper('time', Trac.time);
    Handlebars.registerHelper('date', Trac.date);
    Handlebars.registerHelper('time_duration', Trac.duration);
})();