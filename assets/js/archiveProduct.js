
let params = new URLSearchParams(window.location.search);

let prodId = params.get('prodId');

//let token = localStorage.getItem("token");

// alert(prodId);
fetch(`https://pacific-falls-33363.herokuapp.com/api/products/${prodId}/archive`, {
		method: "PUT",
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	}).then(result=>result.json())
	.then(result=>{
		// console.log(result);
		if(result==true){
			swal(`Product was successfully archived`);
			window.setTimeout(function() {
		    	window.location.replace("./products.html");
			}, 2000);		
		} else {
			swal(`Product was not archived. Please try again`);
		}
	})