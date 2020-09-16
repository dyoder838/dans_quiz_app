
// ------- Dom Elements by type -----------
// ------------- buttons ------------------
const startButton = $("#start-button")
const stopButton = $("#stop-button")
const aButton = $("#a-button")
const bButton = $("#b-button")
const cButton = $("#c-button")
const dButton = $("#d-button")

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

// ---------- Question ------------
const question = $("#question")

// ---------- running tallies -------
const qRemain = $("#questions-remaining")
const qCorrect = $("#questions-Correct")
const altFacts = $("#alternative-facts")

// GIVEN I am taking a code quiz
// WHEN I click the start button ,THEN a timer starts and I am presented with a question
//TODO: build a button that starts a timer to begin
//FIXME: only one button press allowed
// ------------ start button -------------
$(startButton).on("click", function(){
    // 5 second count down w text in question
    startDelayClock();
    console.log("button working?:" , startButton)
});

// ------ start button triggers delay start count down ----------
function startDelayClock(){
    
    var timerInterval = setInterval(function() {
    
        question.text("Begin quiz in "  + secondsLeft);
        secondsLeft--;
        console.log("does startDelayClock work:" , secondsLeft)
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            question.empty()
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
        if(totalSeconds === 0) {
            clearInterval(quizInterval);
            
        }
    }, 1000);
};

// when timer starts counting the multiple choice field appears
            // function that populates the dom object mainBox, makes the questions change
// --------- questions and answers -----------
// how to construct the array
 
var myArr = [
     {
         question: "which option shows a correctly written function in javascript"
         answers:["f of x", "=> {}", "function myFunction(){}", "ahhhhhhh!!!"]
         correctAnswer:"function myFunction(){}"
     }, 
 ]
 
 // my array, question (object) indexed at 0, and of that, answers indexed, call them with 0- whatever 
 // use these as links to the main viewer - try to make a template with a variable that progresses
 //through the array with a for loop
 console.log(myArr[0].answers[1])




       

        
// TODO: build the multiple choice fields
    //we need to construct arrays that pertain to the dom ids #question-box and a-d buttons
        // there needs to be a && if function to determine the correct answer. 
        // there needs to be a tracker that tallies wright wrong and remaining questions
            // when the question is answered wrong, 5 seconds is subtracted from the main clock

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