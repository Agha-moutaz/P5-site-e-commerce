// document.getElementById("cart-button").onclick = function(event){
//   alert('Vous avez ajouté le produit : ' + "porduct1") ;
// }


function kanape_to_html(data){
  console.log(data);
	return `<article id="${data._id}">
    <div class="item__img">
      <img src="${data.imageUrl}" alt="${data.alTxt}">
    </div>
    <div class="item__content">

      <div class="item__content__titlePrice">
     <h1 id="title">${data.name}</h1>
        <p>Prix : <span id="price">${data.price}</span>€</p>
      </div>

      <div class="item__content__description">
        <p class="item__content__description__title">Description :</p>
        <p id="description">${data.description}</p>
      </div>

      <div class="item__content__settings">
        <div class="item__content__settings__color">
          <label for="color-select">Choisir une couleur :</label>
          <select name="color-select" id="${data._id}_colors">
              <option value="">--SVP, choisissez une couleur --</option>
              ${data.colors.map((color)=>`<option value="${color}">${color}</option>`) } 
          </select>
        </div>

        <div class="item__content__settings__quantity">
          <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
          <input type="number" name="itemQuantity" min="1" max="100" value="0" id="${data._id}_quantity">
        </div>
      </div>

      <div class="item__content__addButton" id="cart-button" >
        <button id="addToCart" data-productid="${data._id}">Ajouter au panier</button>
      </div>

    </div>
  </article>`
}



const container = document.getElementsByClassName('item')[0]

/* container.innerHTML = kanape_to_html(kanaps[0]) */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id=urlParams.get('_id')
//get, post, put, delete
fetch('http://localhost:3000/api/products/'+id)
	.then(function(response){
  	return response.json()
  })
	.then(function(response){
    const kanaps = response
    // console.log("in fetch")
    // console.log(kanaps)
    // console.log(response)
     
    container.innerHTML = kanape_to_html(kanaps);
    var cart = new Cart()  
    
    document.getElementById("cart-button").onclick = function(event){
      alert('Vous avez ajouté le produit : ' + kanaps.name)
      var id = event.target.getAttribute('data-productid');
      var selectedColor = document.getElementById(event.target.getAttribute('data-productid')+'_colors').value;
      var quantity = document.getElementById(id+"_quantity").value;
      cart.add(id, selectedColor, quantity);
      cart.save();
      console.log(cart);
      //var color = event.target
      //var productFound = products.filter(p => p.id == id);
      //console.log("produit id"+id+" product Found ? : "+productFound);
      //console.log(event);
      console.log(id);
    }
  
    
  })
  .catch(function(error){
  	console.log(error);
  })

 