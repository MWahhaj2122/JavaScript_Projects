const filter = document.getElementById('filter');
//const serachIcon = document.getElementById('serachIcon');
const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');
//Initializing limit and page of Fetched data
let limit = 5;
let page = 1;
//Getting post data from fetched API
async function getPosts(){
 const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
 const data = await res.json();
 return data;
}  
// Show post data after fetching data from API
async function showPosts(){
   const posts = await getPosts();
   posts.forEach(post => {
       
   //Creating div like in dummy text HTML 
   const postElement = document.createElement('div');
   //Adding class
   postElement.classList.add('post');
   
   postElement.innerHTML = `
   <div class="post-number">${post.id}</div>
   <div class="post-info">
     <h2 class="post-title">${post.title}</h2>
     <p class="post-body">${post.body}</p>  
   </div>
  </div>

   `
   postContainer.appendChild(postElement);

});
} 
//Show loader
 function  showLoader(){
   loader.classList.add('show'); 
   
   setTimeout(() => {
       loader.classList.remove('show');
    setTimeout(()=> {
    //Increment page  
      page++;
      showPosts();
 
    },300)
   
   
    },1000)
 
 } 
// Function to filter post from Fetched data
 function fiterPosts(e){
 const filterTerm = e.target.value.toUpperCase();
 const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
   const title = post.querySelector('.post-title').innerText.toUpperCase();
   const body = post.querySelector('.post-body').innerText.toUpperCase();
    if(title.indexOf(filterTerm) > -1 || body.indexOf(filterTerm) > -1){
      post.style.display = 'flex';
    } else {
        post.style.display = 'none';
    }

  }) 
} 
//Initializing the data in DOM
showPosts();
//Event Handlers
//1. Event Listner on scroll
window.addEventListener('scroll', ()=> {
    const {scrollTop,clientHeight,scrollHeight} = document.documentElement;
        
    if(Math.ceil(scrollTop + clientHeight) == scrollHeight ){

        showLoader();
      }
})
//2.Event Listner for filtering data from fetched data
filter.addEventListener('input', fiterPosts)