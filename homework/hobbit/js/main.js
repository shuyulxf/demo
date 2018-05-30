var $readTip = $(".read-tip"),
    $questionList = $(".question-list"),
    $quesTip = $(".question-list-rlt");

$("[name=haveRead]").change(function(){
   var val = $("[name=haveRead]:checked").val();
   if (val == "no") {
     $readTip.removeClass("hide");
     $questionList.addClass("hide");
     $quesTip.addClass("hide");
   } else {
     $readTip.addClass("hide");
     $questionList.removeClass("hide");
   }
});

var answerList = ["Bilbo", "wizard"],
    quesNum = answerList.length;
var rlts = [false, false],
    $questionListRlt = $(".question-list-rlt");
$questionList.find("input").change(function(){

  var $this = $(this);
  var $ques = $this.closest(".question-list");
  var idx = $questionList.index($ques);
  
  var v = $ques.find("input:checked").val();
  if (v == answerList[idx]) rlts[idx] = true;
  else rlts[idx] = false;

  if ($questionList.find("input:checked").length == quesNum) {
    var rlt = 0;
    for (var i = 0; i < quesNum; i++) {
      if (rlts[i]) rlt++;
    }

    var msg = "";
    
    switch(rlt) {
      
      case 0:
        msg = "Haha, badly, go to read the novel!";
        break;
      case 1:
        msg = "Haha, it is just ok";
        break;
      case 2:
        msg = "Good job!";
        break;
    }
    $quesTip.html(msg);
    $quesTip.removeClass("hide");
  }
})