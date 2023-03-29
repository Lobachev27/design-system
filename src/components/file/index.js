$(document).ready(function() {

  $( ".input-wrapper .input:not([readonly='readonly'], [disabled])" ).closest('.input-box').click(function() {
    $(this).closest('.input-wrapper').addClass('is-focused');
    $(this).addClass('is-focused');
  });
  $( ".input-wrapper .input" ).closest('.input-box').blur(function() {
    $(this).closest('.input-wrapper').removeClass('is-focused');
    $(this).removeClass('is-focused');
  });

  (function() {

    // Browser supports HTML5 multiple file?
    var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
      isIE = /msie/i.test( navigator.userAgent );

    $.fn.customFile = function() {

      return this.each(function() {

        var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
          $wrap = $('<div class="file-upload-wrapper">'),
          $input = $('<div class="file-upload-input"></div>'),
          // Button that will be used in non-IE browsers
          $button = $('<div class="file-upload-button">Выберите файл</div>');
          // Hack for IE

        // Hide by shifting to the left so we
        // can still trigger events
        $file.css({
          position: 'absolute'
        });

        $wrap.insertAfter( $file )
          .append( $file, $input, ( isIE ? $label : $button ) );

        // Prevent focus
        $file.attr('tabIndex', -1);
        $button.attr('tabIndex', -1);

        $button.click(function () {
          $file.focus().click(); // Open dialog
        });

        $file.change(function() {

          var files = [], fileArr, filename, fileformat;

          // If multiple is supported then extract
          // all filenames from the file array
          /*if ( multipleSupport ) {
            fileArr = $file[0].files;
            for ( var i = 0, len = fileArr.length; i < len; i++ ) {
              files.push( fileArr[i].name );
            }
            filename = files.join(', ');

            // If not supported then just take the value
            // and remove the path to just show the filename
          } else {
            filename = $file.val().split('\\').pop();
          }*/

          filename = $file.val().split('\\').pop();
          fileformat = filename.split('.').pop();

          $input.text( filename ) // Set the value
            .attr('title', filename) // Show filename in title tootlip
            .attr('data-format', fileformat)
            .focus(); // Regain focus

          if (filename === "") {
            $wrap.removeClass('not-empty')
          } else {
            $wrap.addClass('not-empty');
            $(".input-wrapper .icon-delete").click(function() {
              $(this).closest('.input-box').find('.input').val('');
              $(this).closest('.input-box').find($wrap).removeClass("not-empty");
            });
          }

        });

        $input.on({
          blur: function() { $file.trigger('blur'); },
          keydown: function( e ) {
            if ( e.which === 13 ) { // Enter
              if ( !isIE ) { $file.trigger('click'); }
            } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
              // On some browsers the value is read-only
              // with this trick we remove the old input and add
              // a clean clone with all the original events attached
              $file.replaceWith( $file = $file.clone( true ) );
              $file.trigger('change');
              $input.val('');
            } else if ( e.which === 9 ){ // TAB
              return;
            } else { // All other keys
              return false;
            }
          }
        });

      });

    };

  }());

  $('input[type=file]').customFile();

});

$(document).mouseup(function(e){
  var el = $(".input-box");
  if (!el.is(e.target) && el.has(e.target).length === 0) {
    el.closest('.input-wrapper').removeClass('is-focused');
    el.removeClass('is-focused');
  };
});

document.addEventListener("DOMContentLoaded", function() {

  var progressBar = document.querySelectorAll(".file-loading-progress");
  var time = 1500;


  progressBar.forEach(function(i) {
    let line = i.children[0];
    let count = 0;
    let dataCount = line.getAttribute("data-count");
    let lineCount = line.children[0];

    let runTime = time/dataCount;

    let animationLineCount = setInterval(function(){
      if(count < dataCount){
        count++;
        lineCount.style.width = count + '%';

        if (dataCount <= 10) {lineCount.style.backgroundColor = "#3A82E2";}
        else if (dataCount > 10 && dataCount <= 20) {lineCount.style.backgroundColor = "#2481DE";}
        else if (dataCount > 20 && dataCount <= 30) {lineCount.style.backgroundColor = "#3496DE";}
        else if (dataCount > 30 && dataCount <= 40) {lineCount.style.backgroundColor = "#44ADDF";}
        else if (dataCount > 40 && dataCount <= 50) {lineCount.style.backgroundColor = "#53C3E0";}
        else if (dataCount > 50 && dataCount <= 60) {lineCount.style.backgroundColor = "#54CCD4";}
        else if (dataCount > 60 && dataCount <= 70) {lineCount.style.backgroundColor = "#46C9BC";}
        else if (dataCount > 70 && dataCount <= 80) {lineCount.style.backgroundColor = "#38C6A3";}
        else if (dataCount > 80 && dataCount <= 90) {lineCount.style.backgroundColor = "#2AC38B";}
        else if (dataCount > 90) {lineCount.style.backgroundColor = "#1CC073";}
      }
    },runTime);
  });
});