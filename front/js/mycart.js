function select_quantity(max, defaultValue, cart_id) {
  let options = ''

  for (let i = 0; i < max; i++) {
    options += `<option value="${i}" ${i==defaultValue ? 'selected': ''}>${i}</option>`
  }

  return `<select data-cart_id="${cart_id}" class="cart_quantity" name="quantity" id="">
        ${options}
    </select>`
}

function cart_to_html(data) {
  var html = ""
  for (let d in data) {
    html += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
              <div class="cart__item__img">
                <img src="${data[d].imageUrl}" alt="${data[d].altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${data[d].name}</h2>
                  <p> Couleur: ${data[d].color}</p>
                  <p>Prix: ${data[d].unitPrice}€</p>
                  <p>Total: ${data[d].total}€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" data-cart_id="${data[d].cart_id}" name="itemQuantity" min="1" max="100" value="${data[d].quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete"  onclick="remove(event);">
                    <p class="deleteItem" id="${data[d].kanap_id}" quantity="${data[d].quantity}" color="${data[d].color}" >Supprimer</p>
                  </div>
                  
                </div>
              </div>
            </article>`
  }

  return html
};



// Recupération des champs
let firstname = document.querySelector('#firstName');
let lastname = document.querySelector('#lastName');
let address = document.querySelector('#address');
let city = document.querySelector('#city');
let email = document.querySelector('#email');
let fieldsErrors ={}



//Définition des Listeners 
firstname.addEventListener('change', function () {
  validFirstName(this);
});

lastname.addEventListener('change', function () {
  validLastName(this);
});

address.addEventListener('change', function () {
  validAddress(this);
});
city.addEventListener('change', function () {
  validCity(this);
});

email.addEventListener('change', function () {
  validEmail(this);
});


//Fonctions
const validFirstName = function (input) {
  let ErrorMsg = input.nextElementSibling;
  if (input.value.length >= 1 && input.value.length <= 100) {
    //ok
    ErrorMsg.innerText = "";
    fieldsErrors["firstname"] = false
  } else {
    //ko
    ErrorMsg.innerText = "entre 1 et 100 caractères";
    fieldsErrors["firstname"] = true
  }

}

const validLastName = function (input) {
  let lastNameErrorMsg = input.nextElementSibling;

  if (input.value.length >= 2 && input.value.length <= 100) {
    //ok
    lastNameErrorMsg.innerText = "";
    fieldsErrors["lasttname"] = false
  } else {
    //ko
    lastNameErrorMsg.innerText = "entre 2 et 100 caractères";
    fieldsErrors["lasttname"] = true
  }

}

const validAddress = function (input) {
  let addressErrorMsg = input.nextElementSibling;
  
  if (input.value.length >= 10 && input.value.length <= 100) {
    //ok
    addressErrorMsg.innerText = "";
    fieldsErrors["addresse"] = false
  } else {
    //ko
    addressErrorMsg.innerText = "entre 10 et 100 caractères";
    fieldsErrors["addresse"] = true
  }

}
const validCity = function (input) {
  let cityErrorMsg = input.nextElementSibling;
  
  if (input.value.length >= 1 && input.value.length <= 100) {
    //ok
    cityErrorMsg.innerText = "";
    fieldsErrors["city"] = false
  } else {
    //ko
    cityErrorMsg.innerText = "Entre 1 et 100 caractères";
    fieldsErrors["city"] = true
  }

}

const validEmail = function (inputEmail){
  let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
  );
  let testEmail = emailRegExp.test(inputEmail.value);

  let emailErrorMsg = inputEmail.nextElementSibling;


  if (testEmail) {
    emailErrorMsg.innerText = "";
    fieldsErrors["email"] = false
    return true;
    
  } else {
    emailErrorMsg.innerText = 'Adresse mail non valide'
    fieldsErrors["email"] = true
    return false;
  }

};
//valiation et submit
var cart = new Cart()
let purchase = document.querySelector('#purchase');
const validPurchase = function(event){
  event.stopPropagation()
  event.preventDefault()

  validFirstName(firstname);
  validLastName(lastname);
  validAddress(address);
  validCity(city);
  validEmail(email);

  for(let field in fieldsErrors){
    if(fieldsErrors[field]==true){
      alert ("formulaire invalide")
      return
    }
  }
  
  let productsInfo = cart.getProductsId();
 


  const commande = {
      contact: {
          firstName: firstname.value,
          lastName: lastname.value,
          address: address.value,
          city: city.value,
          email: email.value,
      },
      products: productsInfo
  }
const options = {
    method: "POST",
    body: JSON.stringify(commande),
    headers: {
      "Content-Type": "application/json"
    }
  }
    
  fetch("http://localhost:3000/api/products/order", options)

  .then(function (response) {
    return response.json()
  })
  .then(function (result) {

    console .log("succes")
    window.location.href = `confirmation.html?orderId=${result.orderId}`
  })
  .catch(function(error){
    alert ("error de paiment")
  });
}
purchase.addEventListener("submit", validPurchase);

function render(kanaps) {
 

  cart.load()
  let $resume = document.getElementById("cart__items")
  $resume.innerHTML = cart_to_html(cart.getResume(kanaps));
  let $selects = document.getElementsByClassName('itemQuantity')
  totals = cart.getTotal(kanaps)
  let totalQuantity = document.getElementById('totalQuantity');
  let totalPrice = document.getElementById('totalPrice');
  totalQuantity.innerText = totals[0];
  totalPrice.innerText = totals[1];
  for (let s in $selects) {
    if (typeof $selects[s] != 'object') continue

    $selects[s].addEventListener('change', function (event) {
      console.log(event.target.value)
      var cart_id = event.target.getAttribute('data-cart_id')
      var newQuantity = parseInt(event.target.value, 10)
      cart.setToStorage(cart_id, newQuantity)
      cart.save()
      render(kanaps)
    })
  }
}
fetch("http://localhost:3000/api/products")
  .then(function (response) {
    return response.json()
  })
  .then(function (kanaps) {

    render(kanaps)

  })