//Initializing Page
let page = 1;
//API
let APIURL =
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
//ImagePath
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
//SearchAPI
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
//DOm Elements
const main = document.querySelector('main');
const form =document.getElementById('form');
const input = document.getElementById('search');    
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
//Initializing
 getMovie(APIURL);
//All Functions
//1. Function that get data from  Movie API 
async function getMovie(url) {
    const resp = await fetch(url);
    const data = await resp.json();

      showMovie(data.results);
  }
//2.Function to show movies in DOM
 function showMovie(movie) {
//Checking whether type word in search input has data in it.     
   if(movie == ''){
     main.innerHTML = `
     <h1>Data Not found, Try Another one</h1>
     `;
  //When data is not found we donot want next and prev button to show.     
     nextBtn.style.display = 'none';
     prevBtn.style.display = 'none';
    }
   else {
    // previous data clearing in main
        main.innerHTML = '';
    // We have an aaray we apply forEach on it     
    movie.forEach(movieEl => {
       const {poster_path,vote_average, title, overview,release_date} = movieEl;   
      //Creating separate div for every movie       
      const movieDiv = document.createElement('div');
      //Adding Class
      movieDiv.classList.add('movie');  
      //updating div with image title and overview 
      movieDiv.innerHTML = `
      <img src= ${IMGPATH + poster_path}  
      alt="image">  
       
      <div class="movie-title">
         <h3>${title}</h3>
         <span class = "${getClass(vote_average)}">${vote_average}</span> 
      </div>
      <div class = "overview" >
        <h1>Overview:</h1>
        <p> ${overview}</p>
        <h2>Release Date</h2>
        <span>${release_date}</span>
      </div>
      `;
     //After creating separate div we append this div to main element 
     main.appendChild(movieDiv);
     //When we click on the moviDiv we want overlay to appear on it 
      movieDiv.addEventListener('click', ()=> {
     //Accessing the overlay div of clicked movieDiv     
        const overviewDiv = movieDiv.lastElementChild;
      //Adding overlay to the movieDiv  
        overviewDiv.classList.toggle('show');
      //We change the border Color according to vote Rating  
        movieDiv.classList.toggle(getClass(vote_average)); 
        
         
      });              
     });
           
     //After creating all divs and showing in main we want next Button to appear
     nextBtn.style.display = "flex";
    }    
 };
//2. Function to change text-color of votes depending upon rating   
 function getClass(vote){
     
     if (vote >= 8) {
         return 'green';
     }else if (vote >= 5 ) {
         return 'orange';
     }
     else {
         return 'red';
     }
    } 
  console.log(movie);   
//Event Listners

//1.form add EventListner
  form.addEventListener('submit', e => {
    //Preventing from reload  
      e.preventDefault();
    //Getting search input value when user press ENTER  
      const searchTerm = input.value.trim();
      //If user press Enter and it has some value in it then, we call API to show respective results   
      if(searchTerm){
         getMovie(SEARCHAPI + searchTerm);
         //we donot want next button when we search movie
        //  nextBtn.style.display = 'none';
        }
      //Empting the search field
      input.value = '';
     
  });
  //2.Event Listner when user click on next Button
 nextBtn.addEventListener('click', ()=> {
  //Incrementing page value   
    page++;
  //Updating the API URL with respect to page value  
     APIURL =
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
  //Calling the function that update DOM with respect to search value   
    getMovie(APIURL);
  //
  prevBtn.style.display = 'flex';
       
});
//3.Event Listner on previous Button 
  prevBtn.addEventListener('click', ()=> {
   //If page value is greater than 1 then we want decrement of page value because page < 1 has no data in it.    
    if(page > 1){ 
       //Decreminting page value     
         page--;
        //Updating the API URL with respect to page value 
         APIURL =
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
        //Calling the function that update DOM with respect to search value 
        getMovie(APIURL);
     }
   //If value of page is less than or equal to 1, we donot want to show previous btn  
    else if(page <= 1){
        prevBtn.style.display = 'none';  
      } 
        }); 
   //4.
    //  main.addEventListener('click', (e)=> {
    //      console.log(e.target.value);
    //  })