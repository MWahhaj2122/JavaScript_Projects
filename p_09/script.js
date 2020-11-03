const currency = document.getElementById('currency');
const balance = document.getElementById('balance');
const income1 = document.getElementById('income');
const expense1 = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const incomeBtn = document.getElementById('incomeBtn');
const expenseBtn = document.getElementById('expenseBtn');
const addTransactionOverlay = document.getElementById('overlay');
const addTransactionBtn = document.getElementById('add-transactionBtn');
const closeBtn = document.getElementById('closeBtn');
const deleteBtn = document.getElementById('deleteBtn');
const totalBalancePercentage1 = document.getElementById('totalBalancePercentage');
const totalExpensePercentage1 = document.getElementById('totalExpensePercentage');
const formSettings = document.getElementById('formSettings');
//dummy Transactions
const dummyTransactions = [];
let transactions = dummyTransactions;
//Generate Random ID function
 function generateRandomID() {
     return Math.floor(Math.random()*100000000);
 }
 function addTransactionsUI(transaction) {
    
    //finding Type of amount 
    const type = transaction.amount > 0 ? '+' : '-';
    //Creating list item
    const item = document.createElement('li');
    //
    item.innerHTML = `
             ${transaction.description}
             <span>${currency.value} ${(transaction.amount)}</span>
             <button class = "deleteBtn" onclick = "deleteTransaction(${transaction.id},${transaction.amount})">X</button>
             `
     
     item.classList.add( transaction.amount > 0 ? "moneyPlus" : "moneyMinus"); 
    //Appending Child
     list.appendChild(item);
 }
 function addTransaction(e) {
     e.preventDefault();
     //Getting total Amount
    const amounts = transactions.map(transaction => transaction.amount);
     
    //Getting Balance
       const total = amounts 
                       .reduce((acc,amount) => (acc+=amount),0)    
                       .toFixed(2);
  
    if( description.value == '' || amount.value == ''){
         alert("Please enter valid description or amount")
        }

    
     else {
      const transaction = {
                  id: generateRandomID(),
                  description: description.value,     
                  amount: +amount.value
      }
   //Radio Buttons   
    if(incomeBtn.checked){
         transaction.amount = +amount.value;
    } else if(expenseBtn.checked){
        transaction.amount = -amount.value;
    // Condition which doesnot allow user to remove last income value unless he removes expense first    
       if(transaction.amount < -total ){
          alert('You donot have enough balance');
          return false; 
       }    
    } 
    
     transactions.push(transaction);           
     init();
     sumUI();
     //Local Storage
     if(transaction){
        localStorage.setItem("Object",JSON.stringify(transactions.map(transaction => transaction))); 
     }
     addTransactionOverlay.style.display = 'none';
     description.value = '';
     amount.value = '';
     expenseBtn.checked = false;
    }

 }
 //sumUI 
  function sumUI() {
  //Getting total Amount
    const amounts = transactions.map(transaction => transaction.amount);
     
  //Getting Balance
     const total = amounts 
                     .reduce((acc,amount) => (acc+=amount),0)    
                     .toFixed(2);
  //Getting Income
     const income = amounts
                      .filter(amount => amount > 0)         
                      .reduce((acc,amount) => (acc+=amount),0)
                      .toFixed(2);
      const expense = amounts
                      .filter(amount => amount < 0)         
                      .reduce((acc,amount) => (acc+=amount),0)
                      .toFixed(2);
    //Total Balance Percentage                  
    //  const  difference = (total - expense) / total;
     const totalBalancePercentage = 100 - ((Math.abs(expense)/income).toFixed(2)* 100);
    
    // Total Expense Percentage
     const  totalExpensePercentage = 100 - totalBalancePercentage;                                  
   //Updating Balance  
     balance.innerText = `${currency.value} ${total}`
    //Updating Income
    income1.innerText = `${currency.value} ${income}`  
     //Upading Expense
     expense1.innerText = `${currency.value} ${(expense)}` 
      
     // Updating Percentage Balance
     if(total == 0.00){
        totalBalancePercentage1.innerHTML = `
        <h4>0%</h4>
`
    // Updating Percentage Expense
        totalExpensePercentage1.innerHTML = `
        <h4>0%</h4>
`
     }else {
     totalBalancePercentage1.innerHTML = `
                      <h4>${totalBalancePercentage}%</h4>
     `
     // Updating Percentage Expense
     totalExpensePercentage1.innerHTML = `
                      <h4>${totalExpensePercentage}%</h4>
     `
     } 
    }
//DeleteTransaction
  function deleteTransaction(id,Amount) {
   //Getting total Amount
   const amounts = transactions.map(transaction => transaction.amount);
     
   //Getting Balance
      const total = amounts 
                      .reduce((acc,amount) => (acc+=amount),0)    
                      .toFixed(2);

      
            if(Amount > total){
               alert("Please remove some of your expense first");
               return false;}
            else {
                transactions = transactions.filter(transaction => 
                    transaction.id != id         
                )    
            }     
           
      init();
    
    }
//Function to add Local Storage
 function populateUI(){
    const Object = JSON.parse(localStorage.getItem("Object"));     
    // const localStorageCurrency = localStorage.getItem("currency");
    if(Object != ''){
     transactions = Object;
     init(); 
  }
   
      //currency.value = localStorageCurrency ? localStorageCurrency : "PKR";
      //init();    
    }

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionsUI);
    sumUI();
}
//Function Calling
init();
sumUI(); 
//Add Transaction from form
form.addEventListener('submit', addTransaction)
//Adding Form on Button
addTransactionBtn.addEventListener('click', () => {
    addTransactionOverlay.style.display = 'flex';  
})
     //Close Button of Form
     closeBtn.addEventListener('click', ()=> {
         
        alert("Are you sure you want to close add Transaction!!")      
        addTransactionOverlay.style.display = 'none';
        
    })
   
   //Currency Add Event Listner
//  currency.addEventListener('change', (e)=> { 
//       init();
//      localStorage.setItem("currency", JSON.stringify(currency.value));
// });
    
//UpdateUI when user reload the page
const ObjectUI = JSON.parse(localStorage.getItem("Object"));
if(ObjectUI){
    window.onload = populateUI;
}
//Updating the value on the basis of Local storage
  currency.value = localStorage.getItem('currency') !== null ? localStorage.getItem('currency') : 'PKR';   
//When Reload the page we got exact same currency Value. 
  sumUI();
     
  formSettings.addEventListener('change', (e)=> {
     
    const currencyValue = e.target.value;
    localStorage.setItem('currency',currencyValue);
    
    sumUI();
    });

