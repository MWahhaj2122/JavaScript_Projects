const musicContainer = document.getElementById('music-container');
const arrowButton = document.getElementById('arrow-down');
const previousButton = document.getElementById('previous');
const playButton = document.getElementById('play');
const forwardButton = document.getElementById('forward');
const volumeButton = document.getElementById('volume');
const randomButton = document.getElementById('random');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const audio = document.getElementById('audio');
const timeStamp = document.getElementById('time-stamp');
const totalDuration = document.getElementById('total-duration');
//Songs list
const songList = [
                  'Joh Tuh Na Mila',
                  'Hamdard',
                  'Kho Gae Hum Kahan',
                  'Love Me Like You Do',
                  'ritiz liggi (1)' 
]
//Tarck Song which is currently Playing
let currentSong = 0;
//Function to load Song in DOM  
function loadSong(song) {
    title.innerText = song;
    audio.src = `audio/${song}.mp3`;
    cover.innerHTML= `
    <img src="images/${song}.jpg">      
    `;
}
//Function to play Song when it is paused
 function playSong(){
   //Add play class    
   musicContainer.classList.add('play');  
   playButton.querySelector('i.fas').classList.remove('fa-play');
   playButton.querySelector('i.fas').classList.add('fa-pause');
  //To play song
   audio.play();
 }
//Function to pause the Song
 function pauseSong(){
     musicContainer.classList.remove('play');
     playButton.querySelector('i.fas').classList.remove('fa-pause');
     playButton.querySelector('i.fas').classList.add('fa-play');
  //To Pause Song
   audio.pause();   
    }
 //Function to play previous Song
 function previousSong(){
   //Decrement the CurrentSong
    currentSong--;
    if(currentSong < 0){
      currentSong = songList.length - 1; 
    }
   //Update DOM
   loadSong(songList[currentSong]);
   //Play Song also
   playSong();  
 }
 //Function to play next Song 
 function nextSong(){
    //Increment the CurrentSong
     currentSong++;
     if(currentSong > songList.length - 1){
       currentSong = 0; 
     }
    //Update DOM
    loadSong(songList[currentSong]);
    //Play Song also
    playSong();  
  }
 //Function to update Volume
  function volumeChange() {
      if(audio.volume === 1){
       volumeButton.querySelector('i.fas').classList.remove('fa-volume-up');
       volumeButton.querySelector('i.fas').classList.add('fa-volume-mute');   
       audio.volume = 0;  
    }
    else if(audio.volume === 0){
        volumeButton.querySelector('i.fas').classList.remove('fa-volume-mute');
        volumeButton.querySelector('i.fas').classList.add('fa-volume-down');   
        audio.volume = 0.5;  
    }
    else if(audio.volume === 0.5){
        volumeButton.querySelector('i.fas').classList.remove('fa-volume-down');
        volumeButton.querySelector('i.fas').classList.add('fa-volume-up');   
        audio.volume = 1;
    }
  }
 //Randomly Select A Song
 function randomSelectSong() {
     const randomSong = Math.floor(Math.random()*songList.length);
   //Load the Song
   loadSong(songList[randomSong]); 
  //Play the Song
  playSong();      
 }
 //Update Progress Bar on the basis of audio
 function updateProgress(e) {
    const {currentTime,duration} = e.srcElement;
    const progressPercentage = (currentTime/duration)*100;
    progressBar.style.width = `${progressPercentage}%`;
    //Rounding Seconds.
 let seconds = Math.floor(currentTime % 60);

 if(seconds < 10){
     seconds = `0${seconds}`;
 }
 // Rounding Minutes.
  let minutes = Math.floor(currentTime/ 60);
  if(minutes<10){
      minutes = `0${minutes}`
  }
 let totalMinutes = Math.floor(duration/60);
   if(totalMinutes === NaN){
      totalDuration.innerText = `00:00`}
      else if(totalMinutes <10){
        totalMinutes = `0${totalMinutes}`
    }    
  let remainingSeconds = Math.floor(duration - totalMinutes*60)
   if(remainingSeconds < 10){
    remainingSeconds = `0${remainingSeconds}`
   }


  //Updating TimeStamp
  timeStamp.innerText = `${minutes}:${seconds}`;
  //Updating totalDuration
  totalDuration.innerText = `${totalMinutes}: ${remainingSeconds}`
}
 //Function to update timeUpdate
  function currentTimeChange(e){
      const width = this.clientWidth;
      const offsetX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (offsetX/width) * duration;
      console.log(offsetX,width,duration)  

  } 
  function reload() {
      totalDuration.innerText = `00:00`;
  }          
//Initiaze the Song First
loadSong(songList[currentSong]);
//
window.onload = reload;  
 
//Event Listners
//1. Event Listner on Play Button
playButton.addEventListener('click', ()=> {
  //It Returns True Or False
    const isPlaying = musicContainer.classList.contains('play');
  //If it returns True 
    if(isPlaying){
     pauseSong();
    } 
    else {
     playSong();
    }
});
//2. Event Listner on previous Button
 previousButton.addEventListener('click', previousSong);
 //3. Event Listner on next Button
  forwardButton.addEventListener('click', nextSong);
 //4. Event Listner on Volume
  volumeButton.addEventListener('click',volumeChange);
//5. Randomly Select A Song
  randomButton.addEventListener('click', randomSelectSong)
//6. Event Listner on Audio to update ProgressBar
 audio.addEventListener('timeupdate', updateProgress);
//7. Event Listner on progressContainer so that we update Current Time when we click on progress Container
 progressContainer.addEventListener('click', currentTimeChange)
//8. Event Listner automatically play song when one song ended
audio.addEventListener('ended', nextSong); 