document.addEventListener('DOMContentLoaded',()=>{

const ImageArray = [
                {
                  name:'Bottle',
                  src: 'image/Bottle.jpg'  
                },
                {
                    name:'Bottle',
                    src: 'image/Bottle.jpg'  
                  },
                  {
                    name:'Burger',
                    src: 'image/burger.jpg'  
                  },
                  {
                    name:'Burger',
                    src: 'image/burger.jpg'  
                  },
                  {
                    name:'Fries',
                    src: 'image/fries.jpg'  
                  },
                  {
                    name:'Fries',
                    src: 'image/fries.jpg'  
                  },
                  {
                    name:'Ice-Cream',
                    src: 'image/ice-cream.jpeg'  
                  },
                  {
                    name:'Ice-Cream',
                    src: 'image/ice-cream.jpeg'  
                  },
                  {
                    name:'Pizza',
                    src: 'image/pizza.jpg'  
                  },
                  {
                    name:'Pizza',
                    src: 'image/pizza.jpg'  
                  },
                  {
                    name:'Shawarma',
                    src: 'image/shawarma.jpg'  
                  },
                  {
                    name:'Shawarma',
                    src: 'image/shawarma.jpg'  
                  },
];
let choosenCardID = [];
let choosenCards = [];
let cardsWon = [];
const grid = document.getElementById('grid');
ImageArray.sort(()=> .5 - Math.random());
//DOMElements
const gridContainer = document.querySelector('.grid');
const score = document.querySelector('span');
let result = 0;
//Function to craete Box
function createBox() {
    

ImageArray.forEach((element,index) => {
    //Destructuring Not Used
    const {name,src} = element;
   //Creating separate image for each element presesnt in An array 
    const cardDiv = document.createElement('img');
   //Adding class
   cardDiv.classList.add('imageDiv'); 
   //Setting source for each image
    cardDiv.setAttribute('src', 'image/question-mark.png');
   //Using HTML5 custom property to set its index
    cardDiv.setAttribute('data-index', index);
   //Setting name 
    cardDiv.setAttribute('name', name); 
    //Appending cardDiv
    gridContainer.appendChild(cardDiv);
    //EventListner on Clicking Imagediv
    cardDiv.addEventListener('click',flipCard)

});
}
//Functions
//1.Flip Card 
 function flipCard() {
   if(!(this.name == '')){     
   //Getting ID of clicking div which i have set in ImageDiv  
   const cardID = +this.getAttribute('data-index');
   //Random cardID 
//    const randomCardID = Math.floor(Math.random()*ImageArray.length); 
//    console.log(randomCardID);
   //Getting NAme of clicking div which i have set above
   const cardName = this.getAttribute('name');
   //Getting src from ImageArray according to ID of clicking Div
   const cardSrc = ImageArray[cardID].src;
    // const randomCardSrc = ImageArray[randomCardID].src;   
//Pushing ID to Array
   choosenCardID.push(cardID);
    //  choosenCardID.push(randomCardID);  
//Pushing name to Array
     choosenCards.push(cardName);
    //   choosenCards.push(ImageArray[randomCardID].name);   
console.log(choosenCardID);
   //Setting Src of clicking div according to cardSrc 
   this.setAttribute('src', cardSrc);
   //If Length of Array is 2 we check for a match
   if (choosenCardID.length === 2) {
      setTimeout(checkMatch,500); 

    } 
}    
 }
//2.
  function checkMatch() {
     //Getting All images in the DOM 
      const allCards = document.querySelectorAll('img');
     //Getting Names from Array so that we compare it to get a match 
      
      const optionOne = choosenCards[0];
      const optionTwo = choosenCards[1];
      
     //If both idexes have same nameValue 
      if(optionOne === optionTwo){
         alert("You found a match");
        //Assigning Blank image when we found a match 
         allCards[choosenCardID[0]].setAttribute('src', 'image/blank11.png');
         allCards[choosenCardID[1]].setAttribute('src', 'image/blank11.png'); 
        //Assigning null value to name for perssiting of clicking the blank page
        allCards[choosenCardID[0]].setAttribute('name', '');
         allCards[choosenCardID[1]].setAttribute('name', '');
        //Incrementing score 
         result++;
         score.innerText = result;          
         //pushing value 
         cardsWon.push(111);
         if(cardsWon.length === ImageArray.length/2){
            alert("Game Over");
      // grid.innerHTML = `
      // <h2>Game Over</h2> 
      
      // <button class= "btn" onclick= "location.reload()">Play Again</button>
      // `   
     } 
            
        }else {
          alert('Match donot fouund');  
          allCards[choosenCardID[0]].setAttribute('src', 'image/question-mark.png');
          allCards[choosenCardID[1]].setAttribute('src', 'image/question-mark.png'); 
       
        }
        //Empting Arrays 
        choosenCardID = [];
        choosenCards = [];

  }

//Initializing
createBox();
});
