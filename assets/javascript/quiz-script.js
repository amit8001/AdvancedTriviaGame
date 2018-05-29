var currentQuestion=0;
var score = 0;
var totalQuestions = questions.length;
var ans;
var q;
var correctAns;
var incorrectAns;

var container = $("#quiz");
var questionEl = $("#question");
var opt0 = $("#choice0");
var opt1 = $("#choice1");
var opt2 = $("#choice2");
var opt3 = $("#choice3");
var resCont = $("result");

function loadQuestion(questionIndex){
    q = questions[questionIndex];
    questionEl.text(q.question);
    //$("#question").text(q.question);
    opt0.text(q.option0);
    opt1.text(q.option1);
    opt2.text(q.option2);
    opt3.text(q.option3);
    ans = q.answer;
}

function correctstyleeffect(){
    console.log("Hello "+currentQuestion);
    $("#result").show();
    $("#result").text("Correct !!");
    $("#quiz").hide();
    console.log(correctAns);
    console.log(currentQuestion);
    console.log(totalQuestions);
    if(currentQuestion < totalQuestions){ 
        setTimeout(function(){
            $("#result").hide();  
            $("#quiz").show();   
            loadQuestion(currentQuestion);
            $("#y").text(totalQuestions);
            $("#x").text(currentQuestion+1);
        },5000);
    }
    else{
        setTimeout(function(){summary()},3000);
        
    }
}

function incorrectstyleeffect(){
    console.log("Hello "+currentQuestion);
    $("#result").show();
    $("#result").html("Nope! That was not correct !!<br>The correct answer was: "+ans);
    $("#quiz").hide();
    console.log(incorrectAns);
    if(currentQuestion < totalQuestions){ 
        setTimeout(function(){
            $("#result").hide();  
            $("#quiz").show();   
            loadQuestion(currentQuestion);
            $("#y").text(totalQuestions);
            $("#x").text(currentQuestion+1);
        },5000);
    }
    else{
        setTimeout(function(){summary()},3000);
    }
}
function summary(){
    $("#result").show();
    $("#result").html("Here is how you did!<br><br>Correct :"+correctAns+"<br>Incorrect: "+incorrectAns);
    $("#quiz").hide();
    $("#st_ovr").show();
    
    $("#st_ovr").html("Start Over?");
        $("#st_ovr").on("click", function() {
            currentQuestion=0;
            $("#quiz").show();
            start();
            $("#result").hide();
            $("#st_ovr").hide();
        })


}

function start(){
    loadQuestion(currentQuestion);
    $("#y").text(totalQuestions);
    $("#x").text(currentQuestion+1);
    correctAns =0;
    incorrectAns =0;
    $("#st_ovr").hide();
}

 //click the right button that you think is right
        //handle button on click

$(".btn").on("click", function() {
    console.log($(this).text());
    currentQuestion++;
 //   if(currentQuestion <= totalQuestions){
        if(ans == $(this).text()){
            console.log("COrrect");
            correctAns++;   
            correctstyleeffect();      
                    
        }
        else{
            console.log("InCOrrect");
            incorrectAns++;
            incorrectstyleeffect();   
        }
   // }
   // else
  //  {
   //     summary();
   // }    
    
});





