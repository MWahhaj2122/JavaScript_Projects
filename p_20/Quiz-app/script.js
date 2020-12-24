const quizData = [
             {
               question: "What is mean by 'this' keyword in javascript?",
               a: "It refers previous object",
               b:  "It refers current object",
               c:  "It is variable which contains value",
               d:  "None",
               correct: "b"  
            },
             {
                question: "In JavaScript, Window.prompt() method return true or false value? ",
               a: "True",
               b:  "False",
               c:  "Both",
               d:  "None",
                correct: "b"  
             },
             {
                question: "Which of the following is not a valid JavaScript variable name?",
                a:"2names",
                b:"_first_and_last_names",   
                c:"FirstAndLast",
                d:"None of these",
                correct: "a"
             },
             {
                question: "______ tag is an extension to HTML that can enclose any number of JavaScript statements?",
                a:"<SCRIPT>",
                b:"<BODY>",   
                c:"<HEAD>",
                d:"<TITLE>",
                correct: "a"
             },
             {
               question: "Which of the following attribute can hold the JavaScript version?",
               a:"LANGUAGE",
               b:"SCRIPT",   
               c:"VERSION",
               d:"NONE OF THESE",
               correct: "a"
            },
            {
               question: "Inside which HTML element do we put the JavaScript?",
               a:"<js>",
               b:"<scripting>",   
               c:"<script>",
               d:"<javascript>",
               correct: "d"
            },
            {
               question: "Which types of image maps can be used with JavaScript?",
               a:" Server-side image maps",
               b:" Client-side image maps",   
               c:"Both",
               d:"None of these",
               correct: "b"
            },
            {
               question: "Which of the following is not considered a JavaScript operator?",
               a:"new",
               b:"this",   
               c:"delete",
               d:"None of these",
               correct: "b"
            },
            {
               question: "JavaScript is interpreted by _____",
               a:"Client",
               b:"Server",   
               c:"Object",
               d:"None of these",
               correct: "a"
            },
            {
               question: "Using _______ statement is how you test for a specific condition?",
               a:"Select",
               b:"If",   
               c:"Switch",
               d:"For",
               correct: "b"
            }

];
//Getting DOM elements
//Questions
const heading = document.getElementById('heading');
//Question Options 
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
//Submit Btn
const submitBtn = document.getElementById('submit-btn');
//All Input Types radio Btn 
const a_input = document.getElementById('a');
const b_input = document.getElementById('b');
const c_input = document.getElementById('c');
const d_input = document.getElementById('d');
//Container in which all data present 
const quizContainer = document.getElementById('quiz-data');
// const arrayInputs = [a_input.id, b_input.id, c_input.id,d_input.id];
//Current Quiz 
let  currentQuiz = 0;
//Score

let score = 0;
//
const startQuizDiv = document.getElementById('start-quiz-div');
const startQuizInput = document.getElementById('start-quiz-input') 
const startQuizBtn = document.getElementById('start-quiz-btn');
//
const name1 = document.getElementById('name');
const time = document.getElementById('time')
const questionNumber = document.getElementById('question-number')

startQuizInput.focus();
// //load Quiz
// loadQuiz(name);

//Function to load quiz
 function loadQuiz() {
   const data = quizData[currentQuiz];
   name1.innerText = `Welcome!! ${name}`;
   questionNumber.innerText = `Question no:${currentQuiz + 1} `  
   heading.innerText = `${data.question}`;

   a_text.innerText = `${data.a}`;
   b_text.innerText = `${data.b}`;
   c_text.innerText = `${data.c}`;
   d_text.innerText = `${data.d}`; 
//Deselecting the radio buttons
  a_input.checked = false;
  b_input.checked = false;
  c_input.checked = false;
  d_input.checked = false;
 };
 //Function to check the answers of Users
  function checkAnswers(firstInput,secondInput,thirdInput,fourthInput){
 //If User clicks on 'A' option and this 'A' option is true then update score  
   if (firstInput.checked === true && firstInput.id === quizData[currentQuiz].correct){
      score++;    
   }
 //If User clicks on 'B' option and this 'B' option is true then update score  
   else if(secondInput.checked === true && secondInput.id === quizData[currentQuiz].correct){
      score++;  
   }
 //If User clicks on 'C' option and this 'C' option is true then update score  
   else if(thirdInput.checked === true && thirdInput.id === quizData[currentQuiz].correct){
      score++;
   }
 //If User clicks on 'D' option and this 'D' option is true then update score  
   else if(fourthInput.checked === true && fourthInput.id === quizData[currentQuiz].correct){
      score++;
   }
}
//Function to sart quizz
   
      
   
    startQuizBtn.addEventListener('click', (e)=> { 
      if (name) {
      startQuizDiv.style.display = 'none';
       loadQuiz();
       //Global variable
       handle = setInterval(timeUpdate,1000);
       name.value = '';
      }else {
         alert('Please provide a name.') 
       }
      })
  
//AddEvent Listner on submit button
submitBtn.addEventListener('click', (e)=> {
  //To prevent from refresh 
   e.preventDefault();
  //checking  whether we have data present in quizData Array
   if (currentQuiz <= quizData.length - 1) {
  //Ensuring that user atleast click on one option    
     if(a_input.checked || b_input.checked || c_input.checked || d_input.checked){     
  //Passing all inputs as parameters to function which checks user clicks on  which option and matches answer from array Quizdata and if user clicks right option update the score  
      checkAnswers(a_input,b_input,c_input,d_input);
   //Incrementing currentQuiz   
      currentQuiz++;
   //Checking if currentQuiz value is not eqaul to array length then update DOM,it is done due to score value  
      if(!(currentQuiz === quizData.length )){
      loadQuiz();   
      }
     //If currentQuiz is equal to aaray length And there is no data in array then show score 
      else {
         clearInterval(handle);
         quizContainer.innerHTML = `
                 <h2>Congratulations!! ${name}</h2>
                 <i class="fas fa-trophy"></i>
                 <p class = "final-text">Your Score is ${score} out of ${quizData.length} </p>
                 <p>Time Taken ${time.innerText} </p>
                 <button class = "submit-btn" onclick = "location.reload()">Try Again</button>
     `; 
      }

     }
    //If user doesnot click on input then show alert 
     else {
      alert("Please select any Option");  
     } 
   }
   //Awen likhaa haai
   else {
      
     quizContainer.innerHTML = `
                 <p class = "final-text">Your Score is ${score} out of ${quizData.length} </p>
                 
                 <button class = "submit-btn" onclick = "location.reload()">Try Again</button>
     
     `      
   }
});

//Add event listner on inputField
startQuizInput.addEventListener('input', ()=> {
   //Global Scope
   name = startQuizInput.value;
          
});
//Time Portion
let seconds = 0;
let minutes = 0;
function timeUpdate() {
   seconds++;
   if (seconds < 10) {
      time.innerText = `0${minutes}:0${seconds}`   
   }
   else if (seconds >= 10 && seconds <=59) {
      time.innerText = `0${minutes}:${seconds}`
       
   }
   else if (seconds == 60) {
      seconds = 0
      minutes++;
      time.innerText = `0${minutes}:0${seconds}`;
   }
   
};
