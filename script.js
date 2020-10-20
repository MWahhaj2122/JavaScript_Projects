const button = document.querySelectorAll('.btn');
const toggle = document.getElementById('toggle');
const returnToOrignal = document.querySelectorAll('.Return');
const arrayReturnToOrignal = [returnToOrignal];
const arrayBtn = [button];
const footer = document.querySelectorAll('.social-icon');
const arrayFooter = [footer];
//AddEventlistner to Activate the Button functions of divss

arrayBtn.forEach((input, index)  => {
    input[index].addEventListener('click', (e) => {
    
    } );    
})

toggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-class')
} );
//array to reurn Nav bar to its Orignal position

arrayReturnToOrignal.forEach((input,index) => {
    input[index].addEventListener('click' , index =>  {
      document.body.classList.remove('nav-class')   
    } ) 
} )

//To make Icons clickable
arrayFooter.forEach((input,index)  => {
input[index].addEventListener('click', (e) => {

})

})