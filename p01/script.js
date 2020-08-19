const form =  document.getElementById('form');
const username =  document.getElementById('Username');
const email =  document.getElementById('Email');
const password =  document.getElementById('Password');
const password1 =  document.getElementById('Password1');
const body = document.getElementById('body1');
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
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    }
    

}
//function to check password is equal to confirmPassword
function checkPassword(input1,input2) {
    if(input1.value !== input2.value)
    {
        showError(input2,"Password don't match")
    }
    else  {
        showSuccess(input);
        }
    
} 
//function to get id of input in a proper way 
function toGetId(input) {
    return input.id.charAt(0) + input.id.slice(1)
    
}
//function to check length of the input fields
function checkLength(input,min,max) {
    if (input.value.length < 3) {
        showError(input,`${toGetId(input)} must have atleast ${min} characters`);    
    }
    else if (input.value.length > 10) {
        showError(input, `${toGetId(input)} must have less than ${max} characters`);
        
    }
     else {
        showSuccess(input);    
    }
    
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

//function to change backgroundcolor
function changeBackgroundColor(body1) {
  body1.className = 'body1 changeColor'      
}
//Event Listener for the form on submit
 form.addEventListener('submit',function(e){
 e.preventDefault();
 changeBackgroundColor(body1);
 checkRequired(array);
 checkLength(Username,3,10);
 checkLength(Password,8,30);
 checkEmail(Email);
 checkPassword(Password,Password1);

})