//Getting all DOM elements
//Getting Toggle button to show custom text container
const toggleBtn = document.getElementById('random');
//Getting select Element to show options on it
const voiceSelect = document.getElementById('select');
//Getting close Button to close the container
const closeBtn = document.getElementById('close');
//Getting input field where user enter text
const inputText = document.getElementById('text');
//Getting Read Custom Text Button when user enter his input By clicking on it this input goes to API where voice comes
const readCustomTextBtn = document.getElementById('read');
//Main Content where images show
const main = document.getElementById('main');
//text Container
const customTextDiv = document.getElementById('text-container');
//MAking array of images path and text
const data = [
             {
               image: 'img/angry.jpg',
               text: "I'm angry"
             },
             {
                image: 'img/drink.jpg',
                text: "I'm thirsty"
              },
              {
                image: 'img/food.jpg',
                text: "I'm hungry"
              },
              {
                image: 'img/grandma.jpg',
                text: "I wanna go to grandma's house"
              },
              {
                image: 'img/happy.jpg',
                text: "I'm happy"
              },
              {
                image: 'img/home.jpg',
                text: "I wanna go to home"
              },
              {
                image: 'img/outside.jpg',
                text: "I wanna go outside"
              },
              {
                image: 'img/sad.jpg',
                text: "I'm sad"
              },
              {
                image: 'img/scared.jpg',
                text: "I'm scared"
              },
              {
                image: 'img/school.jpg',
                text: "I wanna go to school"
              },
              {
                image: 'img/tired.jpg',
                text: "I'm tired"
              }, 
   ];
//Add images to the UI
data.forEach(createBox);
//
let voicesBackup = [];
//Functions
//1. function that create box and then place image there
 function createBox(imageObj) {
  //Create empty Box separately for each iteration in which image is added
  const box = document.createElement('div');
  //Adding Class to box
  box.classList.add('box');
  //Destructuring of object to access object properties  
  const { image , text } = imageObj;
  //Adding image to the box
  box.innerHTML = `
         <img src = ${image} alt = ${text} />
         <p>${text}</p>     
  `;
  //Add event to speaking text 
  box.addEventListener('click', ()=> {
  //Function that takes text as argument and then update message accordingly
    setMessage(text);
  //Function that used to speak the text given  
    speakText();
  })
 //Add new box to the DOM
  main.appendChild(box);
  
 }; 
//Initializing the message to speak
const message = new SpeechSynthesisUtterance();


// 2. Function to get voices from Web Speech API and put into the select box
function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }
  
    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;
  
    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  
// Execute populateVoiceList function
populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
speechSynthesis.onvoiceschanged = populateVoiceList;
}
//3.Function to read message
function setMessage(text){
    message.text = text;
}
//4.Function to speak
function speakText() {
    speechSynthesis.speak(message);
}
// 5. Function to set the new voice
function setVoice(e) {
    
    console.log(voicesBackup);
   message.voice = voicesBackup.find(voice => `${voice.name} (${voice.lang})` === e.target.value);
};


//EventListners
//1.Toggle Button
toggleBtn.addEventListener('click', ()=> {
   customTextDiv.classList.toggle('show');
})
//2.Close Button
closeBtn.addEventListener('click', ()=> {
    customTextDiv.classList.remove('show');
})
//3 . Event Listener when changing voices
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
voiceSelect.addEventListener('change', setVoice);
//4. Event Listner to read the custom Text
readCustomTextBtn.addEventListener('click', ()=> {
    setMessage(inputText.value);
    speakText();
});
