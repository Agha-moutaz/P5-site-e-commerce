// const kanaps = [
// 	{
//   	id: 107fb5b75607497b96722bda5b504926,
//     name:"Kanap Sinopé",
//     price: 1849,
//     colors: ["Blue", "White", "Black"],
//     description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     img: "/images/kanap01.jpeg",
//     altTxt: "Photo d'un canapé bleu, deux places"
//   },
// 	{
//   	id: 415b7cacb65d43b2b5c1ff70f3393ad1,
//     name:"Kanap Cyllène",
//     price: 4499,
//     colors: ["Black/Yellow", "Black/Red"],
//     description: "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
//     img: "/images/kanap02.jpeg",
//   altTxt: "Photo d'un canapé jaune et noir, quattre places"
//  },  
//   {
//     id: 055743915a544fde83cfdfc904935ee7,
//   name:"Kanap Calycé",
//   price: 3199,
//   colors: ["Green", "Red", "Orange"],
//   description: "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
//   img: "/images/kanap03.jpeg",
//   altTxt: "Photo d'un canapé d'angle, vert, trois places"
// },
// {
//     id: a557292fe5814ea2b15c6ef4bd73ed83,
//   name:"Kanap Autonoé",
//   price: 1499,
//   colors: ["Pink", "White"],
//   description: "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
//   img: "/images/kanap04.jpeg",
//   altTxt: "Photo d'un canapé rose, une à deux place"
// },
// {
//     id: 8906dfda133f4c20a9d0e34f18adcf06,
//   name:"Kanap Eurydomé",
//   price: 2249,
//   colors: ["Grey", "Purple", "Blue"],
//   description: "Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.",
//   img: "/images/kanap05.jpeg",
//   altTxt: "Photo d'un canapé gris, trois places"
// },
// {
//     id: 77711f0e466b4ddf953f677d30b0efc9,
//   name:"Kanap Hélicé",
//   price: 999,
//   colors: ["Grey", "Navy"],
//   description: "Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.",
//   img: "/images/kanap06.jpeg",
//   altTxt: "Photo d'un canapé gris, deux places"
// },
// {
//     id: 034707184e8e4eefb46400b5a3774b5f,
//   name:"Kanap Thyoné",
//   price: 1999,
//   colors:  ["Red", "Silver"],
//   description: "EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.",
//   img: "/images/kanap07.jpeg",
//   altTxt: "Photo d'un canapé rouge, deux places"
// },
// {
//     id: a6ec5b49bd164d7fbe10f37b6363f9fb,
//   name:"Kanap orthosie",
//   price: 3999,
//   colors: ["Pink", "Brown", "Yellow", "White"],
//   description: "Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.",
//   img: "/images/kanap08.jpeg",
//   altTxt: "Photo d'un canapé rose, trois places"
// },
// ]

function kanape_to_html(data){
	return `<a href="./product.html?_id=${data._id}">
  <article class="kanape">
  <img src="${data.imageUrl}" alt="">
  <div class="description">
    <h3>${data.name}</h3>
    <p>${data.description}</p>
    <span class="buy">Prix <b>${data.price}€</b></span>
  </div>
</article>
</a>`


}



const container = document.getElementById('items')

/* container.innerHTML = kanape_to_html(kanaps[0]) */


//get, post, put, delete
fetch('http://localhost:3000/api/products/')
	.then(function(response){
  	return response.json()
  })
	.then(function(response){
    const kanaps = response
    console.log (kanaps)
    
    var html = ""
    for(let key in kanaps){
      html += kanape_to_html(kanaps[key])
    }
    container.innerHTML = html
    
  })
  .catch(function(error){
  	console.log(error)
  })

