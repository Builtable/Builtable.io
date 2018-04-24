(function () { 

var currentURL = window.location.pathname;

   //add active class to url
   $("a[href*='"+currentURL.split("/")[1]+"']").addClass("active");
    
   if($("a[href*='"+currentURL.split("/")[1]+"']")==="comaking" || currentURL.split("/")[1] ==="workshops"){
    $("a[href*='/comaking']").addClass("active");
   }
  
     }());

     
    
    