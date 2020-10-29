const moneyPlus = document.getElementById('moneyPlus');
const moneyMinus = document.getElementById('moneyMinus');
const form = document.getElementById('form');
const list = document.getElementById('list');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
let balance = document.getElementById('balance');
//Dummy Transactons
const dummyTransactions = [
            
];

 // Assigning 
 let transactions = dummyTransactions; 
 //Function when user add new transaction it adds to add Transaction
 function addTransaction(e) {
      e.preventDefault();
    //Condition for not submit form when description or Transaction amount is empty     
    if(description.value.trim() == '' || amount.value.trim() == ''){
           alert("Please enter valid description or amount");
    }else {
      const transaction = 
      {
        id: randomGenerator(),
        description: description.value,
        amount: +amount.value // It is a String so we convert it to a number
      }
    //Pushing Transaction to the transactions
    transactions.push(transaction);
   //Updating UI of Transaction Hstory 
   addTransactionUI(transaction);   
   //Updating Income Expense and Balance
    init();
   //Clear the values of description and amount of form  
   description.value = '';
   amount.value = '';
 //Storing values in local Storage
 //  //Local Storage check
//  localStorage.setItem('Array', JSON.stringify(dummyTransactions[0]));
//If Transactions has some value then store values to local Storage
if(transactions){
   const array =  transactions.map((transaction, index) => transaction );    
     localStorage.setItem("Object", JSON.stringify(array));
}

}

}
//Function to populateUI with local Storage
  function populateUI() { 
               
  const Object = JSON.parse(localStorage.getItem("Object"));
     if(Object != ''){ 
      transactions = Object;                         
      init();
}

} 

// populateUI();

//Function to generate Random Id 
 function randomGenerator(){
    return Math.floor(Math.random()*1000000000);
 }

 //Function to add Transaction in Transaction History
function addTransactionUI(transaction) {
  // Check whether amount is income or epense and store sign in type
  const type = transaction.amount > 0 ? '+' : '-';
  // Create DOM element <li> </li>
  const item = document.createElement('li');
  //Add class to item(list item) depending upon type of transcation whether it is income or expense
  item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');
  // Updating innerHtml of <li> </li> 
  item.innerHTML = `
              ${transaction.description}
              <span>${type}${Math.abs(transaction.amount)}</span>
              <button class = "deleteBtn" onclick="deleteTransaction(${transaction.id})">X</button> 
              `
 // Adding <li> </li> in <ul> </ul>
 list.appendChild(item);
}
//Function to add Balance Income And Expense
  function sumUI() {
   //Getting Amounts of all Transactions and storing it in new Array called amounts      
   const amounts = transactions.map(transaction => transaction.amount); 
   // Calculating total Balance
         
     const total = amounts
                 .reduce((acc,amount) => (acc += amount),0) //Accumulated Result
                 .toFixed(2);    
    // Calculating Income
     const income = amounts
                    .filter(amount => amount > 0)  
                    .reduce((acc,amount) => (acc+=amount),0) // .filter() returns an Array so we use .reduce to convert it to the number 
                    .toFixed(2);
    // Calculating Expense                 
     const expense = amounts
                    .filter(amount => amount < 0)  
                    .reduce((acc,amount) => (acc+=amount),0) // .filter() returns an Array so we use .reduce to convert it to the number 
                    .toFixed(2); 
     //Updating Balance UI using Total balance
     balance.innerText = `${total} PKR`; 
     //Updating Income UI using Income
     moneyPlus.innerText = `${income} PKR`;
     //Updating Income UI using Income
     moneyMinus.innerText = `${expense} PKR`; 
                }
                
      


// Initializing Function when page load
 function init() {
     // Clearing list items when user first appear on app    
     list.innerHTML = '';
     //For every item of Transactions array function is calling
    transactions.forEach(addTransactionUI);     
    sumUI(); 
}
// Function to delete Transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id != id);   
   init();
}

 //Function Calling
  init();
//Event Listner on Form Submit
form.addEventListener('submit', addTransaction);   
//Update UI with local Storage when user reload the page. 
 const ObjectUI = JSON.parse(localStorage.getItem("Object"));
  if(ObjectUI){
     window.onload = populateUI()
} 

