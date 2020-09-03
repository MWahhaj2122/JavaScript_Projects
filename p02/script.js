const container = document.querySelector('.container'); //return only one value having class container
const seats = document.querySelectorAll('.row .seat:not(.occupied)');// return all values containing seat class
const movieSelector = document.getElementById('movie');
let  ticketPrice = +movieSelector.value;// it is string so we convert it to number so that we apply mathematical Operation on it.
const count = document.getElementById('count');
const total = document.getElementById('total');

//function to add data from local storage

//function to update Count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const countSelectedSeats = selectedSeats.length;
    const seatIndex = [...selectedSeats].map(seat =>  [...seats].indexOf(seat))               
    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex));// Converting array into local storage

    count.innerText = countSelectedSeats;
    total.innerText = countSelectedSeats * ticketPrice;  
}
//Function to select movie and save data
function movieSelected(movieIndex,movieValue){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMovieValue', movieValue);
}
//Event listner to update the  total price as we change the movie
movieSelector.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    movieSelected(e.target.selectedIndex, e.target.value);
    updateSelectedCount();

})


//Event Listner for click on available seats

container.addEventListener('click', (e) => {
     if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
       e.target.classList.toggle('selected')
       updateSelectedCount();
})

