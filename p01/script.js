const form =  document.getElementById('form');
const username =  document.getElementById('Username');
const email =  document.getElementById('Email');
const password =  document.getElementById('Password');
const password1 =  document.getElementById('Password1');
//All Functions

//Show Error Message Function
function showError(input,message) {
    const formControl = input.parentElement; // Used to access Parent Element as we are passing username as input only parent of username is accessed 
    formControl.className = 'form-control error';// We are assigning both error and form-control class to formControl
    const small = formControl.querySelector('small');// Select small element from FormControl
    small.innerText = message; // OverWrite  the text of small to message.
}
//Show Success Message Function
function showSuccess(input) {
    const formControl = input.parentElement; 
    formControl.className = 'form-control success';
}
// email Valiadation Function
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//function to get id of input in a proper way 
function toGetId(input) {
    return input.id.charAt(0) +input.id.slice(1)
    
}

//function to check the field has data in it or not.
 function checkRequired(Array) {
     Array.forEach(function(input)
     {
         if(input.value === ''){
             showError(input, `${toGetId(input)} is required`)
         }
         else{
             showSuccess(input);
         }
     }
     )
 }
//Array Declaration
array = [Username,Email,Password,Password1];

//Event Listener for the form on submit
 form.addEventListener('submit',function(e){
 e.preventDefault();
 checkRequired(array);


})