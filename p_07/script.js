const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const message = document.getElementById('win-lose');
const restartBtn = document.getElementById('restart');
const notification = document.getElementById('slider-container');
const hangmanParts = document.querySelectorAll('.hangman-part');
const part = document.querySelectorAll('.hangman-part');
const startGameDiv = document.querySelector('.startGame');
const startGameBtn = document.querySelector('.startGameBtn');
const hint = document.getElementById('hint');
const refreshBtn =document.querySelector('.refreshBtn');
const closeBtn =document.querySelector('.closeBtn');
//Array of the words to check from  
const wordpool = ["javascript", "python", "nodejs","mangodb","react","reactnative"];
//Generating Random Word form wordpool
let selectedWord = wordpool[Math.floor(Math.random()*wordpool.length)];
//Hint Words
function hintword(){
wordpool.forEach((word,index) => {
  if(index === 2){
   if(selectedWord === word){
    hint.innerHTML = `
          <p> (hint: it is a framework of javascript)</p>
  `
}}
if(index === 3){
   if(selectedWord === word){
    hint.innerHTML = `
          <p> (hint: it is a programming language used for backend of website)</p>
  `
}}
if(index === 4 || index === 5){
  if(selectedWord === word){
   hint.innerHTML = `
         <p> (hint: it is a library  of javascript)</p>
 `
}}
if(index === 0 || index === 1){
  if(selectedWord === word){
   hint.innerHTML = `
         <p> (hint: it is a programming language)</p>
 `
}} 
})}
//Array of words that checks whether these words exist in the selectedWord or Not
const correctLetters = [];
const incorrectLetters = [];


function displaySelectedWord(){
 word.innerHTML = `
                 ${selectedWord
                   .split('')
                   .map(
                    letter => 
                       `
                     <span class="enter-letters"> 
                     ${correctLetters.includes(letter) ? letter : ''}
                     
                     </span>
                        `                 
                   ).join('')           
                }                   
                  `
//To make word element  in a single line, so that we comapre it with  selected word
     const wordText =  word.innerText.replace(/\n/g, '')  
//Compare wordText with selectedWord,if user entered all letters of the selectedWord, game could terminate and he should won the game with popUp Notification 
     if(wordText === selectedWord){
         message.innerText = "You Won";
         popup.style.display = 'flex';  
        }       
}
//Function to show sliding Notification 
  function showNotification(){
    notification.classList.add('show');
    setTimeout( e => {
        notification.classList.remove('show')
    }, 3000);      
}
//Function to show Wrong Letters
 function updateWrongLetter(){
  //Update UI of WrongLetters
  wrongLetters.innerHTML = 
                `
                      ${incorrectLetters.length > 0 ? `<p>Wrong</p>` : ''}
                      ${incorrectLetters.map(letter =>`<div> ${letter}</div>`)}
                `;    
  //Show HangmanPart
  hangmanParts.forEach((part,index) => {
    const error = incorrectLetters.length;
    if(index < error){
      part.style.display = 'block'
    } else{
      part.style.display = 'none'
    }
  })
  //show popup of Lose when user entered 5 wrongLetters
  if(hangmanParts.length === incorrectLetters.length){
   message.innerText = 'You Lose';
   popup.style.display = 'flex';
  }
 }

//Event Handlers  when user enter keyboard key:
window.addEventListener('keydown', e => {
     if(e.keyCode >= 65 && e.keyCode <= 90){
      let letter = e.key
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
              correctLetters.push(letter)
              displaySelectedWord();    
            }else{
                showNotification();
            }
            
        }else{
            if(!incorrectLetters.includes(letter)){
                incorrectLetters.push(letter)
               updateWrongLetter();
            }else{
                showNotification();
            }
        }

     
     
     
        }
})
//Event Listner for Restart Game Button
restartBtn.addEventListener('click', () => {
//Arrays Empty
 incorrectLetters.splice(0);
 correctLetters.splice(0);
//Generating Random Word
selectedWord = wordpool[Math.floor(Math.random()*wordpool.length)]; 
 
displaySelectedWord();
 //Updating Wrong Letters
 updateWrongLetter();
 //Disable PopUP 
 popup.style.display = 'none';
 // Updating hint
 hintword();
})
//EventListner for Start Game 
startGameBtn.addEventListener('click', () => {
  startGameDiv.classList.add('remove') 
})
displaySelectedWord();
hintword();
//EventListner for Close Window
closeBtn.addEventListener('click', e => {
startGameDiv.classList.remove('remove')
//Arrays Empty
incorrectLetters.splice(0);
correctLetters.splice(0);
//Generating Random Word
selectedWord = wordpool[Math.floor(Math.random()*wordpool.length)]; 

displaySelectedWord();
//Updating Wrong Letters
updateWrongLetter();
//Disable PopUP 
popup.style.display = 'none';
// Updating hint
hintword();
})
//EventListner to reload 
refreshBtn.addEventListener('click', e => {
  
  //Arrays Empty
  correctLetters.splice(0);
  incorrectLetters.splice(0);
  //Generating Random Words
  selectedWord = wordpool[Math.floor(Math.random()*wordpool.length)];
   displaySelectedWord();
  //Update Wrong Letters
  updateWrongLetter();
  //Update hint Word
  hintword();
  //Not Add Start Div
//  startGameDiv.classList.add('remove');

})