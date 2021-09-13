
let products = document.querySelector(".products");


let isAdmin = localStorage.getItem("isAdmin");

//let token = localStorage.getItem("token");


// console.log(isAdmin);

	//get all active and inactive products

	fetch("https://pacific-falls-33363.herokuapp.com/api/products/all-products", {
		method: "GET",
		headers: {
			"Authorization" : `Bearer ${token}`
		}			
	}).then(result=>result.json())
	.then((result)=>{
		console.log(result);

		let addProd = document.querySelector(".addProduct");

		

		result.forEach(
			(result)=> {
				// console.log(result.imgURL);
				// console.log(result._id);

			
				if(isAdmin == "true"){

				addProd.innerHTML = 
				`
					<a href="./addProduct.html" class="btn btn-info btn-sm mt-3">Add a Product</a>
				`;

				products.innerHTML +=
					`
						<div class="card my-3 border-0" style="width: 18rem;">
						  <img class="card-img-top" src="${result.imgURL}" alt="Card image cap">
						  <div class="card-body border-0">
						    <h5 class="card-title">${result.name}</h5>
						    <p class="card-text">${result.description}</p>
						    <p class="card-text">Php ${result.price}</p>
						    <div class = "card-footer-${result._id}">
						    </div>
						  </div>
						</div>

					`;
					let cardFooter = document.querySelector(`.card-footer-${result._id}`);

					cardFooter.innerHTML +=
						`
							<a href="./editProduct.html?prodId=${result._id}" class="btn btn-info">Edit Product</a>
							
						`;
					

					if(result.isActive == true){ //nested if within isAdmin is true
						cardFooter.innerHTML += 
							`
								<a href="./archiveProduct.html?prodId=${result._id}" class="btn btn-dark">Archive Product</a>
							`;
					} else if(result.isActive == false){
						cardFooter.innerHTML += 
							`
								<a href="./unarchiveProduct.html?prodId=${result._id}" class="btn btn-success">Unarchive Product</a>
							`;
					}

					cardFooter.innerHTML +=

					`
						<a href="./deleteProduct.html?prodId=${result._id}" class="btn btn-warning">Delete Product</a>
					`;

				} else if( isAdmin == "false" && result.isActive == true){

				products.innerHTML +=
					`
						<div class="card my-3" style="width: 18rem;">
						  <img class="card-img-top" src="${result.imgURL}" alt="Card image cap">
						  <div class="card-body">
						    <h5 class="card-title">${result.name}</h5>
						    <p class="card-text">${result.description}</p>
						    <p class="card-text">Php ${result.price}</p>
						    <div class = "card-footer-${result._id}">
						    </div>
						  </div>
						</div>

					`;

					let cardFooter = document.querySelector(`.card-footer-${result._id}`);

					cardFooter.innerHTML +=
					`
						<a href="./addToCart.html?prodId=${result._id}" class="btn btn-info">Add to Cart</a>
					`;
									
					
				}
			}
		)

		
		
	})
