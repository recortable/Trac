// Trac - simple time tracking extension for google Chrome

// Load when the DOM is ready
$(function() {
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };

    // Trac namespace
    var Trac = window.Trac = function(command) {
        var exp = /(\w+)?@(\w+)?\s*(\w+)?/;
        if (exp.test(command)) {
            var now = new Date();
            _.each(Trac.activities.active(), function(activity) {
                console.log("Desactivate: ", activity);
                activity.save({active:false});
            });
            Trac.activities.create({category:RegExp.$1,project:RegExp.$2,task:RegExp.$3,begin: now, end:now, active:true, duration: 0});
            return true;
        }
        return false;
    };


    Trac.Activity = Backbone.Model.extend({});

    // Activity list
    Trac.ActivityList = Backbone.Collection.extend({
        model: Trac.Activity,
        localStorage: new Store("trac-activities"),
        active: function() {
            return this.filter(function(activity) {
                return activity.get('active');
            });
        },

        comparator: function(todo) {
            return todo.get('order');
        }
    });

    Trac.activities = new Trac.ActivityList;

    //var today = new Date();

    Trac.toDate = function(date) {
        return _.isDate(date) ? date : new Date(Date.parse(date));
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

    Trac.clear = function() {
        Trac.activities.localStorage.destroyAll();
    }

});