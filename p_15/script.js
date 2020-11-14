//Get DOM Elements
//Get form
const form = document.getElementById('form');
//Get  Search input 
const searchElement = document.getElementById('search');
//Get Results container where data is shown After API call
const results = document.getElementById('results');
//Get Pagination Container 
const pagination = document.getElementById('pagination');

//API URl
const api = 'https://api.lyrics.ovh';
//Functions
//1. Getting data of  Search Songs // As we are fetching data  from APi so we use async function
 async function searchSongs(term){ 
   const  res = await fetch(`${api}/suggest/${term}`);
   const  data = await res.json();
   showData(data);
               
} 
//2. Show data 
 function showData(data){
     console.log(data);
    //Adding data in results Container 
     results.innerHTML = `
      <ul class = "songs">
       ${data.data.map(
           song => 
             `<li>  
              <span>${song.artist.name}- ${song.title}</span>
              <button class="btn" data-title ="${song.title}" data-name ="${song.artist.name}">Get Lyrics</button> 
              </li>`
        
       ).join('')
 }         
     </ul>          

     `;
   //Add Pagination if required    
    if(data.prev || data.next){
      pagination.innerHTML = `    
       ${data.prev ? `<button class='btn' onClick="getMoreSongs('${data.prev}')">Prev Page</button>`: ''}  
       ${data.next ? `<button class='btn' onClick="getMoreSongs('${data.next}')">Next Page</button>`: ''}      
       `
    }else {
     pagination.innerHTML = '';   
    }
      

 }
//3.Function to show next songs
 async function getMoreSongs(url) {
    const  res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);   
 } 
//4. Function to get Lyrics from API
 async function getLyrics(artist, title) {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await res.json();
    console.log(data.lyrics);
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br />')
    const searchTerm = searchElement.value.trim();
    
    results.innerHTML = `
       <button class="btn1" onClick="searchSongs('${searchTerm}')">Back</button>
       <h2>${artist} - ${title}</h2>
       <p>${lyrics}</p>
    `;
    pagination.innerHTML = '';
 } 
// //5. Function to show Lyrics data on results container
//  function showLyrics(data) {
    
//  }  
//Event Listners
//1. Event Listner on submit the form
form.addEventListener('submit', e => {
 //To stop reload the page on submit   
   e.preventDefault();
//Getting the search input value 
   const searchTerm = searchElement.value.trim();
//Checking whether the input typed by user is valid or not   
   if(searchTerm){
     searchSongs(searchTerm); 
   }else{
     alert("Please enter a valid song title or artist name");  
   }

});
//2. Event Listner on Search results container
results.addEventListener('click', e => {
  //Getting the button 
   const clientElement = e.target;
  //Checking whether user click on getLyrics Button or not 
    if(clientElement.tagName === 'BUTTON'){
  //After verifying,we get the values of title and artist from specified HTMl properties(already present in button)     
      const artist = clientElement.getAttribute('data-name');
      const title = clientElement.getAttribute('data-title');
       getLyrics(artist, title); 
    }else {

    }
}) 
