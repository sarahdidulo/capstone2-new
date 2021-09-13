
// let token = localStorage.getItem("token");

//alert(params);
// alert(qty);
// alert(prodId);


let cartPage = document.querySelector('.cart');


fetch("https://pacific-falls-33363.herokuapp.com/api/orders/current-order", {
	method: "GET",
	headers: {
		"Authorization" : `Bearer ${token}`,
		"Content-Type" : "application/json"
	}
}).then(result=>result.json())
.then((result)=>{ //result is the order of the user (paymentStatus is false)
	
	console.log(result);

	if(result != false){
		//console.log(result);

		cartPage.innerHTML =
		`
			<h1>Your Cart</h1>
			<table class = "table currentOrder">
				<thead>
					<tr>
						<th scope = "col">Product Name</th>
						<th scope = "col">Price</th>
						<th scope = "col">Quantity</th>
						<th scope = "col">Subtotal</th>
					</tr>
				</thead>
			</table>
		`;

		let orderTable = document.querySelector('.currentOrder');

		result.products.forEach(
			(result)=>{

				orderTable.innerHTML += 

				`
					<tr>
						<td>${result.name}</td>
						<td>Php ${result.price}</td>
						<td>${result.quantity}</td>
						<td>Php ${result.subtotal}</td>
					<tr>
				`;

				}
		)

		orderTable.innerHTML +=
		`
			<tr class = "table-active">
				<td><b>Total Amount:</b></td>
				<td></td>
				<td></td>
				<td><b>Php ${result.totalAmount}</b></td>
			</tr>			
		`;

		cartPage.innerHTML += 
		`
			<a href = "./checkOut.html?orderId=${result._id}" type="button" class="btn btn-info ">Checkout</a>
		`;

	} else {

		cartPage.innerHTML = 
		`
			<h1>Your current cart is empty. Our products are worth a try :-)</h1>
		`;

	}

})