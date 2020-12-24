const passwordEl = document.getElementById('password');
const numberEl = document.getElementById('number');
const lowerEl = document.getElementById('lower');
const upperEl = document.getElementById('upper');
const symbolEl = document.getElementById('symbol');
const lettersEl = document.getElementById('letters');
const generatePasswordBtn = document.getElementById('generatePassword');
const length = document.getElementById('length');
const passwordText = document.getElementById('passwordText');
const copyBtn = document.getElementById('copy');

const specialLetters = "~!@#$%^&*()+";
const numbers = "123456789";
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
//AllFunction
//1.Function to get Random word form special Letters
function generateSpecialLetters() {
    return specialLetters[Math.floor(Math.random() * specialLetters.length)];
}
//1.Function to get Random word form special Letters
function generateNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}
//1.Function to get Random word form special Letters
function generateupperLetter() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
//1.Function to get Random word form special Letters
function generatelowerLetter() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
//Generate Password
function generatePassword() {
    const passwordLength = length.value;
    let password = '';
    for(let i =0; i<passwordLength; i++){
       const x = generateX(); 
      password += x;
    }

    passwordText.innerText = password;
};
///
 function generateX() {
    const array = [] 
    if(upperEl.checked){
      array.push(upperLetters[Math.floor(Math.random()* upperLetters.length)]);  
    } 
    if(lowerEl.checked){
        array.push(lowerLetters[Math.floor(Math.random()* lowerLetters.length)]);  
      }
    if(symbolEl.checked){
        array.push(specialLetters[Math.floor(Math.random()* specialLetters.length)]);  
      }
    if(lettersEl.checked){
        array.push(numbers[Math.floor(Math.random()* numbers.length)]);  
      } 
//
   return array[Math.floor(Math.random()* array.length)];
 };
// 
// function copyToClipboard(text) {
//     if (window.clipboardData) { // Internet Explorer
//         window.clipboardData.setData("Text", text);
//        console.log(text);
//     } else {  
//         unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
//         const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);  
//         clipboardHelper.copyString(text);
//     }
// }

//Add Event Listner
//1.
generatePasswordBtn.addEventListener('click',()=> {
    if(upperEl.checked || lowerEl.checked || symbolEl.checked || lettersEl.checked){
        generatePassword();
    }else {
        alert("Please select any option");    }
}); 
//2.To Copy the text
    copyBtn.addEventListener("click", () => {
        const textarea = document.createElement("textarea");
        const password = passwordText.innerText;
    
        if (!password) {
            return;
        }
    
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        alert("Password copied to clipboard");
    });
//2.

