const currOneAmount = document.getElementById('amount-one');
const currTwoPicker = document.getElementById('currency-two');
const currTwoAmount = document.getElementById('amount-two');
const reset = document.getElementById('reset');
const rate = document.getElementById('rate');
//Functions 
 function calculate(){
     const currTwoCode = currTwoPicker.value;
     fetch(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${currTwoCode}`)
     .then(res => res.json())
     .then(data => {
       //Updating Exchange Rate
        const exchangeRate = data[currTwoCode];
       //Updating Rate Div
       rate.innerText = `1 Bitcoin = ${exchangeRate} ${currTwoCode}`;
       //To Update Input
       currTwoAmount.value = (exchangeRate*currOneAmount.value).toFixed(2);
         
     })
 }
 function Reset(){
  return   location.reload();
 }



//Events
currOneAmount.addEventListener('input', calculate);
currTwoPicker.addEventListener('change', calculate);
currTwoAmount.addEventListener('input' , calculate);
reset.addEventListener('click', Reset);
calculate();