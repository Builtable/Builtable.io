(function () { 

  
$(".buttonform").click(function(){
 
  $("#coworkingForm").validate({
  debug: true
});
  if($('#coworkingForm').valid()){

    var emailString = "mailto:marketing@builtable.co?subject="+$("#coworkingForm #name").val()+" is interested in Coworking with Builtable&body=Mobile Number: " +$("#coworkingForm #mobileno").val() +"%0D%0AServices: "+$("#coworkingForm #serviceSelect").val() +"%0D%0ADuration of Stay: "+$("#coworkingForm #duration").val() +"%0D%0AOther Requests:%0D%0A" +$("#coworkingForm #others").val();

    $(".buttonform").attr("href",emailString);
  }
  else{
 $(".buttonform").attr("href","#coworking-form");
  }
})



 }());

