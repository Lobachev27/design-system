$(document).ready(function() {
  $('.select-wrapper .select-selected').click(function(){
    if(!$(this).closest('.select-wrapper').hasClass('is-disabled') && !$(this).closest('.select-wrapper').hasClass('is-readonly')){
      if($(this).closest('.select-wrapper').hasClass('is-active')){
        $(this).closest('.select-wrapper').removeClass('is-active');
      } else {
        $('.select-wrapper').removeClass('is-active');
        $(this).closest('.select-wrapper').addClass('is-active');
      }
    };
  });

  $('.select-wrapper.select-simple .select-item').click(function(){
    let txt = $(this).text();
    $(this).addClass('is-active');
    $(this).siblings().removeClass('is-active');
    $(this).closest('.select-wrapper').removeClass('is-active');
    $(this).closest('.select-wrapper').addClass('not-empty');
    $(this).closest('.select-wrapper').find('.select-selected').children('span.select-text').text(txt);
  });

  $(".select-wrapper.select-simple .icon-delete").click(function() {
    $(this).closest('.select-wrapper').find('.select-selected .select-text').text('');
    $(this).closest('.select-wrapper').find('.select-item').removeClass('is-active');
    $(this).closest('.select-wrapper').removeClass("not-empty");
  });

  $(".select-wrapper.select-multi .icon-delete").click(function() {
    $(this).closest('.select-wrapper').find('.select-chips').children('.select-chips-item').remove();
    $(this).closest('.select-wrapper').removeClass("not-empty");
  });

  $(".select-wrapper.select-multi .icon-delete-item").click(function() {
    $(this).closest('.select-chips-item').remove();
  });
});

$(document).mouseup(function(e){
  var el = $(".select");
  if (!el.is(e.target) && el.has(e.target).length === 0) {
    el.closest('.select-wrapper').removeClass('is-active');
  };
});