const addUser = document.getElementById('add-user');
const doubleMoney = document.getElementById('double-money');
const millionaries = document.getElementById('millionaries-only');
const richest = document.getElementById('sort-by-richest');
const totalWealth = document.getElementById('total-wealth');
const main = document.getElementById('main');
//Initializing the Array
let data = [];
//Initializing randomUser
 generateRandomUser();
 generateRandomUser();
 generateRandomUser(); 
//Fetch APi https://randomuser.me/api
 
async function generateRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();  
  const user = await data.results[0];
  const newUser = await user.name;
  const picture = await user.picture;
  addObject(newUser,picture);    
}
//Function to double Wealth
 function doubleWealth(){
     data = data.map( item => {
        return {...item, worth: item.worth*2}
     
     });
     updateDOM();
     
 }
 //onlyMillionaries function
  function onlyMillionaries(){
     data = data.filter( 
        item =>  item.worth > 1000000000
     );
     updateDOM();
  }
 //sortByRichest EventListner function
  function sortByRichest(){
      data.sort((a,b) => b.worth - a.worth);
      updateDOM();
  }
//Function to calculate TotalNetWorth
  function totalNetWealth(){
    const totalNetWealth =  data.reduce(
        (acc, item) =>    (acc += item.worth), 0 
     );
     const totalNetWealthElement = document.createElement('div');
     
     totalNetWealthElement.innerHTML = `<h3> <strong> Total:</strong> <strong>${numberToCurrency(totalNetWealth)} </strong> </h3>`;
     main.appendChild(totalNetWealthElement);
  }
// Function to get name and worth randomly from generateRandomUser
 function addObject(newUser, picture){
   const data = { 
      picture : `<img src="${picture.medium}">` ,
       name: `${newUser.first} ${newUser.last}`,
       worth: Math.round(Math.random()*10000000)  
    }
     dataInArray(data);
}
//Adding data to Array
 function dataInArray(parameter){ // parameter = data from addObject
    data.push(parameter);
    updateDOM();
}

//Function to update UI with DOM
 function updateDOM(inputData = data){
    main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>';
    inputData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `${item.picture} <strong>${item.name}</strong> <strong>${numberToCurrency(item.worth)}</strong>`;
          
        main.appendChild(element);        
    });
 } 
 // Function to convert number to currency
  function numberToCurrency(num) {
   return "$ " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
// AddEvents to the buttons
1.//AddUser on EventListner
addUser.addEventListener('click', generateRandomUser);
2.//DoubleWealth on EventListner
doubleMoney.addEventListener('click', doubleWealth);      
3.//Millionaries on EventListner
millionaries.addEventListener('click', onlyMillionaries);
4.//sortByRichest on EventListner
richest.addEventListener('click', sortByRichest);
5. // TotalWealth EventListner
totalWealth.addEventListener('click', totalNetWealth);