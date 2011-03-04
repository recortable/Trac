// Trac - simple time tracking extension for google Chrome

(function() {
    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };

    // Trac namespace
    var Trac = window.Trac = function(command) {
        var exp = /(\w+)?@(\w+)?\s*(\w+)?/;
        if (exp.test(command)) {
            Trac.stop();
            var now = new Date().getTime();
            var activity = Trac.activities.create({category:RegExp.$1,project:RegExp.$2,task:RegExp.$3,from: now, to:now, active:true, duration: 0});
            console.log("NEW ACTIVITY", activity);
            Trac.start();
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


    Trac.clear = function() {
        Trac.activities.localStorage.destroyAll();
        return true;
    };

    Trac.stop = function() {
        _.each(Trac.activities.active(), function(activity) {
            console.log("Desactivate: ", activity);
            activity.save({active:false});
        });
        return true;
    };


    Trac.start = function() {
        var active = Trac.activities.active();
        if (active.length > 0) {
            var now = new Date().getTime();
            _.each(active, function(activity) {
                var from = activity.get('from');
                var duration = now - from;
                activity.save({to:now, duration: duration});
            });
            setTimeout(Trac.start, 5 * 1000);
        }
    }
})();