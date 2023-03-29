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

  var fileName = document.querySelectorAll(".file-drag-and-drop-item-name");
  fileName.forEach(function(i) {
    let textName = i.innerText;
    textName = textName.split('.')
    let shortText = textName[0].slice(0,15);
    if (shortText.length === 15) {
      textName = shortText + '...' + textName[1];
    } else {
      textName = shortText + '.' + textName[1];
    }
    i.innerText = textName;
  })
});