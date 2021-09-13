//let userToken = "";


let navbar = document.querySelector(".navbar-nav");

let userToken = localStorage.getItem("token");
let adminStatus = localStorage.getItem("isAdmin");

let cartCounter = localStorage.getItem("cartCount");


// let counter = localStorage.getItem("cartCount");
// cartCount.innerHTML = 
// `
// 	${counter}
// `;

let token = localStorage.getItem("token");


if(userToken == null){
	navbar.innerHTML += 
	`
		<a class="nav-link text-sm-left" href = "./login.html">Login</a>
		<a class="nav-link text-sm-left" href = "./register.html">Register</a>
	`;
} else if (userToken != null && adminStatus == "false") { 
			//alert("hey");
			navbar.innerHTML += 
			`
				<a class="nav-link text-sm-left" href = "./currentOrder.html">Cart<span id = "cartCount" class = "badge badge-danger"></span></a>
				<a class="nav-link text-sm-left" href = "./profile.html">Profile</a>
				<a class="nav-link text-sm-left" href = "./login.html">Log Out</a>
			`;
} else if(userToken != null && adminStatus == "true"){
		//alert("hey");
			navbar.innerHTML +=
			`
				<a class="nav-link text-sm-left" href = "./orders.html">Orders</a>
				<a class="nav-link text-sm-left" href = "./allUsers.html">Users</a>
				<a class="nav-link text-sm-left" href = "./profile.html">Profile</a>
				<a class="nav-link text-sm-left" href = "./logout.html">Log Out</a>	
			`;
}

let cartCount = document.querySelector("#cartCount");

fetch("https://pacific-falls-33363.herokuapp.com/api/orders/current-order", {
	method: "GET",
	headers: {
		"Authorization" : `Bearer ${token}`,
		"Content-Type" : "application/json"
	}
}).then(result=>result.json())
.then((result)=>{
	if(result != false){
		localStorage.setItem("cartCount", result.cartCount);
		let counter = localStorage.getItem("cartCount");
		console.log(userToken);
		if(localStorage.getItem("token") != null && counter != null){
			console.log("counter value", counter);
			cartCount.innerHTML = 
			`
				${counter}
			`;		
		} else if(localStorage.getItem("token") == null){
			cartCount.innerHTML = "";

		}
	}
	
});


