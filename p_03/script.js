const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timestamp');
const volume1 = document.getElementById('volume');
const fullScreen = document.getElementById('expand-screen');
//functions
// 1. function toggleVideo
// If the video is playing then pause video
// If the video is paused then play video
 function toggleVideo() {
     if(video.paused){
         video.play();
     }
     else {
         video.pause();
     }
 };
 // 2. function toggleIcon
 // If the video is playing, then change Icon to pause.
 // If the video is paused, then change Icon to play.
 function toggleIcon() {
     if(video.paused){
         play.innerHTML = '<i class="fas fa-play fa-2x"></i>';     
     }
     else{
         play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
     }
 }; 
 
 // 3. function stopVideo
 // Stop the video and reset the timestamp to 0
 function stopVideo() {
     video.pause();
     video.currentTime = 0;
 };
 // 4. function updateProgress
 // When the video is playing then progress bar should also updated accordingly
 function updateProgress() {
 //update Slider
    progress.value = (video.currentTime/video.duration)*100
// Update Timestamp
//Rounding Seconds.
 let seconds = Math.floor(video.currentTime % 60);

if(seconds < 10){
    seconds = `0${seconds}`;
}
// Rounding Minutes.
 let minutes = Math.floor(video.currentTime/ 60);
 if(minutes<10){
     minutes = `0${minutes}`
 }


 //Updating TimeStamp
 timeStamp.innerHTML = `${minutes}:${seconds}`;
 }
 // 5. function setProgress
 // When we change Progress bar playback video also chnage
 function setProgress() {
 video.currentTime = (progress.value*video.duration) / 100; 
 };
 // 6. function fullScreenMode
 // that enables fullscreen 
 function fullScreenMode() {
     video.requestFullscreen();
 }
 // 7. function volumeChange
  function volumeChange(){
      if(video.volume === 1){
          volume1.innerHTML = '<i class="fas fa-volume-down fa-2x"></i>';
          video.volume = 0.5;
      }
      else if(video.volume === 0.5){
        volume1.innerHTML = '<i class="fas fa-volume-mute fa-2x"></i>';
        video.volume = 0;
    }
    else if(video.volume === 0){
        volume1.innerHTML = '<i class="fas fa-volume-up fa-2x"></i>';
        video.volume = 1;
    }
  } 
//Event Listners
// 1.VideoElement : click to pause and play video 
 video.addEventListener('click',toggleVideo);
// 2.VideoElement :  when  we click to play video then play icon toggle to pause icon
video.addEventListener('play', toggleIcon);
// 3. videoElement : when we click to pause video then pause icon toggle to play icon
video.addEventListener('pause', toggleIcon);
// 4. VideoElement : while playing the video progress bar also work accordingly and timestamp also updated
video.addEventListener('timeupdate', updateProgress)
// 5. PlayIcon :   click to pause and play video;
play.addEventListener('click',toggleVideo);
// 6. StopIcon : click to  stop video and also reset video;
stop.addEventListener( 'click', stopVideo);
// 7. Timestamp : update progress bar and timestamp                                              
progress.addEventListener('change',setProgress)
// 8. Volume : when we click volume icon volume of video increases first click +1 2nd +2 3rd +3 and then mute;
volume.addEventListener('click', volumeChange);
// 9. FullScreen : Full Screen of Video 
fullScreen.addEventListener('click', fullScreenMode);