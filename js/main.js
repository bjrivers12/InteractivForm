var cart = [];

function Session(name, day, price, begin, end) {
  this.name = name;
  this.day = day;
  this.price = price;
  this.begin = begin;
  this.end = end;
}

function addItemToCart(name, day, price, begin, end) {
  var item = new Session(name, day, price, begin, end);
  cart.push(item);
  //  saveCart();
}


function totalCart() { // -> return total cost
  var totalCost = 0;
  for (var i in cart) {
    totalCost += cart[i].price;
  }
  return totalCost;
}

function listCart() { //-> array of Items
  var cartCopy = [];
  for (var i in cart) {
    var item = cart[i];
    var itemCopy = {};
    for (var p in item) {
      itemCopy[p] = item[p];
    }
    cartCopy.push(itemCopy);
  }
  return cartCopy;
}

//function checkTime () {
//  for (var i in cart) {
//    var start = cart[i].begin;
//    var weekday = cart[i].day;
//  }
//  var result = activities.filter(function(v, i) {
//  return (v["begin"] == start && i["day"] == weekday);
//    console.log(result);
//})
//}

//function saveCart() {
//  localStorage.setItem("shoppingCart", JSON.stringify(cart))
//}

//function loadCart() {
//  cart = JSON.parse(localStorage.getItem("shoppingCart"));
//}

//loadCart();

//var array = listCart();
//console.log(array);

//Focus on first text box
$("#name").focus();

//add job role input for other selection
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

//change values based off selection
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

//

function removeItemFromCart(name) {
  // removes one item
  for (var i in cart) {
    if(cart[i].name === name) {

        cart.splice(i, 1);
      }
      break;
    }
  }
//  saveCart();


$("input[name='all']").change(function(event){
    if ($("input[name='all']").prop("checked")) {
      var item = {
        name:"all",
        price: Number(200)
        }
      cart.push(item);
      console.log(totalCart());
    } else {
  removeItemFromCart("all");
   console.log(totalCart());
}
});

$("input[name='js-frameworks']").change(function(event){
    if ($("input[name='js-frameworks']").prop("checked")) {
      var item = {
        name:"js-frameworks",
    day: "tuesday",
    price: 100,
    begin:900,
    end:1200}
      cart.push(item);
      console.log(totalCart());
      $("input[name=express]").prop('disabled', true);

    } else {
  removeItemFromCart("js-frameworks");
   console.log(totalCart());
      $("input[name=express]").prop('disabled', false);
}
});

$("input[name='js-libs']").change(function(event){
    if ($("input[name='js-libs']").prop("checked")) {
      var item =  {name:"js-libs",
    day:"tuesday",
    price: 100,
    begin:1300,
    end:1600}
      cart.push(item);
      console.log(totalCart());
      $("input[name=node]").prop('disabled', true);

    } else {
  removeItemFromCart("js-libs");
   console.log(totalCart());
      $("input[name=node]").prop('disabled', false);
}
});


$("input[name='express']").change(function(event){
    if ($("input[name='express']").prop("checked")) {
      var item =  {name:"express",
    day:"tuesday",
    price: 100,
    begin: 900,
    end: 1200}
      cart.push(item);
      console.log(totalCart());
      $("input[name=js-frameworks]").prop('disabled', true);

    } else {
  removeItemFromCart("express");
   console.log(totalCart());
      $("input[name=js-frameworks]").prop('disabled', false);
}
});



$("input[name='node']").change(function(event){
    if ($("input[name='node']").prop("checked")) {
      var item = {name:"node",
    day:"tuesday",
    price: 100,
    begin:1300,
    end:1600 }
      cart.push(item);
      console.log(totalCart());
      $("input[name=js-libs]").prop('disabled', true);

    } else {
  removeItemFromCart("node");
   console.log(totalCart());
      $("input[name=js-libs]").prop('disabled', false);
}
});


$("input[name='build-tools']").change(function(event){
    if ($("input[name='build-tools']").prop("checked")) {
      var item =
          {name:"build-tools",
    day: "wednesday",
    price: 100,
    begin: 900,
    end: 1200}
      cart.push(item);
      console.log(totalCart());

    } else {
  removeItemFromCart("build-tools");
   console.log(totalCart());
}
});

$("input[name='npm']").change(function(event){
    if ($("input[name='npm']").prop("checked")) {
      var item =
          {name:"npm",
    day:"wednsday",
    price: 100,
    begin: 1300,
    end: 1600}
      cart.push(item);
      console.log(totalCart());

    } else {
  removeItemFromCart("npm");
   console.log(totalCart());
}
});

// $(".activities input").change(function(event) {
//     event.preventDefault();
//     if ($("input[name='all']").prop("checked")) {
// var item = {
//   "name":"all",
//   "price": Number(200)
// }
//       cart.push(item);
//     } else if ($("input[name='js-frameworks']").prop("checked")) {
//       var item = {
//         "name":"js-frameworks",
//         "day":"tuesday",
//         "price": Number(100),
//         "begin":900,
//         "end":1200
//       }
//       cart.push(item);
//     }
    //     var name = "js-frameworks";
    //     var day = "tuesday";
    //     var price = Number(100);
    //     var begin = 900;
    //     var end = 1200;
    //     var item = new Session(name, day, price, begin, end);
    //     cart.push(item);
    //   } else if ($("input[name='js-libs']").prop("checked")) {
    //     var name = "js-libs";
    //     var day = "tuesday";
    //     var price = Number(100);
    //     var begin = 1300;
    //     var end = 1600;
    //     var item = new Session(name, day, price, begin, end);
    //     cart.push(item);
    //   } else if ($("input[name='express']").prop("checked")) {
    //     var name = "express";
    //     var day = "tuesday";
    //     var price = Number(100);
    //     var begin = 900;
    //     var end = 1200;
    //     var item = new Session(name, day, price, begin, end);
    //     cart.push(item);
    //   } else if ($("input[name='node']").prop("checked")) {
    //     var name = "node";
    //     var day = "tuesday";
    //     var price = Number(100);
    //     var begin = 1300;
    //     var end = 1600;
    //     var item = new Session(name, day, price, begin, end);
    //     cart.push(item);
    //   } else if ($("input[name='build-tools']").prop("checked")) {
    //     var name = "build-tools";
    //     var day = "wednesday";
    //     var price = Number(100);
    //     var begin = 900;
    //     var end = 1200;
    //     var item = new Session(name, day, price, begin, end);
    //     cart.push(item);
    //   } else if ($("input[name='npm']").prop("checked")) {
    //     var name = "npm";
    //     var day = "wednesday";
    //     var price = Number(100);
    //     var begin = 1300;
    //     var end = 1600;
    //     var item = new Session(name, day, price, begin, end);
    //     cart.push(item);
    //   }
//    });


console.log(totalCart());
//  var name = $(this).attr("name");
//  console.log("this " + name);
//  var result = activities.filter(function( obj ) {
//     return obj.name == name;
//    });
//   console.log(result);
//   cart.concat(result);
//   console.log(cart);
// // $(".credit-card").html("result "+cart.name);
//
// //  console.log(result);
// //  var name = result.name;
//   var day = result.day;
//   var price = Number(result.price);
//   console.log("price " + price);
//   console.log("day " + day);
//  var begin = Number(result.begin);
//  var end = Number(result.end);
//
//  console.log(item);
////  addItemToCart(name, day, price, begin, end);
//  console.log(cart);
//  var total = Number(totalCart());
// //  console.log(total);
// $(".credit-card").html("result " + total);
// });




//loadCart();
//displayCart();
