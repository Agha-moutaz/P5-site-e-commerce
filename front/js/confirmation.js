const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('orderId');
let element = document.getElementById("orderId");
element.innerHTML = orderId;
