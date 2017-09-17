$(document).ready(function(){
    if ($(window).width() < 768) {
       $( "#dialogScreenSize" ).dialog();
    }

    if ($(window).width() >= 768 && ($(window).width() < 769)){
       $( "#dialogOrientate" ).dialog();
    }
 });

