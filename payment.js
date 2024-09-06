
const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener("submit", payWithPaystack, false);

document.getElementById("amount").value

// function payWithPaystack(e) {
//   e.preventDefault();

//   let handler = PaystackPop.setup({
//     key: 'pk_test_26faad734a6f3edbc08e9fb637ce1c0b8373ef0c', // Replace with your public key
//     email: document.getElementById("email-address").value,
//     amount: document.getElementById("amount").value * 100,
//     currency: "NGN",
//     ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
//     // label: "Optional string that replaces customer email"
//     onClose: function(){
//       alert('Window closed.');
//     },
//     callback: function(response){
//       let message = 'Payment complete! Reference: ' + response.reference;
//       alert(message);
//     }
//   });

//   handler.openIframe();
// }
function payWithPaystack(e) {
  e.preventDefault();

  // Get values from additional custom fields
  let deliveryAddress = document.getElementById("deliveryAddress").value;
  let phoneNum = document.getElementById("phoneNum").value; // assuming you have an input field with id "invoiceId"
  // let cartItems = document.getElementById("cartItems").value; // assuming you have an input field with id "cartItems"
  let firstName = document.getElementById("firstName").value; // assuming you have an input field with id "cartItems"
  let lastName = document.getElementById("lastName").value; // assuming you have an input field with id "cartItems"
let cartSelections = simplifiedProducts

  let handler = PaystackPop.setup({
      key: 'pk_live_5a31b667019b9a3ed5457c3f186040a1d1304511',
      email: document.getElementById("email-address").value,
      amount: document.getElementById("amount").value * 100,
      currency: "NGN",
      ref: '' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
          custom_fields: [
              {
                  display_name: "Delivery Address",
                  variable_name: "delivery_address",
                  value: deliveryAddress
              },
              {
                  display_name: "Phone Number",
                  variable_name: "phone_num",
                  value: phoneNum
              },
              {
                  display_name: "last Name",
                  variable_name: "last_name",
                  value: lastName
              }, {
                display_name: "Cart Selection",
                variable_name: "cart_selection",
                value: cartSelections
            }, {
              display_name: "First Name",
              variable_name: "first_name",
              value: firstName
          }
          ]
      },
      onClose: function () {
          alert('Window closed.');
      },
      callback: function (response) {
          let message = 'Payment complete! Reference: ' + response.reference;
          alert(message);
        //   window.location.href = 'https://www.instagram.com/jetandjoe?igsh=MTlkdDYyYWZyZzFiYQ==';
      }
  });

  handler.openIframe();
}


