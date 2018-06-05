//Defining global variables
var currentQuestion=0;
var score = 0;
var totalQuestions = questions.length;
var ans;
var q;
var correctAns;
var incorrectAns;
var timeleft;
var unanswered;
var downloadTimer;

//accessing elements via JQuery
var container = $("#quiz");
var questionEl = $("#question");
var opt0 = $("#choice0");
var opt1 = $("#choice1");
var opt2 = $("#choice2");
var opt3 = $("#choice3");
var resCont = $("result");

//Function definitions

//The below function loads the question object details for that index passed to it. 
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

//The below function defines the actions when the user has correctly answered the question.
//shownextq function is called after DOM manipulations.
function correctstyleeffect(){
    console.log("Hello "+currentQuestion);
    $("#result").show();
    $("#result").text("That is correct !!");
    $("#quiz").hide();
    console.log(correctAns);
    console.log(currentQuestion);
    console.log(totalQuestions);
    shownextq();
}

//The below function defines the actions when the user has incorrectly answered the question.
//shownextq function is called after DOM manipulations.
function incorrectstyleeffect(){
    console.log("Hello "+currentQuestion);
    $("#result").show();
    $("#result").html("Nope! That was not correct !!<br>The correct answer was: "+ans);
    $("#quiz").hide();
    console.log(incorrectAns);
    shownextq();
}

//The below function defines the summary after the user has gone through all questions 
//and provides a summary result score
//DOM changes to show and hide the relevant elements
//Once user presses the Start Over button the start function is invoked and the game is RESET
function summary(){
    $("#result").show();
    $("#result").html("Here is how you did!<br><br>Correct: "+correctAns+"<br>Incorrect: "+incorrectAns+"<br>Unanswered: "+unanswered);
    $("#quiz").hide();
    $("#st_ovr").show();
    $("#countdowntimer").hide();
    $("#cdt").hide();
    $("#start").hide();
    $("#progress").hide();
    $("#hline").hide();
    $("#st_ovr").html("Start Over?");
    $("#st_ovr").on("click", function() {
        currentQuestion=0;
        $("#quiz").show();
        $("#cdt").show();
        start();
        $("#result").hide();
        $("#st_ovr").hide();
        $("#countdowntimer").show()
        $("#hline").show();
    })
}

//The below function defines the START event (called EITHER after user clicks "Start" button after initial body load
//OR when the user clicks the "Start Over" button after playing one complete cycle) 
//with index set to 0 to show the first question
function start(){
    loadQuestion(currentQuestion);
    $("#y").text(totalQuestions);
    $("#x").text(currentQuestion+1);
    correctAns =0;
    incorrectAns =0;
    unanswered =0;
    clearInterval(downloadTimer);
    $("#st_ovr").hide();
    $("#progress").show();
    //need to show countdown timer. If time remaining is 0, show result page for that question
    timer();
    
}

//The below code handles the button click for the answers selected by the user.
//Invokes the Correct or Incorrect actions depeneding on the answer button clicked.
$(".btn").on("click", function() {
    console.log($(this).text());
    clearInterval(downloadTimer);
    currentQuestion++;
 
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
});

//The below function is invoked every time a new question loads. The user has 25 seconds to answer
//If user does not answer within 25 seconds (has a setInterval function defined which decrements a counter initially 
//set to 25, called every 1 second), it is indicated to the user that the time is up and the correct answer is shown. 
//If time left is 0, then show the next question after 5 seconds wait   
function timer(){
    var timeleft = 25;
    $("#countdowntimer").text(timeleft);
    downloadTimer = setInterval(function(){
    timeleft--;
    $("#countdowntimer").text(timeleft);
      if(timeleft == 0){
        clearInterval(downloadTimer);
        $("#result").show();
        $("#progress").show();
        $("#result").html("You are out of time !!<br>The correct answer was: "+ans);
        $("#quiz").hide();
        currentQuestion++;
        unanswered++;
            //call the next question and display it after 5 seconds
        shownextq();
      }
    },1000);
}

//The below function loads the next question (if there are still questions left to be invoked)
//after a 5 second wait (using setTimeout).
//If at the end and no more questions, then show the summary results after 3 seconds delay

function shownextq(){
    if(currentQuestion < totalQuestions){ 
        setTimeout(function(){
            $("#result").hide();  
            $("#quiz").show();   
            $("#progress").show();
            loadQuestion(currentQuestion);
            $("#y").text(totalQuestions);
            $("#x").text(currentQuestion+1);
            timer();
        },5000);
    }
    else{
        setTimeout(function(){summary()},3000);
    }
}

//The below function is invoked when the body loads for the very first time. 
//On click of the Start button invokes the start() function as well to start the game! 
function inistart(){
    $("#result").hide();
    $("#quiz").hide();
    $("#st_ovr").hide();
    $("#countdowntimer").hide();
    $("#cdt").hide();
    $("#start").show();
    $("#progress").hide();
    $("#hline").hide();
    $("#start").html("Start");
    $("#start").on("click", function() {
        currentQuestion=0;
        $("#quiz").show();
        $("#cdt").show();
        start();
        $("#result").hide();
        $("#start").hide();
        $("#st_ovr").hide();
        $("#countdowntimer").show()
        $("#hline").show();
    })
}