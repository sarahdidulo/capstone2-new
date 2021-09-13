
let userTable = document.querySelector('.userTable');
let admin = "";
let disable = "";

fetch("https://pacific-falls-33363.herokuapp.com/api/users/get-all-users", {
	method: "GET",
	headers: {
		"Authorization" : `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}).then(result=>result.json())
.then((result)=>{

	result.forEach(
		(user)=>{
			console.log(user.isAdmin);
			if(user.isAdmin == "true"){
				admin = "Admin";
				disable = "disabled";
			} else if(user.isAdmin == "false"){
				admin = "Non-admin";
				disable = "";
			}

			userTable.innerHTML += 
			`
				<tr>
					<td>${user._id}</td>
					<td>${user.firstName}</td>
					<td>${user.lastName}</td>
					<td>${user.email}</td>
					<td>${admin}</td>
					<td><a href = "./changeAdminStatus.html?userId=${user._id}" class = "${disable} btn btn-info">Make Admin</a></td>
				</tr>
			`

	})
})