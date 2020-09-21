
// ------- Dom Elements by type -----------
// ------------- buttons ------------------
const startButton = $("#start-button")
const stopButton = $("#stop-button")
const nextButton = $("#next-button")
nextButton.hide()
//------------- master clock ------------
const minutes = $("#master-clock-minutes")
const seconds = $("#master-clock-seconds")
var totalSeconds = 60;
var secondsElapsed = 0;
var quizInterval; 

// ----------- start delay clock --------
var secondsLeft = 5;
var timeInterval;

// ----------- main window --------
const mainBox = $("#variable-box")
const quizMessage = $("#quiz-message")

// ---------- Question ------------
const questionBox = $("#question-box")
const choiceList = $("#choice-list")

// ---------- running tallies -------
const qRemain = $("#questions-remaining")
const qCorrect = $("#questions-correct")
const altFacts = $("#alternative-facts")

// -------------- score array ------------
var recordScores = {
    name:[],
    score:[]
};
var currentQuestion = 0;

var correctAnswers = 0;

var alternateFacts = 0;

var quizOver = false;

var questionArr = [
    {
        "question": "Who is Cloud?",
        "answers": ["Main character", "Main bad guy", "Supporting character", "Evaporated water"],
        "correctAnswer": "0"
    }, 
     {
        "question": "What is Materia used for?",
        "answers": ["Materia gives you special abilities", "Materia makes characters explode", "Materia are in game currency", "Materia is useless"],
        "correctAnswer": "0"
    }, 
    {
        "question": "Who is Sephiroth",
        "answers": ["Cloud's brother", "A shopkeeper from the first act", "The main bad guy", "The creator of the game"],
        "correctAnswer":"2"
    }, 
    {
        "question": "in the original release of the game on the PlayStation, how many disks did the came use? ",
        "answers": ["1", "2", "3", "4"],
        "correctAnswer": "2"
    }
];

// GIVEN I am taking a code quiz
// WHEN I click the start button ,THEN a timer starts and I am presented with a question


// ------------ start button -------------
$(startButton).on("click", function(){
    // 5 second count down w text in question
    startDelayClock();
    console.log("button working?:" , startButton)
    // makes it so it cant be pressed again
    startButton.hide()
  
});

// ------ start button triggers delay start count down and start quiz----------
function startDelayClock(){
   
    var timerInterval = setInterval(function() {
    
        questionBox.text("Begin quiz in "  + secondsLeft);
        secondsLeft--;
        console.log("does startDelayClock work:" , secondsLeft)
        if(secondsLeft === 0 ) {
            clearInterval(timerInterval);
            questionBox.empty()
            
            startMasterClock();
            startQuiz()
        }
        
            
    }, 1000);
};
 
// after that timer counts down from five - the main clock begins
            //build a main clock
// ------------ delay start countdown triggers the master clock, and the quiz ------- 
function startMasterClock(){
   
    var quizInterval = setInterval(function() {
    
        seconds.text(totalSeconds); 
        totalSeconds--;
        console.log("does master clock work:" , totalSeconds)
        
        if(totalSeconds === 0 || (currentQuestion === questionArr.length)) {
            clearInterval(quizInterval);
            
        }
    }, 1000);
};

// make a for loop to cycle through the array and pull out the information we need, and display them:
// this function runs along side the clock, and is the start of the quiz
function startQuiz() {

    // --- remember dom references --> 
    //const questionBox = $("#question-box")
    //const choiceList = $("#choice-list")
    
    //pulls question from array - the current question to displayed
    var question = questionArr[currentQuestion].question;
    // Set the questionBox text to the current question
    $(questionBox).text(question);
    
    // Remove all current <li> elements (if any) - because we are making some below, and we need to refresh
    $(choiceList).find("li").remove();

// pull the answers out of the answers index 
    
    //gives the length of the answers array within questionArr
    var answersIndex = questionArr[currentQuestion].answers.length;
    // these are the answers the user can select - generated with the for loop
    var answers;
    $(qRemain).text(questionArr.length - currentQuestion)
    //i is a progressive index number starting at 0 and ending with the end of the list
    
    for (i = 0; i < answersIndex; i++) {
        //this will pull out every answer to its parent questionArr index (answers are already associated with questions)
        answers = questionArr[currentQuestion].answers[i];
        // this will create li's in choiceList in the amount of answers in the list, because the 
        //for loop pushes the whole list of answers, in this case 4
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + answers + '</li>').appendTo(choiceList);
    }
    nextButton.show()
};

//push the next button to do it again
    $(nextButton).on("click", function () {
        // Set the end game parameter - quizOver = false is declared in the top lines
        // If the quiz is not over - do the following
        if (!quizOver) {

            // If you didn't pick an answer, you get a message when you click next.
            value = $("input[type='radio']:checked").val();
            console.log(typeof value)
            if (value == undefined) {
                $(quizMessage).text("You didn't pick anything!!");
                $(quizMessage).show();
            
            // If you did click an answer.
            } else {
                
                $(quizMessage).hide();
                // Answer is correct if it matches the correct answer in the array
                if (value === questionArr[currentQuestion].correctAnswer) {
                    
                    // Adds a point to correct answer column
                    correctAnswers++;
                   
                    $(qCorrect).text(correctAnswers);
                    
                // Answer is incorrect
                } else {
                    // Adds a point to the incorrect column
                    alternateFacts++;
                    $(altFacts).text(alternateFacts);
                    penaltyFunction();

                };

                // Progress the current question count.
                currentQuestion++;

                // If player has not answered all of the questions, the quiz progresses, if not, the game ends
                if (currentQuestion < questionArr.length) {
                    startQuiz();
                
                } else {

                 displayScore();

                // Change the text in the next button to ask if user wants to play again
                $(nextButton).text("Play Again?");
                quizOver = true;
                };

            };

        // If the quiz is over, reset the game 
        } else { 
            quizOver = false;
            $(nextButton).text("Next Question");
            resetQuiz();
            startQuiz();
            hideScore();
            startButton.show()
        };

    });

    function resetQuiz() {
        currentQuestion = 0;
        correctAnswers = 0;
        alternateFacts = 0;
    
    };

    // takes 5 seconds off the clock when you answer with alternativeFacts
    function penaltyFunction(){ 
        totalSeconds -= 5
    }
   

    function displayScore() {
        var scoreTime = (60 - $(seconds).text())
        var calculatedScore = Math.floor((correctAnswers / scoreTime) * 10000)
        questionBox.empty()
        choiceList.empty()
        questionBox.text("You correctly answered: " + correctAnswers + " out of: " + questionArr.length + " questions, and scored " + calculatedScore + " points! ");
        highscore()
    };

    function highScore(){
        questionBox.empty()
        choiceList.empty()
        questionBox.text("You correctly answered: " + correctAnswers + " out of: " + questionArr.length + " questions, and scored " + calculatedScore + " points! ");
        
        $('<li><input type="submit text" ></li>').appendTo(choiceList);

    }
    // function hideScore() {
    //     $(document).find(".result").hide();
    // };     
    
    
// WHEN all questions are answered or the timer reaches, THEN the game is over
    // create an if, (clock.value = 0), if(quiz.length = 10) then launch score menu

   

// WHEN the game is over, THEN I can save my initials and score
    //in question box create an input field that records user initials and score 
    /*
// ------------ previous code from other project ---------
    <h1>hi and stuff</h1>
    <fieldset>
        <legend>Insert data</legend>
        <input id="inpKey" type="text" placeholder="enter key...">
        <input id="inpValue" type="text" placeholder="enter value...">
        <button type="button" id="btnInsert">Insert Data</button>
    </fieldset>
    <fieldset>
        <legend>Local storage</legend>
        <div id="lsOutput"></div>
    </fieldset>
// -------- script starts here ----------
    <script type="text/javascript">
        // localStorage.setItem("age", "38")
        // localStorage.setItem("name", "Dan")

        console.log(localStorage)

        //dom elements/ simplify code by making variables
        const inpKey = document.getElementById("inpKey")
        const inpValue = document.getElementById("inpValue")
        const btnInsert = document.getElementById("btnInsert")
        const lsOutput = document.getElementById("lsOutput")

        // make the button work - when pushed, store the user data from the input fields
        btnInsert.onclick = function () {
            //simplpify code, make variables for the input field's values (what the user typed)
            const key = inpKey.value;
            const value = inpValue.value;

            //check your work with a console.log meaning check the variables you just made
            console.log("value for key:" , key)
            console.log("value for value:" , value)

            // now lets store the data
            //  *** we want to make sure the data is good - no empty fields, we can do that with a 
            // true statement. && meaning if these two values both return as true - then, 
            //in localStorage, set the item (save the data) for key and value.
            if (key && value) {
                //set where you would like to store the data
                localStorage.setItem(key, value)
                //then we want the input fields to clear after the button push, so use this line of code
                location.reload();
            };
        };

        //make the data read back in the local storage data field (see it on the web page)
        // use a for loop
        for (let i = 0; i < localStorage.length; i++) {
            // we are not changing what the constant variables do here, we are adding to their value
            
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            // this fancy code is short hand appending. backticks and ${} mean append
            lsOutput.innerHTML += `${key}: ${value}<br />`;
        };*/ 


        //<----- sources ------->
        // https://uwseafsfft082-37y7395.slack.com/files/U018Z276WQG/F01B0RV2VSQ/localstorage_example