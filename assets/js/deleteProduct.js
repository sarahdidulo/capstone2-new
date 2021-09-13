
let params = new URLSearchParams(window.location.search);

let prodId = params.get('prodId');

//let token = localStorage.getItem("token");




swal({
  title: "Are you sure you would like to delete the item?",
  text: "Please confirm.",
  icon: "warning",
  buttons: true
})
.then((willDelete) => {
  if (willDelete) {
  	fetch(`https://pacific-falls-33363.herokuapp.com/api/products/${prodId}/delete`, {
  			method: "DELETE",
  			headers: {
  				"Authorization": `Bearer ${token}`,
  			}
  		}).then(result=>result.json())
  		.then(result=>{
  			console.log(result);
  			if(result==true){
  				swal("Product was successfully deleted", {
  				  icon: "success",
  				});
  				window.location.replace("./products.html");
  			} else {
  				swal(`Product was not deleted. Please try again`);
  			}
  		})

    
  } else {
  	swal("Product was not deleted");
    window.location.replace('./currentOrder.html');
  }
});