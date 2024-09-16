'use strict'
const toggleBtn = document.querySelector('.nav-collapse')
const cancelBtn = document.querySelector('.cancel-btn')
const contactBtn= document.getElementById('contact-btn')
const aboutBtn= document.getElementById('about-btn')



// Function to handle pop-up display based on URL hash
// Function to handle pop-up display based on URL hash
// Function to handle pop-up display based on URL hash
function toggleDropdown() {
  var dropdown = document.querySelector('.dropdown');
  if (dropdown.classList.contains('open')) {
    dropdown.classList.remove('open');
  } else {
    dropdown.classList.add('open');
  }
}
function showProductPopup() {
    const hash = window.location.hash;
    const storeContent = document.getElementById('store-content');
    
    if (hash && hash.startsWith('#product-')) {
      const productId = hash.split('-')[1];
      const description = document.getElementById(`product-description-${productId}`);
      
      if (description) {
        // Show the pop-up
        description.style.display = 'block';
        
        // Optionally, you can update the history state if needed
        history.replaceState({ popupOpen: true, productId: productId }, "", hash);
      }
    }
    
    // Once the pop-up logic is done, show the store content
    if (storeContent) {
      storeContent.style.display = 'block';
    }
  }
  
  // Attach event listener to handle hash change
  window.addEventListener('load', showProductPopup);
  window.addEventListener('hashchange', showProductPopup);
  
  // Close pop-up and update the hash to remove the product ID when the user closes it
  function closeProductPopup(productId) {
    const description = document.getElementById(`product-description-${productId}`);
    
    if (description) {
      description.style.display = 'none';
    }
    
    // Update the URL hash without product ID
    history.pushState({ popupOpen: false }, "", "store.html");
  }
  


  function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }


// about btn
aboutBtn.addEventListener("click",function name() {
    console.log("omw")
    document.querySelector('.navigation-small').style.display = "none"

    
})
// contact btn
contactBtn.addEventListener("click",function name() {
    document.querySelector('.navigation-small').style.display = "none"
    console.log("omw")
    
})
// toggle btn
toggleBtn.addEventListener("click",function (params) {
    document.querySelector('.navigation-small').style.display = "block"
    document.querySelector('.cart-background').style.display = "none"
    cartIndex = 0
    // navigationSmall.classList.toggle('show');
    console.log('clicked in');    
})

// cancel btn
cancelBtn.addEventListener("click",function (params) {
    console.log('clicked out');    
    document.querySelector('.navigation-small').style.display = "none"
})

let counter1 = 0
let counter2 = 0
let counter3 = 0

let buttonValue 
let buttonValueMinus 
let arrayCounter = [];
const itemPrices = {
    item1: 1000,
    item2: 2000,
    item3: 3000,


}





const homeBtn = document.getElementById("home-btn")
homeBtn.style.borderBottom = '2px solid white';
// const navigationSmall = document.querySelector('.navigation-small')
const PlusBtn = document.querySelectorAll('.plusbtnall')
const minusBtn = document.querySelectorAll('.prevbtnall')
const toCartBtn = document.querySelectorAll('.add-to-cart')
const totalCartPrice = document.querySelector('.cost-total')
const cartItem1 = document.querySelector('.item-1')
const cartItem2 = document.querySelector('.item-2')
const cartItem3 = document.querySelector('.item-3')








// const counterValue = 

// plus btn
for (let i = 0; i < PlusBtn.length; i++) 
// for (let i = 0; i < counterValue.length; i++) 

PlusBtn[i].addEventListener('click',function name(params) {
    const buttonValue = PlusBtn[i].value;
    if (buttonValue == 1) {
     
        counter1 ++
      
        let counterArrival1 =  document.querySelector(`.counter-value${buttonValue}`)
        counterArrival1.textContent = counter1
        arrayCounter[0]= [];
        arrayCounter[0].push(Number(counterArrival1.textContent));
        console.log(arrayCounter);
        console.log(arrayCounter[0][0]);
        // counterNav ()
    document.querySelector(`.item-count${buttonValue}`).textContent = counter1


        
    } else if( buttonValue == 2 ) {
        console.log('002');
     

        counter2 ++
     
        let counterArrival2 =  document.querySelector(`.counter-value${buttonValue}`)
        counterArrival2.textContent = counter2 
        arrayCounter[1]= [];
        arrayCounter[1].push(Number(counterArrival2.textContent));
        console.log(arrayCounter);
        console.log(arrayCounter[1][0]);;
    document.querySelector(`.item-count${buttonValue}`).textContent = counter2

    }
    else if( buttonValue == 3 ) {
        console.log('003');
     

        counter3 ++
    
        let counterArrival3 =  document.querySelector(`.counter-value${buttonValue}`)
        counterArrival3.textContent = counter3 
        arrayCounter[2]= [];
        arrayCounter[2].push(Number(counterArrival3.textContent));
        console.log(arrayCounter);
        console.log(arrayCounter[2][0]);
    document.querySelector(`.item-count${buttonValue}`).textContent = counter3


    }
    
})

// minus btn
for (let i = 0; i < minusBtn.length; i++) 
minusBtn[i].addEventListener('click',function name(params) {
    const buttonValueMinus = minusBtn[i].value;

    console.log('minus clicked');
    if (buttonValueMinus == 1) {
        // counter1 = 0
      if (counter1 > 0) {

        counter1 --
   
        let counterArrival1 =  document.querySelector(`.counter-value${buttonValueMinus}`)
        counterArrival1.textContent = counter1
        arrayCounter[0]= [];
        arrayCounter[0].push(Number(counterArrival1.textContent));
        console.log(arrayCounter);
        console.log(arrayCounter[0][0]);
    }
        
    } else if( buttonValueMinus == 2 ) {
        console.log('002');
        // counter2 = 0
        if (counter2 > 0) {

        counter2 --
      
        let counterArrival2 =  document.querySelector(`.counter-value${buttonValueMinus}`)
        counterArrival2.textContent = counter2 
        arrayCounter[1]= [];
        arrayCounter[1].push(Number(counterArrival2.textContent));
        console.log(arrayCounter);
        console.log(arrayCounter[1][0]);;
        }
    }
    else if( buttonValueMinus == 3 ) {
        console.log('003');
        // counter3 = 0

      if (counter3 > 0) {
        counter3 --
      
        console.log(counter3);
        let counterArrival3 =  document.querySelector(`.counter-value${buttonValueMinus}`)
        counterArrival3.textContent = counter3 
        arrayCounter[2]= [];
        arrayCounter[2].push(Number(counterArrival3.textContent));
        console.log(arrayCounter);
        console.log(arrayCounter[2][0]);
    }
        
      }
    
    
})

