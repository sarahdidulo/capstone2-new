let editProdForm = document.querySelector("#editProdForm");

//let token = localStorage.getItem("token");

let params = new URLSearchParams(window.location.search);

let prodId = params.get('prodId');

let prodName = document.querySelector("#name");
let prodDesc = document.querySelector("#description");
let prodPrice = document.querySelector("#price");
let prodImage = document.querySelector("#image");

fetch(`https://pacific-falls-33363.herokuapp.com/api/products/${prodId}`, {
	method: "GET",
	headers: {
		"Authorization" : `Bearer ${token}`
	}
}).then(result=>result.json())
.then(result=>{
	prodName.value = result.name;
	prodDesc.value = result.description;
	prodPrice.value = result.price;
	prodImage.value = result.imgURL;
})

editProdForm.addEventListener("submit", (e)=>{

e.preventDefault();

	fetch(`http://localhost:3000/api/products/${prodId}/edit`, {
		method: "PUT",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: prodName.value,
			description: prodDesc.value,
			price: prodPrice.value,
			imgURL: prodImage.value
		})
	}).then(result=>result.json())
	.then(result=>{
		console.log(result);
		if(result==true){
			swal(`Product was successfully updated`);
			window.setTimeout(function() {
		    	window.location.replace("./products.html");
			}, 2000);
			
		} else {
			swal(`Product was not updated. Please try again`);
		}
	})
})