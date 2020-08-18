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
     else if(!isValidEmail(email.value)) // if email.value is true we donot want to execute this condition so, we use NOT(!),if email.value is false this statement becomes true and execute error block 
     {
      showError(email,'Email is not correct') 
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
