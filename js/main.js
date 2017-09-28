var cart = [];

function addItemToCart(name, day, price, begin, end) {
	for (var i in cart) {
		if (cart[i].name === name) {
			cart[i].count += count;
			return;
		}
	}
	var item = new Item(name, day, price, begin, end);
	cart.push(item);
	saveCart();
}

function totalCart() { // -> return total cost
	var totalCost = 0;
	for (var i in cart) {
		totalCost += cart[i].price;
	}
	return totalCost;
}


//Focus on first text box
$("#name").focus();

//create other section for career
$("#title").on("change", function() {
	var element = document.getElementById("title");
	var stb = element.options[element.selectedIndex].value;
	var input = "<form id='other-title'><div class='student-search'><input placeholder='Your Job Role'>    <button>Submit</button></div></form>";
	if (stb == "other") {
		$("fieldset:eq(0)").append(input);
	} else if (stb !== "other") {
		$("#other-title").remove();
	};
})

//seperate section for page
$("#design").on("change", function() {
	var element = document.getElementById("design");
	var stb = element.options[element.selectedIndex].value;
	if (stb == "js puns") {
		$("option[value=tomato]").closest('option').remove();
		$("option[value=steelblue]").closest('option').remove();
		$("option[value=dimgrey]").closest('option').remove();
		$("option[value=cornflowerblue]").closest('option').show();
		$("option[value=darkslategrey]").closest('option').show();
		$("option[value=gold]").closest('option').show();
	} else if (stb == "heart js") {
		$("option[value=cornflowerblue]").closest('option').remove();
		$("option[value=darkslategrey]").closest('option').remove();
		$("option[value=gold]").closest('option').remove();
		$("option[value=tomato]").closest('option').show();
		$("option[value=steelblue]").closest('option').show();
		$("option[value=dimgrey]").closest('option').show();
	} else {
		$("option[value=cornflowerblue]").closest('option').show();
		$("option[value=darkslategrey]").closest('option').show();
		$("option[value=gold]").closest('option').show();
		$("option[value=tomato]").closest('option').show();
		$("option[value=steelblue]").closest('option').show();
		$("option[value=dimgrey]").closest('option').show();
	};
})

//if($("input[name=all]").prop( "checked" )){
//$("input[name=node]").prop('disabled', true);
//}

//$("input[name=all]").change(function() {
//
//console.log($("input[name=all]").prop( "checked" ));
//
//  if($("input[name=all]").prop( "checked" )) {
//
//
//  $("input[name=node]").prop('disabled', true);
//    $("input[name=all]").prop('disabled', true);
//
//
//  } else {
//
//  $("input[name=node]").prop('disabled', false);
//  $("input[name=all]").prop('disabled', false);
//  }
//  });



$(".activities input").click(function(event) {
	event.preventDefault();
	var name = $(this).attr("name");
	console.log("this " + name);
	var result = activities.filter(function(obj) {
		return obj.name == name;
	});
	var name = result.name;
	console.log(result.name);
	var day = result.day;
	var price = Number(result.price);
	var begin = Number(result.begin);
	var end = Number(result.end);
	addItemToCart(name, day, price, begin, end);
	console.log(cart);
	var total = totalCart();
	console.log(total);
});

console.log("howdy")


//loadCart();
//displayCart();


$(".activities input").click(function(event) {
event.preventDefault();
if ($("input[name='all']").prop("checked")) {
	var name = "all";
	var price = Number(200);
	var item = new Session(name, day, price, begin, end);
	cart.push(item);
} else if ($("input[name='js-frameworks']").prop("checked")) {
	var name = "js-frameworks";
	var day = "tuesday";
	var price = Number(100);
	var begin = 900;
	var end = 1200;
} else if ($("input[name='js-libs']").prop("checked")) {
	var name = "js-libs";
	var day = "tuesday";
	var price = Number(100);
	var begin = 1300;
	var end = 1600;
} else if ($("input[name='express']").prop("checked")) {
	var name = "express";
	var day = "tkuesday";
	var price = Number(100);
	var begin = 900;
	var end = 1200;
} else if ($("input[name='node']").prop("checked")) {
	var name = "node";
	var day = "tuesday";
	var price = Number(100);
	var begin = 1300;
	var end = 1600;
} else if ("input[name='build-tools']").prop("checked")) {
var name = "build-tools";
var day = "wednesday";
var price = Number(100);
var begin = 900;
var end = 1200;
} else if ("input[name='npm']").prop("checked")) {
var name = "npm";
var day = "wednesday";
var price = Number(100);
var begin = 1300;
var end = 1600
}
});
