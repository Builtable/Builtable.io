(function () { 

  

$( "#learnForm" ).on("submit",function( el ) {
   //writeJson(objectifyForm($( this ).serializeArray()));
 //writeJson($(this).serialize());
});

$(".buttonform").click(function(){
 
  $("#learnForm").validate({
  debug: true
});
  if($('#learnForm').valid()){

    var emailString = "mailto:marketing@builtable.co?subject="+$("#learnForm #name").val()+" is interested in teaching with Builtable&body=Email: "+$("#learnForm #email").val() +"%0D%0AMobile Number: " +$("#learnForm #mobileno").val() +"%0D%0AWhat would you like to teach: "+$("#learnForm #teach").val() +"%0D%0AWhy should we get you?%0D%0A"+$("#learnForm #why").val() +"%0D%0ALinks to your sample work:%0D%0A" +$("#learnForm #sample").val();

    $(".buttonform").attr("href",emailString);
  }
  else{
 $(".buttonform").attr("href","#learn-form");
  }
})



function writeJson(pushData){

var finalData = {
    "formType":1,
    "formValues":JSON.stringify(pushData)
}



// $.ajax
//     ({
//         type: "post",
//         //contentType: "application/json", 
//         dataType : 'json',
//         async: false,
//         url: "http://localhost:56570/api/form/submitForm",//window.location.protocol + "//" + window.location.host +':21963/api/form',
//         data: finalData,
//         success: function () {alert("Thanks for your feedback!"); },
//         failure: function() {alert("Something went wrong! Please talk to your nearest Builtable attendant.");}
//     });


 }

function objectifyForm(formArray) {//serialize data function

  var returnArray = {};
  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
}
 }());

