var questions = ["Can \"<input type='submit' />\" represents a button? Use yes or no to answer.",
        "What function can we use to delete element from array and also insert elements into array?",
        "How can we create a random number between 0-9?",
        "What function can we use to bind an event to document elements in chrome browser? Just list function name.",
        "What html tag can we use to insert an image into web page? Just list tag name.",
        "What html tag can we use to create an hyperlink? Just list tag name.",
        "Does html tag must have a closing tag like XML? Use yes or no to answer.",
        "What html tag can we use to create a form? Just list tag name.",
        "Is javascript a weak-typed language? Use yes or no to answer.",
        "What is the result for 2&&3?"
    ], 
    answers = ["yes", "splice", "Math.floor(Math.random()*10)", "addEventListener", "img", "a", "yes", "form", "yes", '3'],
    len = questions.length,
    msgs = ["You didn't even try", "Go back and keep learning", "Good effort-you are almost there", "Perfect"],
    score = 0,
    results = [],
    rltImgs = ["./img/correct.png", "./img/wrong.png"];

var totalIndexes = [];
for (var i = 0; i < len; i++) {
    totalIndexes.push(i);
}

var l = len;
var $ques = document.getElementsByClassName("ques")[0],
    $main = document.getElementsByClassName("main")[0],
    $scoreSpan = document.getElementsByClassName("score-span")[0];
for (var i = 0; i < l; i++) {
    (function(idx){
        var q = questions[idx];

        var $cur = $ques.cloneNode(true);  
        $cur.className = $cur.className.replace(" hide", "");
        $cur.getElementsByClassName("num")[0].innerText = idx + 1;
        $cur.getElementsByClassName("ques-detail")[0].innerText = q;

        var $img = document.createElement("img");
        $img.className = "rlt-img";
        var rlt = prompt(q);
        results.push(rlt);

        $cur.getElementsByClassName("answer")[0].innerText = rlt;
        if (rlt == answers[idx]) {
            $img.src = rltImgs[0];
            score++;
        } else {
            $img.src = rltImgs[1];
        }
        $cur.appendChild($img);
        $main.insertBefore($cur, $scoreSpan);
    })(i);
}

function showFinalScore() {

    var $score = document.getElementsByClassName("score")[0],
        $tip = document.getElementsByClassName("tip")[0];

    $score.innerHTML = score;
    switch(score) {
        case 0: 
            $tip.innerHTML = msgs[0];
            break;
        case 1: case 2: case 3: case 4:
            $tip.innerHTML = msgs[1];
            break;
        case 5: case 6: case 7: case 8: case 9:
            $tip.innerHTML = msgs[2];
            break;
        case 10:
            $tip.innerHTML = msgs[3];
            break;
    }
}
showFinalScore();