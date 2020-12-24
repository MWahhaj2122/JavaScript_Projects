//Gettting DOMs element
const score = document.getElementById("score");
const timeLeft = document.getElementById("time-left");
const squareDiv = document.querySelectorAll(".square");
const square = document.querySelectorAll(".grid");
const container = document.getElementById("container");
const backGroundMusicBtn = document.getElementById("button");
const audioOnClick = document.createElement('audio');
audioOnClick.setAttribute('src', "sound.mp3");
const backgroundAudio = document.createElement('audio');
backgroundAudio.setAttribute('src', "background-sound.wav");
const gameOverAudio = document.createElement("audio");
gameOverAudio.setAttribute('src', "game-over.wav");
//For continous playing 
// backgroundAudio.setAttribute('loop', "true");
// backgroundAudio.setAttribute('autoplay', "true");
backGroundMusicBtn.addEventListener('click', ()=> {
    if(!container.classList.contains('showw')){
    backgroundAudio.loop = true;   
    backgroundAudio.play();
    container.classList.add('showw');
    backGroundMusicBtn.innerText = 'Stop Background Music';
  }else{
    backGroundMusicBtn.innerText = 'Play Background Music'
    backgroundAudio.pause();  
    container.classList.remove('showw');  
  }

//double click to pause the background music    
    // backGroundMusicBtn.addEventListener('click', ()=> {
    //     backgroundAudio.pause();
          
    // });   
});

// if(container.classList.contains('showw')){ 
       
//     backgroundAudio.pause();
//    }






//Initializing Score
let result = 0;
//Initailizing time
let time = 59;
//Randomly adding moleImage to square
function moveMole() {
   //If there is class already added we remove it  
    square.forEach(className => {
       className.classList.remove('mole') 
    });
  //We randomly select number and give it to the square array and assign it to varaible  
   let randomPosition = square[Math.floor(Math.random()*12)];
  //Adding class to the selected square  
   randomPosition.classList.add("mole");
  //We have a full square element we need only his ID 
    currentDiv = randomPosition.id;
}
//Initializing
moveMole();
//Function for timeUpdate
 function timeUpdate() {
    //Decrementing 
     time--;
    //Assigining the decremented value to the timeLeft 
     timeLeft.innerText = `${time}s`;
    //If time is 0 then we want game Over. 
     if (time === 0) {
    //When timesUP we donot clear the intervals that execute after every 1s     
        clearInterval(timesUp);
        clearInterval(timesUpForRealTime);
    //GameOverSound
        backgroundAudio.pause();
        gameOverAudio.play();
    //Adding class to container   
       container.classList.add("show");
     //GameOver Container in making   
      container.innerHTML = `
      <h2>Game Over</h2> 
      <h2>Your Score is: ${result}</h2>
      <button class= "btn" onclick= "location.reload()">Play Again</button>
      `   
     }

 }
 //When we click on the div we compare the clickingDIv id with MOle ID 
    square.forEach(id => {
       
 //EventListner on every element of the DIV (For clicking the div)       
      id.addEventListener("mouseup", ()=>{
  //IF ClickingDIv ID is same as that of MOLeImageID        
         if (id.id == currentDiv) {
   //Incrementing SCore          
            result++;
            score.innerText = result;
             
            audioOnClick.play(); 
        }else {
            // backgroundAudio.loop = true;
            // backgroundAudio.play();                          
        } 
      });  
    });

//TimeUp  
let timesUp = setInterval(moveMole,1000);
//Time Update
let timesUpForRealTime = setInterval(timeUpdate,1000);

