const inputText = document.getElementById("inputText");
const submitBtn = document.getElementById("submitBtn");
const notesDiv = document.getElementById("notes");
const filter = document.getElementById("filter");
let array = [];
//Checking whether InputText has a value or not

    submitBtn.addEventListener("click", ()=> {
       const inputText1 = inputText.value;
       if(inputText1){
          const box = document.createElement('div');
          //Adding class to this
          box.classList.add('added-notes');
          //Adding innerHTML to the box
          box.innerHTML = `
          <h5 class = "title">Card Title </h5>
          <p class = "body">${inputText1}</p>
          <button class = "delete-btn">Delete</button>
          
          `;
        //When user clicks on delete Btn we delete the box div  
         box.lastElementChild.addEventListener("click", (index)=> {
          
          box.remove();
             
         });
        console.log(box); 
       notesDiv.appendChild(box);
       array.push(inputText1);
       const Object = array.map(text => text);
       localStorage.setItem("Object", JSON.stringify(Object));
       
       inputText.value = "";   
       }
       
    });

    
    
  //Local Storage Work BIruh
  // if(array){
  //   array.forEach(element => {
      
  //   });
  window.onload = LocalStorage111();
  function LocalStorage111() {
    
    const ali = JSON.parse(localStorage.getItem("Object"));
    if(ali){
      array = JSON.parse(localStorage.getItem("Object"));   
   ali.forEach(element => {
    
    const box = document.createElement('div');
    //Adding class to this
    box.classList.add('added-notes');
    //Adding innerHTML to the box
    box.innerHTML = `
    <h5 class = "title">Card Title </h5>
    <p class = "body">${element}</p>
    <button class = "delete-btn">Delete</button>
    
    `;
  //When user clicks on delete Btn we delete the box div  
   box.lastElementChild.addEventListener("click", ()=> {
     box.remove(); 
      
   });
 notesDiv.appendChild(box);     
   }); 
  }

  }
 //Function
  function filterPosts(e) {
    if(notesDiv){
    const filterTerm = e.target.value.toUpperCase();
    const posts = document.querySelectorAll(".added-notes");
     
    posts.forEach(post => {
     
      const body = post.querySelector(".body").innerText.toUpperCase();
      if(body.indexOf(filterTerm) > -1 ){
        post.style.display = "inline-block";
        // post.style.flex-direction = "column";

      }else{
        post.style.display = "none";

      }
     });
    }else {
      return;
    }
  } 
 filter.addEventListener("input",filterPosts); 