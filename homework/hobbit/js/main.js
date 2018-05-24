var $readTip = $(".read-tip");
$("[name=haveRead]").change(function(){
   var val = $("[name=haveRead]:checked").val();
   if (val == "no") {
     $readTip.removeClass("hide");
   } else {
     $readTip.addClass("hide");
   }
});