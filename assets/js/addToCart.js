let addToCartForm = document.querySelector("#addToCartForm");
// let cartCount = document.querySelector('#cartCount');

//let token = localStorage.getItem("token");

let params = new URLSearchParams(window.location.search);

let prodId = params.get('prodId');

let prodName = document.querySelector("#name");
let prodPrice = document.querySelector("#price");
let imageHere = document.querySelector("#imageHere");


fetch(`https://pacific-falls-33363.herokuapp.com/api/products/${prodId}`, {
	method: "GET",
	headers: {
		"Authorization" : `Bearer ${token}`
	}
}).then(result=>result.json())
.then(result=>{
	prodName.innerHTML = result.name;
	prodPrice.innerHTML = result.price;

	imageHere.innerHTML =
	`
		<img src = ${result.imgURL}>
	`;
});

addToCartForm.addEventListener("submit", (e) => {

e.preventDefault();

let prodQuantity = document.querySelector("#quantity").value;

	fetch(`https://pacific-falls-33363.herokuapp.com/api/orders/${prodId}/add-to-cart`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			quantity: prodQuantity
		})
	}).then(result=>result.json())
	.then(result=>{
		//console.log(result);
		if(result==true){
			swal(`Product was successfully added`,"", "success");

			let counter = localStorage.getItem("cartCount");
			counter += prodQuantity;
			cartCount.innerHTML = 
			`
			${counter}
			`;
			window.setTimeout(function() {
		    	window.location.replace("./products.html");
			}, 2000);
			
		} else {
			swal(`Product was not added. Please try again`);
		}
		// if(error){
		// 	alert(`Product was not added. Please try again`);
		// } else {
		// 	alert(`Product wasa succesfully added`);
		// 	window.location.replace("./products.html");
		// }
	});
})