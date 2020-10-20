const search = document.getElementById('search');
const submit = document.getElementById('form');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
let mealContainer = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');
const SearchBtn = document.querySelector('.searchBtn');
const mealss = document.querySelectorAll('.meal');
 
function searchMeal(e) {
     e.preventDefault();
     //Removing Selected Meal when user enter new meal
     selectedMeal.innerHTML = '';
     //
    resultHeading.style.display = 'flex';
    mealContainer.style.display = 'grid';
     //Getting Input value
    const term = search.value;
    if(term.trim()){
       fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
       .then(res =>  res.json()
       .then(data => {
           console.log(data)               
         resultHeading.innerHTML = `
         <h2> Resulting Search for "${term}"</h2>
         `
         if(data.meals == null){
           resultHeading.innerHTML = `
           <p>There are no search result for '${term}' Please try another one</p>
           `  
         }else {
           mealContainer.innerHTML = data.meals.map( meal => 
             `
             <a href = "#selected-meal">
             <div class = "meal"> 
               <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}"\>
                <div class = "meal-info" data-mealID = "${meal.idMeal}">
                  <h4> ${meal.strMeal}</h4> 
                 </div>
               </div>
              </a>  
             ` 
            )
            .join(''); 
           
         }
}
       )
       ) 
    }else{
      alert('Please enter valid search');  
    }    
    //clear search item
    search.value = '';
 }
//function to get mealID from API
function getMealID(mealID){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then(res => res.json())
  .then(data => {
      const meal = data.meals[0];
      updateDOM(meal);
  } )
}
//Function to update DOM 
 function updateDOM(meal) {
     const ingrediants = [];
     for (let i =1; i<=20; i++){
       if(meal[`strIngredient${i}`]){
         ingrediants.push(`${meal[`strIngredient${i}`]} -  ${meal[`strMeasure${i}`]}`)
       }else {
         break;  
       }  
     };
   
    selectedMeal.innerHTML = `
      <div class = "selected-meal" id = "selected-meal">
      <h1>${meal.strMeal}</h1>
      <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}" />
       <div class = "selected-meal-info">
        The Food is:  ${meal.strCategory ? `${meal.strCategory}` : ''} <br /> 
         It's categorey is:  ${meal.strArea ? `${meal.strArea}` : ''}
         </div>
         <div class ="main">
          <h2>Ingrediants</h2>
          <ul>
          ${ingrediants.map(ingrediant => `<li>${ingrediant}</li>`).join('')}
          </ul>
          <h2>Instructions</h2>
          <p> ${meal.strInstructions}</p>
         </div>
      </div>
    `



 }






//Event Listner
//1.Submit Form
submit.addEventListener('submit', searchMeal);
//2. When clicking on selected meal
mealContainer.addEventListener('click', e => {
   const mealInfo = e.path.find( item => {   
    if(item.classList){
        return item; 
       }else {
         return false;  
       }
   });
   if(mealInfo){
    const mealID = mealInfo.getAttribute('data-mealid');
     getMealID(mealID);
    }

})
//3. EventListner for RandomButton
random.addEventListener('click', e => {
    resultHeading.style.display = "none";
    mealContainer.style.display = "none";
   fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
   .then(res => res.json(''))
   .then(data => {
    
      const meal = data.meals[0];
      updateDOM(meal);
    
   }
    ) 
})
/*
 function updateDOM(meal){
  const array = [];
  for(let i = 1; i<=20 ; i++){
    if(meal[`strIngrediant${i}`]){
     array.push(`${meal[`strIngrediant${i}`]} - ${meal[`strMeasure${i}`]}`)
    }else{
      return false;
    }
  }
selectedMeal.innerHtml = `
        <div class= "selected-meal">
        <h2> ${meal.strMeal}</h2>
        <img src = "${meal.strMealThumb}" alt ="${meal.strMeal}">
        <div class = "meal-info">
         ${meal.strCategory ? `${meal.strCategory}` : ""}
         ${meal.strArea ? `${meal.strArea}` : ""}    
        </div>
        <div class ="main">
         <h4>Ingrediants </h4>
          array.map(ingrediant => ingrediant).join('');
          </div>
          <h4> Instructions</h4>
           <p>${meal.strInstruction}</p>
       </div>


`



 }



*/

