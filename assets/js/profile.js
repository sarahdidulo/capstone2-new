
let profilePage = document.querySelector('.profilePage');


fetch("https://pacific-falls-33363.herokuapp.com/api/users/get-profile", {
	method: "GET",
	headers: 
		{
			"Authorization" : `Bearer ${token}`
		}
}).then(result=>result.json())
.then((result)=> {	

	profilePage.innerHTML += 
	`
		<p class = "profileName">Name: ${result.firstName} ${result.lastName}</p>
		<p class = "profileEmail">Email: ${result.email}</p>
		
	`
	if(adminStatus == "false"){
		profilePage.innerHTML +=
		`
			<h2>Order History:</h2>
		`;
	}

	fetch(`https://pacific-falls-33363.herokuapp.com/api/orders/order-history`, {
		method: "GET",
		headers: {
			"Authorization" : `Bearer ${token}`,
			"Content-Type" : "application/json"
		}
	}).then(result=>result.json())
	.then((result)=>{

		let orderTable; 

		result.forEach((order)=>{
			profilePage.innerHTML += 
			`
				<p class = "orderId">Order ID: ${order._id}</p>
				<p>Purchased On: ${order.purchasedOn}</p>
				<table class = "table table-bordered" id = "currentOrder-${order._id}">
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

			orderTable = document.querySelector(`#currentOrder-${order._id}`);

			order.products.forEach(
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
					<td><b>Php ${order.totalAmount}</b></td>
				</tr>			
			`;
		})

		

	}) // end of then

	
})