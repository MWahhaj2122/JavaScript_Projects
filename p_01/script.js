const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const ConfirmPassword = document.getElementById('ConfirmPassword');
//All Functions
//Function to show Error on input fields
function showError(input,message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
     small.innerText = message;
}
//function to show Success
 function showSuccess(input) {
     const formControl = input.parentElement;
     formControl.className = 'form-control success';
 }
 //Function to check Email validiation
 function isvalidEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(re.test(input.value.trim()) === true){
         showSuccess(input);
     }
     else {
         showError(input, `${giveInputId(input.id)} is invalid`);
     }
}
//Function to check the required field empty or not
function checkRequired(inputArray) {
  inputArray.forEach(input => {
      if(input.value === ''){
          showError(input, `${giveInputId(input.id)} is required`)
      }
      else {
          showSuccess(input);
      }
  });    
}
//Function to give ID's input
function giveInputId(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}
//Function to check length 
 function checkLength(input,min,max) {
     if(input.value.length < min){
         showError(input, `${giveInputId(input.id)}  must have greater than ${min}`);
     }
     else if(input.value.length > max){
        showError(input, `${giveInputId(input.id)}  must have less than ${max}`);
     }
     else{
         showSuccess(input);
     }
 }
 //Function to check password and confirmPassword are equal
 function checkPasswordMatch(input1,input2) {
     if(input1.value != input2.value){
         showError(input2,`Password don't match`)
     } 
       
 } 

// Function of AddEvent Listener on Submit;
form.addEventListener('submit', function(e){
    e.preventDefault();
   checkRequired([username,email,password,ConfirmPassword]);
   checkLength(username,3,15);
   checkLength(password,6,15);
   isvalidEmail(email);
   checkPasswordMatch(password,ConfirmPassword);
}
)