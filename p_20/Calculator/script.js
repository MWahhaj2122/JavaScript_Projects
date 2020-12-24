//Getting DOM elements
const calculationScreen = document.getElementById('calculation');
const resultScreen = document.getElementById('screen');
let buttons = document.querySelectorAll('button');
let searchValue = '';
//  for(item of buttons){
     
//  }
//converting node list to An array
let array = Array.prototype.slice.call(buttons);
//We apply forEach loop so that we get all the buttons 
array.forEach(item => {
//When user click on the calculator buttons we get text of butttons
    item.addEventListener('click', (e)=> {
      let buttonText = e.target.innerText;
//If user press Multiply button, we convert this to * because in calculation we need * for multiplication 
      if (buttonText == "x") {
          buttonText = "*";
     //We add * to search value as both are strings     
          searchValue += buttonText;
     //we show after adding * to the screen     
          calculationScreen.value = searchValue;     
      }
  //If user clicks on the clear option last string value is remove    
      else if(buttonText == "cl"){
        searchValue = searchValue.slice(0,-1);
        calculationScreen.value = searchValue;
      }
  //If user clicks on AC all the values is removed from screen    
      else if (buttonText == "AC"){
          searchValue = "";
          resultScreen.value = searchValue;
          calculationScreen.value = searchValue;
     
      }
  //If user clicks on the % the value is divided by 100    
      else if(buttonText == "%"){
            calculationScreen.value += "%";
            resultScreen.value = searchValue/100;         
            searchValue = searchValue/100;
                
        //   buttonText = "/";
        //   searchValue += buttonText;
        // console.log(searchValue);  

    //    resultScreen.value =  eval(searchValue);
    //    searchValue = "";
    //    calculationScreen.value = searchValue;
           
   } 
 //If user clicks on the =  
      else if(buttonText == "="){
          
//        if ((searchValue.indexOf("%") !== -1)) {
//         searchValue = searchValue.replace("%","*");
//         resultScreen.value =  eval(searchValue);
//         searchValue = "";
//         calculationScreen.value = searchValue;              
// }
        
//If search value has some value we evaluate the user value and display on the screen

         if (searchValue) {             
        resultScreen.value =  eval(searchValue);
        // searchValue = "";
        calculationScreen.value = searchValue;
        
         }   
    }
//If user not clicks on the above all options then add button innertext values string to string and show on screen    
      else {
        searchValue +=   buttonText;
        calculationScreen.value = searchValue;
           
      }  
    });
   
});