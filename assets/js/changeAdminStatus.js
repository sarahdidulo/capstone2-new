
let params = new URLSearchParams(window.location.search);

let userId = params.get('userId');

swal({
  title: "Are you sure you would like to make the user an admin?",
  text: "Click Ok to Confirm.",
  icon: "warning",
  buttons: true
})
.then((willDelete) => {
  if (willDelete) {
  	fetch(`https://pacific-falls-33363.herokuapp.com/api/users/${userId}/change-admin-status`, {
		method: "PUT",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type" : "application/json"
		}
	}).then(result=>result.json())
	.then(result=>{
		if(result==true){
			//alert(`Order is successfully paid`);
			swal("User was successfully granted Admin access.", {
			  icon: "success",
			});
			window.setTimeout(function() {
		    	window.location.replace("./allUsers.html");
			}, 2000);

		} else {
			swal(`Encountered an error. Please try again.`);
			window.setTimeout(function() {
		    	window.location.replace("./allUsers.html");
			}, 2000);
		}
	})
    
  } else {
    swal("User was not set to an admin.");
	window.setTimeout(function() {
    	window.location.replace("./allUsers.html");
	}, 2000);

  }
});
