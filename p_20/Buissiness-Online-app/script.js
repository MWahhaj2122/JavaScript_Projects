// const inputFile = document.querySelectorAll('.inputFile');
// let array = Array.prototype.slice.call(inputFile);
// console.log(array);
// const imageContainer = document.getElementsByClassName('imageContainer');
const image1 = document.querySelectorAll('.image');
const arrayImage1 = Array.prototype.slice.call(image1);
const main = document.getElementById('main');
const array1233 = [
                 {
                   imagess: "images/add-images.jpg", 
                   id: 0
                  },
                 {
                  imagess: "images/add-images.jpg",
                  id: 1 
                },
                {
                  imagess: "images/add-images.jpg",
                  id: 2 
                },
                {
                  imagess: "images/add-images.jpg",
                  id: 3 
                },
                {
                  imagess: "images/add-images.jpg",
                  id: 4 
                },
                {
                  imagess: "images/add-images.jpg",
                  id: 5 
                },
                {
                  imagess: "images/add-images.jpg",
                  id: 6 
                },
                {
                  imagess: "images/add-images.jpg",
                  id: 7 
                },
                {
                  imagess: "images/add-images.jpg",
                  id: 8 
                }
];
let divIndexOnClicking = 0;
array1233.forEach(image => {
   //Destructuring
   const {imagess , id} = image;
   const box = document.createElement('div');
   //Adding Class
   box.classList.add('div');
   box.id = id;
   box.innerHTML = `
   <div class="imageContainer" >
          <img src= ${imagess} alt="image" class="image">
          <div class="text">
            <span class="name1" id="name1"> Wahhaj </span>
            <span class="price1" id="price1">RS: 123</span>
   
          </div> 
        
         </div>        
   
   `;

   main.appendChild(box);
   
   //If clicked div doesnot have image 
   //  console.log(box.querySelector('.image').alt == "image1");
   box.addEventListener('click', ()=> {
      if (box.querySelector('.image').alt == "image") {
       
      


      productsAddDiv.classList.add('show');
      // console.log(box.firstElementChild.firstElementChild);
      getImage(box.querySelector('.image'));
      divIndexOnClicking = box.id;    
      }else {
       let productPrice11 = box.querySelector('.price1');
       let productName11 = box.querySelector('.name1');
       addTranscation(productPrice11.id, productName11.id);  
       init();
      }
});
  
});
// <div class="div">
//      <!-- <input type="file" class="inputFile" id="inputFile1"> -->
//      <div class="imageContainer" >
//        <img src="images/plus-sign.png" alt="image" class="image" id="image0">
//        <div class="text">
//          <span class="name1" id="name1"> Wahhaj </span>
//          <span class="price1" id="price1">RS: 123</span>

//        </div> 
     
//       </div>
     
   
//    </div>




// const defaultText = document.querySelectorAll('.default--text');
// let arrayDefaultText = Array.prototype.slice.call(defaultText);
const image = document.getElementById('image');
const inputFile = document.getElementById('inputFile');
const addImagesContainer = document.getElementById('add-images-container');  
const defaultText = document.getElementById('default--text'); 
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const div = document.querySelectorAll('.div');
const productsAddDiv = document.getElementById('products-add-div')
let divArray = Array.prototype.slice.call(div);
const submitBtn = document.getElementById('submit');
const priceNameDiv = document.querySelectorAll('.text');
let priceNameArray = Array.prototype.slice.call(priceNameDiv);

let value = 1;
let valueArray = [value];
const form = document.getElementById('form');
//Cart
cartHistory = [];

const list = document.getElementById('list');
const cartOverlay = document.getElementById('cart-overlay');
const cartBtn = document.getElementById('cart');
const totalcartPrice = document.getElementById('totalcartPrice');
const cartDiscountPrice = document.getElementById('cartDiscountPrice');
const cartBtnPage2 = document.getElementById('cart-btn2');
//Discount
const discountOverlay = document.getElementById('discountOverlay');
const discountInput = document.getElementById('discountInput');
const applyDiscountBtn = document.getElementById('applyDiscount'); 
const discountDiv = document.getElementById('discount');
let discountSumUIParamater = 0;
//GoBack Btns
const goBackBtnAddProductDiv = document.getElementById('go-backBtn');
const gobackBtn2CartOverlay = document.getElementById('go-backBtn2');
//EndingDiv
const endingDiv = document.querySelector('.ending-div');





// array.forEach((item,index) => {
//     arrayImage[index].style.display = 'none';
// array[index].addEventListener('change', function() {
//     const file = this.files[0];
//     if(file){
//     console.log(file);
//      const reader = new FileReader();  
//      console.log(reader); 
//        arrayDefaultText.style.display = "none";
//        arrayImage[index].style.display = "block";
//      reader.addEventListener('load', function() {
//        arrayImage[index].setAttribute('src', this.result)      
//      });
//      reader.readAsDataURL(file); 
    
//     }else {
//         arrayImage.style.display = "none";
//         arrayDefaultText.style.display = "none";
//     }
         
// });
// });
//To Change Default image
image.style.display = 'none';

//Image Div to load the initial image






//Functions 
//1.Function to get Image
function updateNameAndPrice(productNameReal,productPriceReal) {
   priceNameArray[divIndexOnClicking].classList.add('show');
   
   priceNameArray[divIndexOnClicking].innerHTML = `
   <div class="text show">
       <span class="name1" id= ${productNameReal}>Name: ${productNameReal} </span>
       <span class="price1" id= ${productPriceReal}>Price ${productPriceReal}RS</span>

     </div>
   `;
 }
 //2.
 function generateID() {
    return Math.floor(Math.random()* 100000000)
 }
//3
 function deleteCart(id,amount) {
       cartHistory = cartHistory.filter(cart => 
          cart.id != id
             
       );
      //   console.log(cartHistory);
       init();
      
 }
 //4. Addcartlists 
   function addcartLists(cart) {
      
        const item = document.createElement('div');   
        //Adding class
        item.classList.add('list-item');
        //
        item.innerHTML = `
        <span> 1 X ${cart.name}</span> 
        <span>PKR ${cart.amount}</span>
        <button class = "deleteCartBtn" onclick = "deleteCart(${cart.id},${cart.amount})">
        <i class = "fas fa-trash"> </i>
        </button>
        `;
        list.appendChild(item);
     
        item.addEventListener('click', ()=> {
         item.lastElementChild.classList.add('showDelBtn');    
         
        });
      }           
 //5. SumUI 
   function sumUI(discountPrice13) {
      const amounts = cartHistory.map(cart => cart.amount);
 // 
 let total = amounts
              .reduce((acc,amount) => (acc+=amount), 0);
    
   total -= discountPrice13;            
 //Updating cart Text
  cartBtn.innerText = `
      ${cartHistory.length} item = PKR ${total}
  `;    
       
 
  
  totalcartPrice.innerText = `
       Total: PKR ${total}
  `;
  cartBtnPage2.innerText = `
  ${cartHistory.length} item = PKR ${total}
 `;
 
 }
 //5. 
   function init() {
      list.innerHTML = '';
      cartHistory.forEach(addcartLists);
      sumUI(discountSumUIParamater);
   }
     
//  transactions = transactions.filter(transaction => 
//    transaction.id != id         
// )
 //4.
 function addTranscation(productPriceoNClick,productNameonClick) {
   
 cart = {
    name: productNameonClick,
    amount: +productPriceoNClick,
    id: generateID()
 }

 cartHistory.push(cart);
 cartHistory.forEach(addcartLists);
    
 }
   
//Event Listners
//1.Function that upload picture in Image Container in AddProductDiv And in main Div(front Page) 
function getImage(ImageSrc) {
   
inputFile.addEventListener('change', function() {
   const file = this.files[0];
  
      
   if(file){
   
    const reader = new FileReader();  
     
      defaultText.style.display = "none";
      image.style.display = "block";
    reader.addEventListener('load', function() {
     //Adding Image to ImageContainer in AddProductDiv   
      image.setAttribute('src', this.result);
      //To prevent image from next page
      image.alt = 'imagesssss';
      //If one image is added to the main imageContainer it doesnot upload again 
    if (!(ImageSrc.alt == "image1")) {   
      ImageSrc.setAttribute('src', this.result);               
      ImageSrc.alt = "image1";  
      console.log(ImageSrc);
    }  else {
       return;
    }                 
       
   });
    reader.readAsDataURL(file);  

   }
   // else {
   //     image.style.display = "none";
   //     defaultText.style.display = "none";
   // }

});
   
         
}

//3.Event Listner on submit the button of Create Product
submitBtn.addEventListener('click', ()=> {
  //Image must be included to productDiv and product Price, product name as well
  //All must have values in it   
  if(!productName.value.trim() || !productPrice.value.trim() || !(image.alt === 'imagesssss')){
   alert("Please enter product name or price or picture");
  }else {
   //Removing Product Price and Product Name Div 
   productsAddDiv.classList.remove('show'); 
   //Removing image from imageContainer in productsAddDiv 
   image.src = '';
   //Assigning Image his previous alt value
   image.alt = 'image';
  }
  // console.log(&& !(image.alt === 'imagesssss'));

});
//4.Event Listner on the form submission of productDiv Container
form.addEventListener('submit', e => {
   e.preventDefault();
  //getting values of product Price and product Name   
   const productPriceReal = productPrice.value.trim();
   const productNameReal = productName.value.trim();
   //  
   updateNameAndPrice(productNameReal,productPriceReal);
   //Removing values
   productName.value = '';
   productPrice.value = '';    
    // addTranscation();
    // sumUI();

});

//Event Listner on item purchaes
cartBtn.addEventListener('click', e => {
   e.preventDefault()
   cartOverlay.classList.add('show');
   init();
});
//
document.getElementById('cart-btn2').addEventListener('click', ()=> {
  cartOverlay.classList.remove('show');
  alert('Do you want to confirm order')
  endingDiv.classList.add('show');
})
 
//EventListner on discount price
cartDiscountPrice.addEventListener('click', ()=> {
  discountOverlay.classList.add('show');
   discountInput.focus();
})
//
 function applyDiscount(discountPrice) {
    applyDiscountBtn.addEventListener('click', ()=> {
      const total = GettingdiscountValue();
      if (!(discountPrice > total) ) {
        discountOverlay.classList.remove('show');
        
        discountSumUIParamater = discountPrice;
        sumUI(discountSumUIParamater);
        discountDiv.innerHTML = `
        <button class= "deleteDiscount" onclick = "removeDiscount(${discountPrice})">X</button>
        <span class="cartDiscountPrice" id="cartDiscountPrice">Discount: ${discountPrice}</span>          
        `;
        discountDiv.classList.add('color');
         discountDiv.lastElementChild.addEventListener('click', ()=> {
          discountInput.value = '';
          discountOverlay.classList.add('show'); 
          discountInput.focus();  
        })  
   }else {
    
    alert("Please add   less discount value than orignal one");
    discountInput.value = '';
  }   
  });
 }
 // To remove Discount
 function removeDiscount(discountPrice) {
  discountDiv.innerHTML = '';
   discountPrice = 0;
   discountSumUIParamater = discountPrice;
   sumUI(discountSumUIParamater);
 }
  // if (discountValue) {
  //    applyDiscount(discountPrice);
  //    console.log(discountValue);
  //  }
  //DiscountInput EventListner
 discountInput.addEventListener('change', ()=> {
   const DiscountPrice = +discountInput.value;
   applyDiscount(DiscountPrice);
 })
// console.log(cartDiscountPrice);
//Function to get total Price used For discount price
 function GettingdiscountValue() {
  const amounts = cartHistory.map(cart => cart.amount);
  // 
  let total = amounts
               .reduce((acc,amount) => (acc+=amount), 0);
   return total;
              }
    // console.log(GettingdiscountValue());        
  //GobackBtn
  goBackBtnAddProductDiv.addEventListener('click', ()=> {
    productsAddDiv.classList.remove('show');
  });
  gobackBtn2CartOverlay.addEventListener('click', ()=> {
    cartOverlay.classList.remove('show');
  });
  //Ending Div
              
              