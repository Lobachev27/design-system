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
    $(this).closest('.input-wrapper').find('.input-color').css("background-color", "transparent");

    if($(this).val() != "" || e.keyCode === 69) {
      $(this).closest('.input-box').addClass("not-empty");
      $(this).closest('.input-wrapper').find('.input-color').css("background-color", $(this).val());
    }
  });

  $(".input-wrapper .icon-delete").click(function() {
    $(this).closest('.input-box').find('.input').val('');
    $(this).closest('.input-box').removeClass("not-empty");
    $(this).closest('.input-wrapper').find('.input-color').css("background-color", "transparent");
  });
});