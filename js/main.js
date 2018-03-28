(function () { 

var currentURL = window.location.pathname;

   //add active class to url
   $("a[href*='"+currentURL.split("/")[1]+"']").addClass("active");
    
  
     }());

     
    
    