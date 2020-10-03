const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const selectedMovie = document.getElementById('movie');
let ticketPrice = +selectedMovie.value;
const count = document.getElementById('count');
let total = document.getElementById('total');
const reset = document.getElementById('reset');
let screen = document.getElementsByClassName('screen');
const trailer1 = '<iframe  width="560" height="315" src="https://www.youtube.com/embed/qSqVVswa420?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; reload; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
const trailer2 = '<iframe width="560" height="315" src="https://www.youtube.com/embed/pXwaKB7YOjw?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
const trailer3 =  '<iframe width="560" height="315" src="https://www.youtube.com/embed/7TavVZMewpY?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
const trailer4 =  '<iframe width="560" height="315" src="https://www.youtube.com/embed/2QKg5SZ_35I?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
const trailer5 =  '<iframe width="560" height="315" src="https://www.youtube.com/embed/AntcyqJ6brc?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
let array = [trailer1,trailer2,trailer3,trailer4,trailer5];

/*
function resetButton() {
    localStorage.clear();
    populateUI();
    updatedCount();    
}


//Reset Button eventListner
reset.addEventListener('click', resetButton);
*/
let Obj =  document.getElementById('toBeReplaced');
//Function to update movie trailer when movieSelected changes.
 function changeMovieTrailer() {
     
      selectedMovie.addEventListener('change', e => {
        array.forEach((arrayValue,index) => {
           if(e.target.selectedIndex === index){
               Obj.innerHTML = arrayValue;
           } 

        })
     
  })


}    
        
//Function when we refresh the page we get data from loacal Storage and update our UI.
 function populateUI() {     
         const selectedSeats = JSON.parse(localStorage.getItem('selectedSeatsIndex'));     
         
          if(selectedSeats !== null && selectedSeats.length > 0){
           seats.forEach((seat, index) =>{             
            if(selectedSeats.indexOf(index) > -1){
              seat.classList.add('selected');
          }
      });        

     }
     const movieIndex = localStorage.getItem('movieIndex');
     if(movieIndex !== null){
     selectedMovie.selectedIndex = movieIndex;
     //Function for changing trailer in screen according to Localstorage when screen is reloaded     
    array.forEach((arrayValue,index) => {
        if(+movieIndex === index){
            Obj.innerHTML = arrayValue;
        }
    })
    
    
    }

 
     
     const moviePriceUpdated = localStorage.getItem('moviePrice');
     if(moviePriceUpdated !== null){
        ticketPrice = moviePriceUpdated; 
     }
   
     
    
 }
  //Function call when movieSelected Changes then trailer also Changes
 changeMovieTrailer();
 //Function to Update UI.
 populateUI();

//Function that update Count
 function updatedCount() {
    const selectedSeats = document.querySelectorAll('.row .selected');
    const selectedSeatsValue = selectedSeats.length;
    const selectedSeatsIndex = [...selectedSeats].map( seat =>  [...seats].indexOf(seat));
     localStorage.setItem('selectedSeatsIndex', JSON.stringify(selectedSeatsIndex));    
    count.innerText = selectedSeatsValue;
    total.innerText = selectedSeatsValue*ticketPrice;
 }
 //Function to add Movie data on localStorage
 function setMovieData(movieIndex,moviePrice) {
     localStorage.setItem('movieIndex',movieIndex);
     localStorage.setItem('moviePrice',moviePrice);
 } 
 //Function to addEventListner for change in TicketPrice for changing the movie
selectedMovie.addEventListener('change', e => {
   ticketPrice = +e.target.value;
   setMovieData(e.target.selectedIndex,e.target.value)

   updatedCount();

})

//Function of AddEvent Listner on clicking the Seats and Updating their Class
container.addEventListener('click', (e) =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');   
     updatedCount();
    }    






})
// To update Count and MoviePrice when movieSelected changes
updatedCount();