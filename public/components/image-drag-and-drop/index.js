document.addEventListener("DOMContentLoaded",function(){var o=document.querySelectorAll(".image-loading-progress");o.forEach(function(o){o=o.children[0];let r=0,t=o.getAttribute("data-count"),e=o.children[0];o=1500/t;setInterval(function(){r<t&&(r++,e.style.width=r+"%",t<=10?e.style.backgroundColor="#3A82E2":10<t&&t<=20?e.style.backgroundColor="#2481DE":20<t&&t<=30?e.style.backgroundColor="#3496DE":30<t&&t<=40?e.style.backgroundColor="#44ADDF":40<t&&t<=50?e.style.backgroundColor="#53C3E0":50<t&&t<=60?e.style.backgroundColor="#54CCD4":60<t&&t<=70?e.style.backgroundColor="#46C9BC":70<t&&t<=80?e.style.backgroundColor="#38C6A3":80<t&&t<=90?e.style.backgroundColor="#2AC38B":90<t&&(e.style.backgroundColor="#1CC073"))},o)})});