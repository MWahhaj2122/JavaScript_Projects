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
    const small = formControl.querySelector('small');
    small.innerText = message; 
}
//Show Success Message Function
function showSuccess(input) {
    const formControl = input.parentElement; 
    formControl.className = 'form-control success';
}

//Event Listener for the form on submit
form.addEventListener('submit',function(e){
e.preventDefault();
     if(username.value === '')
     {
      showError(username,'Username is Invalid')
     }
     else{
       showSuccess(username);
     }
   if(email.value === '')
     {
      showError(email,'Email  is Invalid')
     }
     else{
         showSuccess(email);
     }
     if(password.value === '')
     {
      showError(password,'Password is Invalid')
     }
     else{
         showSuccess(password);
     }
     if(password1.value === '')
     {
      showError(password1,'Password donot match')
     }
     else{
         showSuccess(password1);
     }
})
