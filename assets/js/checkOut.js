
let params = new URLSearchParams(window.location.search);

let orderId = params.get('orderId');

console.log("orderId: ", orderId);

swal({
  title: "Are you sure?",
  text: "Please confirm payment.",
  icon: "warning",
  buttons: true
})
.then((willDelete) => {
  if (willDelete) {
  	fetch(`https://pacific-falls-33363.herokuapp.com/api/orders/${orderId}/checkout`, {
		method: "PUT",
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	}).then(result=>result.json())
	.then(result=>{
		console.log(result);
		if(result==true){
			//alert(`Order is successfully paid`);
		window.setTimeout(function() {
		    window.location.replace("./products.html");
		}, 2000);

		} else {
			alert(`Encountered an error. Please try again.`);
		}
	})

    swal("Thank you for choosing our products! Enjoy your coffee :-)", {
      icon: "success",
    });
  } else {
    swal("Order is not paid yet");
    window.location.replace('./currentOrder.html');
  }
});
