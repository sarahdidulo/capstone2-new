
let registerUser = document.querySelector("#fillUserData");

registerUser.addEventListener("submit", (e)=> {

	e.preventDefault();

	let email = document.querySelector('#email').value;
	let password = document.querySelector('#password').value;
	let password2 = document.querySelector('#password2').value;
	let firstName = document.querySelector('#firstName').value;
	let lastName = document.querySelector('#lastName').value;

	if(password == password2 && email != "" && password != "" && password != "" ){

		fetch("https://pacific-falls-33363.herokuapp.com/api/users/check-email", {
			method: "POST",
			headers: {
				"Content-type" : "application/json"
			},
			body: JSON.stringify(
				{
					email: email
				}
			) 
		}).then(result=>result.json())
		.then((result)=> {
			if(result == false){ //meaning the email is not found, and the email can be used to register

				fetch("https://pacific-falls-33363.herokuapp.com/api/users/register", {

					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify(
						{
							firstName: firstName,
							lastName: lastName,
							email: email,
							password: password	
						}
					)

				}).then(result=>result.json())
				.then((result)=>{
					if(result == true){ //meaning user has been successfuly created
						swal("User has been successfully created");
						window.setTimeout(function() {
					    	window.location.replace("./login.html");
						}, 2000);
					} else {
						swal("Not registered successfully");
					}
				})

			} else {
				alert("Email is invalid")
			}
		})

	} else if(password != password2){
		alert("Passwords did not match. Please try again.");
	} else {
		alert("Please input the required fields");
	}

})

