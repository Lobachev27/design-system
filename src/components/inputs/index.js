$(document).ready(function() {
    $( ".input-wrapper .input:not([readonly='readonly'])" ).focus(function() {
        $(this).closest('.input-wrapper').addClass('is-focused');
        $(this).closest('.input-box').addClass('is-focused');
    });
    $( ".input-wrapper .input" ).blur(function() {
        $(this).closest('.input-wrapper').removeClass('is-focused');
        $(this).closest('.input-box').removeClass('is-focused');
    });

    $(".input-wrapper .input:not([readonly='readonly'])").on("keyup", function(e) {
        $(this).closest('.input-box').removeClass("not-empty");

        if($(this).val() != "" || e.keyCode === 69) {
            $(this).closest('.input-box').addClass("not-empty");
        }
    });

    $(".input-wrapper .icon-delete").click(function() {
        $(this).closest('.input-box').find('.input').val('');
        $(this).closest('.input-box').removeClass("not-empty");
    });

    $(".input-wrapper.input-password .icon-right").click(function () {
        if ($(this).closest(".input-wrapper").find(".input").attr('type') == 'password'){
            $(this).closest(".input-wrapper").addClass('show-password');
            $(this).closest(".input-wrapper").find(".input").attr('type', 'text');
        } else {
            $(this).closest(".input-wrapper").removeClass('show-password');
            $(this).closest(".input-wrapper").find(".input").attr('type', 'password');
        }
    });

    $(".input-wrapper.input-number .icon-right .icon-number-plus").click(function () {
        $(this).closest(".input-wrapper").find(".input").val(+$(this).closest(".input-wrapper").find(".input").val() + 1);
    });

    $(".input-wrapper.input-number .icon-right .icon-number-minus").click(function () {
        if ($(this).closest(".input-wrapper").find(".input").val() > 0) {
            $(this).closest(".input-wrapper").find(".input").val(+$(this).closest(".input-wrapper").find(".input").val() - 1);
        }
    });
});