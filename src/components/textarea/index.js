$(document).ready(function() {
    $( ".textarea-wrapper .textarea:not([readonly='readonly'])" ).focus(function() {
        $(this).closest('.textarea-wrapper').addClass('is-focused');
    });
    $( ".textarea-wrapper .textarea" ).blur(function() {
        $(this).closest('.textarea-wrapper').removeClass('is-focused');
    });

    $(".textarea-wrapper .textarea:not([readonly='readonly'])").on("keyup", function(e) {
        $(this).closest('.textarea-wrapper').removeClass("not-empty");

        if($(this).val() != "" || e.keyCode === 69) {
            $(this).closest('.textarea-wrapper').addClass("not-empty");
        }
    });

    $(".textarea-wrapper .icon-delete").click(function() {
        $(this).closest('.textarea-wrapper').find('.textarea').val('');
        $(this).closest('.textarea-wrapper').removeClass("not-empty");
    });
});