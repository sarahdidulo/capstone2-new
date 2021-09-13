
let orderList = document.querySelector('.orderList');

fetch("https://pacific-falls-33363.herokuapp.com/api/orders/all-orders", {
	method: "GET",
	headers: {
		"Authorization": `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}).then(result=>result.json())
.then((result)=>{

	// fetch("")

	let orderTable; 

	result.forEach((order)=>{
		orderList.innerHTML += 
		`	<p>Name: ${order.userFirstName} ${order.userLastName}</p>
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
})