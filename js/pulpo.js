(function($) {

    var Pulpo = window.Pulpo = {};

    Pulpo.init = function() {

        var cmd = $("#command");
        cmd.change(function() {
           cmd.val('').focus();
        });
    }

})(jQuery);