

//let token = localStorage.getItem("token");

console.log(token);

let addProdForm = document.querySelector('#addProdForm');


addProdForm.addEventListener("submit", (e)=>{

	e.preventDefault();	

	let name = document.querySelector("#name").value;
	let description = document.querySelector('#description').value;
	let price = document.querySelector('#price').value;
	let image = document.querySelector('#image').value;

	fetch("https://pacific-falls-33363.herokuapp.com/api/products/create-product", {
		method: "POST",
		headers:{
			 "Authorization" : `Bearer ${token}`,
			 "Content-Type" : "application/json"
		},
		body: JSON.stringify({
			name: name,
			description: description,
			price: price,
			imgURL: image
		})
	}).then(result=>result.json())
	.then(result=>{
		console.log(result);
		if(result==true){
			swal(`Product was successfully created`);
			window.setTimeout(function() {
			    window.location.replace("./products.html");
			}, 2000);
		} else {
			swal(`Product was not created. Please try again`);
		}
	})
})