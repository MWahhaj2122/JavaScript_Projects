const toggle = document.getElementById('toggle');
const apply = document.getElementById('apply');
const closeBtn = document.getElementById('close');
const modalContainer = document.getElementById('modalContainer');
const modal = document.getElementById('modal');
//EventListners
//EventListner for nav
toggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-class')
} );

//EventListner to open the window on Apply
apply.addEventListener('click', () => {
    modalContainer.classList.add('open-Window')
});
//EventListner to close the window
closeBtn.addEventListener('click', () => {
    modalContainer.classList.remove('open-Window')
});
//EventListner when we click on the modalContainer then windowOpen dissappears
window.addEventListener('click', (e) => {
    e.target === modalContainer ? modalContainer.classList.remove('open-Window') : false
})  
