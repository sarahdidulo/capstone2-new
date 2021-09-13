localStorage.clear();


let logUser = document.querySelector("#fillUserData");


logUser.addEventListener("submit", (e) => {

	e.preventDefault();

	let email = document.querySelector("#email").value;
	let password = document.querySelector("#password").value;
	//alert(email);
	if(email != "" || password != ""){
		
		fetch("https://pacific-falls-33363.herokuapp.com/api/users/login", {

			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})

		}).then(result=>result.json())
		.then((result)=>{
			//console.log("result after then", result);
			//return result;
			//alert("here");
			if(result == false){
				alert("Either the Email or password is incorrect. Please try again");
			} else if(result){
				localStorage.setItem("token", result.access);

				fetch("https://pacific-falls-33363.herokuapp.com/api/users/get-profile", {
					method: "GET",
					headers: 
						{
							"Authorization" : `Bearer ${result.access}`
						}
				}).then(result=>result.json())
				.then((result)=> {
					console.log("logged in user after alert", result);
					//swal("Successfully logged in");

					localStorage.setItem("id", result._id);
					localStorage.setItem("isAdmin", result.isAdmin);
					window.location.replace("./index.html");
					
				})
			}
		})


	} else {
		alert("Please fill out the required fields");
	}

})