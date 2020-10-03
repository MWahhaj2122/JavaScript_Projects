const currOnePicker = document.getElementById('currency-one');
const currTwoPicker = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const flipButton = document.getElementById('flip');
const rate = document.getElementById('rate');
const resetButton = document.getElementById('reset');
// Function to fetch API from 3rd Party Api and then update DOM
// getting data from 
function calculate() {
     const currOneCode = currOnePicker.value;
     const currTwoCode = currTwoPicker.value;
     //Fetch data from https://app.exchangerate-api.com 
     fetch(`https://v6.exchangerate-api.com/v6/8da0d35bd4f7c2a59ed2d527/latest/${currOneCode}`)
     .then( res => res.json())
     .then(data => {
         //Getting Exchange Rate from data 
        const exchangeRate = data.conversion_rates[`${currTwoCode}`];
        // Displaying Exchange rate on Rate Div
        rate.innerText = `1 ${currOneCode} = ${exchangeRate} ${currTwoCode}`; 
        // Updating CurrTwoAmount with ExchangeRate
        currTwoAmount.value = (exchangeRate*currOneAmount.value).toFixed(2);
    }         
        )
 }
 // Function on flip Button to flip the currOnePicker to currTwoPicker
  function flip(){
      const temp = currOnePicker.value;
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = temp;
    // To update amount when we click on flip
    calculate();
    /* 
     Dry_run this.. 
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = currOnePicker.value;
    */
  }
 
 //Events
 currOnePicker.addEventListener('change', calculate);
 currTwoPicker.addEventListener('change', calculate);
 currOneAmount.addEventListener('input', calculate);
 currTwoAmount.addEventListener('input', calculate);
 flipButton.addEventListener('click', flip);
 calculate();