// SELECT ELEMENTS
let cartIndex = 0;
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
const cartBtn = document.querySelector(".nav-item7");
const payAmount = document.getElementById("amount");
const priceShow = document.querySelector(".pricedetailpay");
const priceShow1 = document.querySelector(".pricedetailpay1");
const sortBtn = document.querySelector(".sortBtn");
const topsBtn = document.querySelector(".TopsBtn");
const bottomsBtn = document.querySelector(".BottomsBtn");
const capsBtn = document.querySelector(".CapsBtn");
const allBtn = document.querySelector(".AllBtn");
const filterBtn = document.querySelector(".filterBtn");
const visiFilter = document.querySelector(".sort-filter");
visiFilter.style.visibility = "visible";

topsBtn.addEventListener("click", function name(params) {
  console.log("tops");
  filterBtn.textContent = "Ready made";
});
bottomsBtn.addEventListener("click", function name(params) {
  console.log("bottom");
  filterBtn.textContent = "Women";
});
capsBtn.addEventListener("click", function name(params) {
  console.log("caps");
  filterBtn.textContent = "Men";
});
allBtn.addEventListener("click", function name(params) {
  console.log("allbtn");
  filterBtn.textContent = "All";
});

sortBtn.addEventListener("click", function name(params) {});

let priceArr = [];
let priceARR = [];
let cartshow = 0;

function sortProductsByType(type) {
  // Filter products based on the selected type
  const filteredProducts = products.filter((product) => product.type === type);
  console.log(filteredProducts);
  // If type is not found, do nothing
  if (filteredProducts.length === 0) {
    return;
  }

  // Clear the existing products before rendering
  productsEl.innerHTML = "";

  // Call the renderProdcuts function to display the sorted products
  renderProdcuts(filteredProducts);
}



function changeProductImage(productId, direction) {
  const product = products.find((item) => item.id === productId);

  if (product && product.imgSrc instanceof Array) {
    const imageElement = document.getElementById(`productImage-${productId}`);
    let currentImageIndex = product.imgIndex || 0;

    if (direction === "forward") {
      currentImageIndex = (currentImageIndex + 1) % product.imgSrc.length;
    } else if (direction === "backward") {
      currentImageIndex =
        (currentImageIndex - 1 + product.imgSrc.length) % product.imgSrc.length;
    }

    product.imgIndex = currentImageIndex;
    imageElement.src = product.imgSrc[currentImageIndex];
  }
}
//  sorting key to local storage
function saveSortingState(sortingKey) {
  localStorage.setItem("sortingKey", sortingKey);
}

document.addEventListener("DOMContentLoaded", function () {
  const savedSortingKey = localStorage.getItem("sortingKey");

  switch (savedSortingKey) {
    case "priceLow":
      sortProductsByPriceLow();
      break;
    case "priceHigh":
      sortProductsByPriceHigh();
      break;
    case "mostRecent":
      sortProductsByMostRecent();
      break;
    default:
      // If no sorting state is found, render the products in their default order
      resetProductsOrder();
      productsEl.innerHTML = "";
      renderProdcuts();
  }
});

// to control the cart display
document.querySelector(".cart-background").style.display = "none";

cartBtn.addEventListener("click", function name(params) {
  if (cartIndex == 0) {
    cartIndex++;
    document.querySelector(".cart-background").style.display = "block";
    document.querySelector(".navigation-small").style.display = "none";
  } else {
    document.querySelector(".cart-background").style.display = "none";
    cartIndex = 0;
  }
});


{/* <button class="close-description" onclick="toggleProductDescription(${
  product.id
})"><img src="images/icon-close.svg" class="cancel-icon2" /></button> */}

function sortProductsByPriceLow() {
  products.sort((a, b) => a.price - b.price);
  saveSortingState("priceLow");
  sortBtn.textContent = "Lowest";
  filterBtn.textContent = "All";

  productsEl.innerHTML = "";
  renderProdcuts();
}
function sortProductsByPriceHigh() {
  products.sort((a, b) => b.price - a.price);
  saveSortingState("priceHigh");
  sortBtn.textContent = "Highest";
  filterBtn.textContent = "All";

  productsEl.innerHTML = "";
  renderProdcuts();
}
function toggleProductDescription(productId) {
  const description = document.getElementById(`product-description-${productId}`);
  
  if (description.style.display === 'none' || description.style.display === '') {
    description.style.display = 'block';
    // Update the history state when showing the description
    history.pushState({ popupOpen: true, productId: productId }, "", `#product-${productId}`);
  } else {
    description.style.display = 'none';
    // Update the history state when hiding the description
    history.pushState({ popupOpen: false }, "", "");
  }
}

// Handle the popstate event to ensure proper navigation
window.addEventListener('popstate', (event) => {
  const state = event.state;
  
  if (state && state.popupOpen) {
    const description = document.getElementById(`product-description-${state.productId}`);
    if (description) {
      description.style.display = 'block';
    }
  } else {
    const openDescriptions = document.querySelectorAll('[id^="product-description-"]');
    openDescriptions.forEach(description => {
      description.style.display = 'none';
    });
  }
});

function sortProductsByMostRecent() {
  resetProductsOrder();
  saveSortingState("mostRecent");
  sortBtn.textContent = "Default";
  filterBtn.textContent = "All";

  productsEl.innerHTML = "";
  renderProdcuts();
}

function sortProductsByAll() {
  resetProductsOrder();
  // saveSortingState('mostRecent');
  filterBtn.textContent = "All";

  productsEl.innerHTML = "";
  renderProdcuts();
}

function resetProductsOrder() {
  products.sort((a, b) => a.id - b.id);
  saveSortingState("default");
}

// RENDER PRODUCTS
function renderProdcuts(productsArray = products) {
  productsArray.forEach((product) => {
    const {
      sizes = ["medium", "small", "large", "extra-large"],
      colors = ["black", "red", "blue", "green"],
    } = product.options || {};

    const sizeOptions = sizes
      .map((size) => `<option value="${size}">${size}</option>`)
      .join("");
    const colorOptions = colors
      .map((color) => `<option value="${color}">${color}</option>`)
      .join("");

      productsEl.innerHTML += `
      <div class="item view-product-btn">
        <a href="#" onclick="event.preventDefault(); toggleProductDescription(${product.id})">
          <div class="item-container">
            <div class="item-img">
              <img src="${product.imgSrc[0]}" alt="${product.name}" id="productImage-${product.id}">
            </div>
            <div class="desc">
              <h5 class="productname">${product.name}</h5>
              <h6 class="mb-3"><small>&#8358;</small>${product.price}</h6>
            </div>
          </div>
        </a>
        <div class="product-description" id="product-description-${product.id}" style="display: none;">
          <div class="description-content">
            <div class="row">
              <div class="col-md-6">
                <div class="carousel-container" id="carousel-container-${product.id}">
                  <div class="carousel" id="carousel-${product.id}">
                    ${product.imgSrc.map((src, index) => `
                      <img src="${src}" alt="Product Image ${index + 1}" class="carousel-image">
                    `).join("")}
                  </div>
                  <button class="carousel-button prev" onclick="event.stopPropagation(); changeCarouselImage(${product.id}, 'prev')">❮</button>
                  <button class="carousel-button next" onclick="event.stopPropagation(); changeCarouselImage(${product.id}, 'next')">❯</button>
                  <p>${product.detailedDescription || "No detailed description available."}</p>
                </div>
              </div>
              <div class="col-md-6">
                <h3>${product.name}</h3>
                <p>N${product.price}</p>
                <br/>
                <form id="quantity-form">
                  <label for="quantity">Quantity:</label>
                  <input type="number" id="quantity" name="quantity" value="1" min="1" max="10">
                </form>
                <br/>
                <div class="add-to-cart2 button" onclick="addToCart(${product.id})">Add to cart</div>
                <h4>Description</h4>
                <p>${product.description}</p>
                <p>The kit includes:</p>
                <p>item 1</p>
                <p>item 2</p>
                <p>item 3</p>
                <p>item 4</p>
                <p>item 5</p>
                <p>item 6</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    ;
  });
}

// function renderProdcuts(productsArray = products) {
//   productsArray.forEach((product) => {
//     const { sizes = ["medium", "small", "large", "extra-large"], colors = ["black", "red", "blue", "green"] } = product.options || {};

//     const sizeOptions = sizes.map((size) => `<option value="${size}">${size}</option>`).join('');
//     const colorOptions = colors.map((color) => `<option value="${color}">${color}</option>`).join('');

//     productsEl.innerHTML += `
//       <div class="item">
//         <div class="item-container">
//           <div class="item-img">
//             <div class="button image-switch-button-backward" onclick="changeProductImage(${product.id}, 'backward')"><img src="images/right-arrow (3).png" class="arrow"></div>
//             <img src="${product.imgSrc[0]}" alt="${product.name}" id="productImage-${product.id}">
//             <div class="button image-switch-button-forward" onclick="changeProductImage(${product.id}, 'forward')"><img src="images/right-arrow (2).png" class="arrow"></div>
//           </div>
//           <div class="desc">
//             <div class="add-to-wishlist">
//               <img src="images/stars (2).png" alt="add to wish list">
//             </div>
//             <h5 class="productname">${product.name}</h5>
//             <h6 class="mb-3"><small>&#8358;</small>${product.price}</h6>
//             <div class="add-to-cart button" onclick="addToCart(${product.id})">
//               <img src="images/icon-cart.svg" alt="cart img" class="cart-img"/>
//               add to cart
//             </div>
//             <button class="view-product-btn" onclick="toggleProductDescription(${product.id})">View Product</button>
//             <div class="product-description" id="product-description-${product.id}" style="display: none;">
//               <div class="picture-gallery">
//                 ${product.imgSrc.map((src) => `<img src="${src}" alt="Product Image">`).join('')}
//               </div>
//               <p>${product.detailedDescription || 'No detailed description available.'}</p>
//             </div>
//           </div>
//         </div>
//       </div>`;
//   });
// }

// function renderProdcuts(productsArray = products) {

//   productsArray.forEach((product) => {
//     const { sizes = ["medium", "small", "large", "extra-large"], colors = ["black", "red", "blue", "green"] } = product.options || {};

//     const sizeOptions = sizes.map((size) => `<option value="${size}">${size}</option>`).join('');
//     const colorOptions = colors.map((color) => `<option value="${color}">${color}</option>`).join('');

//     productsEl.innerHTML += `
//       <div class="item">
//         <div class="item-container">
//           <div class="item-img">
//           <div class="button image-switch-button-backward" onclick="changeProductImage(${product.id}, 'backward')"><img src="images/right-arrow (3).png" class="arrow"></div>
//           <img src="${product.imgSrc[0]}" alt="${product.name}" id="productImage-${product.id}">
//           <div class="button image-switch-button-forward" onclick="changeProductImage(${product.id}, 'forward')"><img src="images/right-arrow (2).png" class="arrow"></div>
//           </div>
//           <div class="desc">
//             <div class="add-to-wishlist">
//               <img src="images/stars (2).png" alt="add to wish list">
//             </div>
//             <h5 class="productname">${product.name}</h5>
//             <h6 class="mb-3"><small>&#8358;</small>${product.price}</h6>

//             <div class="add-to-cart button" onclick="addToCart(${product.id})">
//               <img src="images/icon-cart.svg" alt="cart img" class="cart-img"/>
//               add to cart
//             </div>

//           </div>
//         </div>
//       </div>`;
//   });
// }
renderProdcuts();

function changeCarouselImage(productId, direction) {
  const product = products.find((item) => item.id === productId);

  if (product && Array.isArray(product.imgSrc)) {
    const carousel = document.getElementById(`carousel-${productId}`);
    const totalImages = product.imgSrc.length;
    let currentImageIndex = product.imgIndex || 0;

    if (direction === "next") {
      currentImageIndex = (currentImageIndex + 1) % totalImages;
    } else if (direction === "prev") {
      currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    }

    product.imgIndex = currentImageIndex;

    // Calculate the offset and apply the transform
    const offset = -currentImageIndex * 100; // 100% width per image
    carousel.style.transform = `translateX(${offset}%)`;

    console.log(
      `Product ID: ${productId}, New Image Index: ${currentImageIndex}, Offset: ${offset}%`
    );
  } else {
    console.error("Product not found or imgSrc is not an array.");
  }
}

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// console.log(selected);

// ADD TO CART

function addToCart(id) {
  if (cartshow == 0) {
    cartshow++;
    cartIndex = 1;
    document.querySelector(".cart-background").style.display = "block";
  }

  const size = document.getElementById(`size-${id}`).value;
  const color = document.getElementById(`color-${id}`).value;

  if (
    cart.some(
      (item) => item.id === id && item.size === size && item.color === color
    )
  ) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
      size,
      color,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): &#8358;${totalPrice.toFixed(
    2
  )}`;
  totalItemsInCartEl.innerHTML = totalItems;

  document.querySelector(".total-price-nav").textContent =
    totalPrice.toFixed(2);

  priceShow.textContent = `Total Amount =  ₦${
    Number(totalPrice.toFixed(2)) + 5000
  }`;
  priceShow1.textContent = `Selection  ₦${Number(
    totalPrice.toFixed(2)
  )} + Delivery  ₦${5000}`;

  priceARR.push(totalPrice.toFixed(2));

  console.log(priceARR);
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
      <div class="cart-item">
      <div class="item-info">
      
          <img src="${item.imgSrc[0]}" alt="${item.name}">
        </div>
        <div class="unit-price">
          <small>&#8358;</small>${item.price}
          </div>
          <div class="units">
          <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
          <div class="number">${item.numberOfUnits}</div>
          <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
        </div>
     
      </div>

      <div class="item-details">
      <div class="item-name">${item.name}</div>
      <div>Size: ${item.size}, Color: ${item.color}</div>
      <img src ="images/trash-fill.svg" class = "button delete-image" onclick="removeItemFromCart(${item.id}, '${item.size}', '${item.color}')">
    </div>
    `;
  });
}

// remove item from cart

function removeItemFromCart(id, size, color) {
  cart = cart.filter(
    (item) => !(item.id === id && item.size === size && item.color === color)
  );
  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}
// const closebtnmodal = document.querySelector('.close-modal-1')
// closebtnmodal.addEventListener("click",function (params) {
//   visiFilter.style.visibility = "visible";

//     console.log('check');

//   })

// const list = document.querySelector('body')
// list.addEventListener("click",function (params) {
// visiFilter.style.visibility = "visible";

// })

const checkoutbtn = document.querySelector(".no-blue");
checkoutbtn.addEventListener("click", function (params) {
  // visiFilter.style.visibility = "hidden";

  console.log("check");
});

// const forewardBtn = document.querySelectorAll(".foreward1")
// // for (let i = 0; i < forewardBtn.length; i++)

// forewardBtn[0].addEventListener("click",function (params) {
//   // products.id.imgSrc[1]

//     console.log("first");
// })
// forewardBtn[1].addEventListener("click",function (params) {

//   console.log("second");
// })
// forewardBtn[2].addEventListener("click",function (params) {

//   console.log("third");
// })
// forewardBtn[3].addEventListener("click",function (params) {

// console.log("fourth");
// })
// forewardBtn[4].addEventListener("click",function (params) {

//   console.log("fifth");
// })
// forewardBtn[5].addEventListener("click",function (params) {

// console.log("sixth");
// })

{
  /* <button class="back-image backward1" id="backward"><img src="images/backward-arrow.png" class="imagePointer"></button>
<button class="back-image foreward1" id="foreward"><img src="images/backward-arrow (1).png" class="imagePointer"></button> */
}

console.log(cart);

const simplifiedProducts = cart.map(
  ({ name, price, numberOfUnits, size, color }) => ({
    name,
    price,
    numberOfUnits,
    size,
    color,
  })
);

console.log(simplifiedProducts);
console.log(priceARR);
