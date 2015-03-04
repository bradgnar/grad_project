//initialize anything else that I didnt want to clutter map stuff with
$(document).ready(function () {

    //http://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
    //#thanks bro
    $('.numbers-only').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('#depth-finder-info').popover({
        html: true,
        content: 'Use this to check the channel to see if there are any places where your boat cannot pass, this should be the <strong>minimum depth</strong> necessary for your boat to travel safely.'
    });


});