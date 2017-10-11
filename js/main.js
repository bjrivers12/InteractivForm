var userNumInput = document.getElementById("cc-num");

function getUserInput(){
   return userNumInput.value;
}

//( !$("fieldset:eq(2) input").prop("checked"))

$("#payment").on("change", function() {
  var element = document.getElementById("payment");
  var stb = element.options[element.selectedIndex].value;
  if (stb == "select_method") {
    $("fieldset:eq(3) p:eq(0)").hide();
     $("fieldset:eq(3) p:eq(1)").hide();
    $("#credit-card").hide();
  } else if (stb == "credit card") {
    $("fieldset:eq(3) p:eq(0)").hide();
     $("fieldset:eq(3) p:eq(1)").hide();
    $("#credit-card").show();
  } else if (stb == "paypal")  {
    $("#credit-card").hide();
    $("fieldset:eq(3) p:eq(1)").hide();
    $("fieldset:eq(3) p:eq(0)").show();
  } else if (stb == "bitcoin")  {
    $("#credit-card").hide();
    $("fieldset:eq(3) p:eq(0)").hide();
     $("fieldset:eq(3) p:eq(1)").show();
  };
})

function checkActivities () {
  console.log("yes");
};

function verifyInputs () {

  let name = $("#name").val();
  let mail = $("#mail").val();
  let check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var element = document.getElementById("payment");
  var stb = element.options[element.selectedIndex].value;
  if((name == "" || name == null) && (mail == "" || mail == null || !check.test(mail)) && (stb == "credit card")) {
      alert("Email and Name are incorrect or incomplete");
      $('#mail').css('border-color','red');
      $('#name').css('border-color','red');
    checkActivities
  } else if((name == "" || name == null) && (mail !== "" || mail !== null || mail.includes("@"))) {
      alert("Name entry is blank");
      $('#name').css('border-color','red');
    } else if ((name !== "" || name !== null) && (mail == "" || mail == null || !mail.includes("@"))){
      alert("Email entry is blank or incorrect");
      $('#mail').css('border-color','red');
    } else {
      location.reload();
    }
  }


$( "form" ).submit(function( event ) {
  event.preventDefault();
  //verifyInputs();

});


function luhnCheck(){
  var ccNum = getUserInput(), ccNumSplit = ccNum.split(""), sum = 0;
  var singleNums = [], doubleNums = [], finalArry = undefined;
  var validCard = false;

  if((!/\d{15,16}(~\W[a-zA-Z])*$/g.test(ccNum)) || (ccNum.length > 16)){
     return false;
  }

  if(ccNum.length === 15){  //american express
     for(var i = ccNumSplit.length-1; i>=0; i--){
        if(i % 2 === 0){
           singleNums.push(ccNumSplit[i]);
        }else{
           doubleNums.push((ccNumSplit[i] * 2).toString());
        }
     }
  }else if(ccNum.length === 16){
     for(var i = ccNumSplit.length-1; i>=0; i--){
        if(i % 2 !== 0){
           singleNums.push(ccNumSplit[i]);
        }else{
           doubleNums.push((ccNumSplit[i] * 2).toString());
        }
     }
  }
  //joining makes an array to a string and I split them up again
  //so that every number is a single digit and convert back to array

  doubleNums = doubleNums.join("").split("");
  finalArry = doubleNums.concat(singleNums);

  for(var j = 0; j<finalArry.length; j++){
     sum += parseInt(finalArry[j]);
  }

  if(sum % 10 === 0){
     validCard = true;
  }
  //the console log is for you, so you can see the sum, all sums that are
  //divisible by 10 should be good.  Just open up your console to view.

  console.log(sum);
  return validCard;
  console.log(validCard);
};

//function zipCheck() {
//  let zipNum = getUserInput(zipNumInput);
//  let validZip = false;
//  if (/\d{5}(~\W[a-zA-Z])*$/g.test(zipNum))  {
//    return true;
//  }
//  return validZip;
//  console.log(validZip);
//};
//
//function ccvCheck() {
//  let ccvNum = getUserInput(ccNumInput);
//  let validccvNum = false;
//  if (/\d{5}(~\W[a-zA-Z])*$/g.test(zipNum))  {
//    return true;
//  }
//  return validccvNum;
//  console.log(validccvNum);
//};

document.getElementById("cc-num").addEventListener("blur", function(){
   if(luhnCheck()){
    $("#cc-num").css('border-color', 'red');
   }
}, false);


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


//Focus on first text box
$("#name").focus();
$("fieldset:eq(3) p:eq(0)").hide();
$("fieldset:eq(3) p:eq(1)").hide();

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


$("#payment").on("change", function() {
  var element = document.getElementById("payment");
  var stb = element.options[element.selectedIndex].value;
  if (stb == "select_method") {
    $("fieldset:eq(3) p:eq(0)").hide();
     $("fieldset:eq(3) p:eq(1)").hide();
    $("#credit-card").hide();
  } else if (stb == "credit card") {
    $("fieldset:eq(3) p:eq(0)").hide();
     $("fieldset:eq(3) p:eq(1)").hide();
    $("#credit-card").show();
  } else if (stb == "paypal")  {
    $("#credit-card").hide();
    $("fieldset:eq(3) p:eq(1)").hide();
    $("fieldset:eq(3) p:eq(0)").show();
  } else if (stb == "bitcoin")  {
    $("#credit-card").hide();
    $("fieldset:eq(3) p:eq(0)").hide();
     $("fieldset:eq(3) p:eq(1)").show();
  };
})

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

function displayTotal() {
      var total = totalCart();
       $("fieldset:eq(2)").append("<div id='total'></div>");
      if(total===0) {
        $("#total").html("");
      } else {
         $("#total").html("Total: $"+total);
      }
}

$("input[name='all']").change(function(event){
    if ($("input[name='all']").prop("checked")) {
      var item = {
        name:"all",
        price: Number(200)
        }
      cart.push(item);
      //var total = totalCart();
      console.log(totalCart());
      displayTotal();
    } else {
  removeItemFromCart("all");
   console.log(totalCart());
    displayTotal();
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
      displayTotal();
    } else {
  removeItemFromCart("js-frameworks");
   console.log(totalCart());
      $("input[name=express]").prop('disabled', false);
      displayTotal();
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
      displayTotal();
    } else {
  removeItemFromCart("js-libs");
   console.log(totalCart());
      $("input[name=node]").prop('disabled', false);
      displayTotal();
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
      displayTotal();
    } else {
  removeItemFromCart("express");
   console.log(totalCart());
      $("input[name=js-frameworks]").prop('disabled', false);
      displayTotal();
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
      displayTotal();
    } else {
  removeItemFromCart("node");
   console.log(totalCart());
      $("input[name=js-libs]").prop('disabled', false);
      displayTotal();
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
      displayTotal();
    } else {
  removeItemFromCart("build-tools");
   console.log(totalCart());
      displayTotal();
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
      displayTotal();

    } else {
  removeItemFromCart("npm");
   console.log(totalCart());
      displayTotal();
}
});
