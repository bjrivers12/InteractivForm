//Focus on first text box
$("#name").focus();

//Hide bitcoin and paypal options and color option
$("fieldset:eq(3) p:eq(0)").hide();
$("fieldset:eq(3) p:eq(1)").hide();
$("#colors-js-puns").hide();

//Section for validating the credit card input section (card, zip, ccv)
function getUserInput(inputID) { // -> return any value based on id
  return document.getElementById(inputID).value;
}

function luhnCheck() { //-->Complex luhn check will use algorithm to prove a credit card is real
  let ccNum = getUserInput("cc-num"),
    ccNumSplit = ccNum.split(""),
    sum = 0;
  let singleNums = [],
    doubleNums = [],
    finalArry = undefined;
  let validCard = false;
  if ((!/\d{15,16}(~\W[a-zA-Z])*$/g.test(ccNum)) || (ccNum.length > 16)) {
    return false;
  }
  if (ccNum.length === 15) { //-->american express card test
    for (var i = ccNumSplit.length - 1; i >= 0; i--) {
      if (i % 2 === 0) {
        singleNums.push(ccNumSplit[i]);
      } else {
        doubleNums.push((ccNumSplit[i] * 2).toString());
      }
    }
  } else if (ccNum.length === 16) { //-->Other credit card
    for (var i = ccNumSplit.length - 1; i >= 0; i--) {
      if (i % 2 !== 0) {
        singleNums.push(ccNumSplit[i]);
      } else {
        doubleNums.push((ccNumSplit[i] * 2).toString());
      }
    }
  }
  //joining makes an array to a string and I split them up again
  //so that every number is a single digit and convert back to array
  doubleNums = doubleNums.join("").split("");
  finalArry = doubleNums.concat(singleNums);
  for (var j = 0; j < finalArry.length; j++) {
    sum += parseInt(finalArry[j]);
  }
  if (sum % 10 === 0) {
    validCard = true;
  }
  //the console log is for you, so you can see the sum, all sums that are
  //divisible by 10 should be good.  Just open up your console to view.
  return validCard;
};


//Manipulate the cart

function resetCC() {
  $("#cc-num").val() = "";
  $("#zip").val() = "";
  $("#ccv").val() = "";
}

$("#payment").on("change", function() { // -> change payment section based on dropdown
  var element = document.getElementById("payment");
  var stb = element.options[element.selectedIndex].value;
  if (stb == "select_method") {
    $("fieldset:eq(3) p:eq(0)").hide();
    $("fieldset:eq(3) p:eq(1)").hide();
    $("#credit-card").show();
  } else if (stb == "credit card") {
    $("fieldset:eq(3) p:eq(0)").hide();
    $("fieldset:eq(3) p:eq(1)").hide();
    $("#credit-card").show();
  } else if (stb == "paypal") {
    $("#credit-card").hide();
    $("fieldset:eq(3) p:eq(1)").hide();
    $("fieldset:eq(3) p:eq(0)").show();
    resetCC();
  } else if (stb == "bitcoin") {
    $("#credit-card").hide();
    $("fieldset:eq(3) p:eq(0)").hide();
    $("fieldset:eq(3) p:eq(1)").show();
    resetCC();
  };
});


//Final section to verify all input sections
function verifyInputs() {
  let message = "";

  //Name validation
  let name = $("#name").val();
  if ((name == "" || name == null)) {
    let nameMessage = "Name is blank\n";
    message += nameMessage
    $('#name').css('border-color', 'red');
  } else {
    $('#name').css('border-color', '#c1deeb');
  }

  //emailvalidation
  let mail = $("#mail").val(),
    //regular expression for emails
    check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (mail == "" || mail == null || !check.test(mail)) {
    let emailMessage = "Email is blank or incorrect\n";
    $('#mail').css('border-color', 'red');
    message += emailMessage;
  } else {
    $('#mail').css('border-color', '#c1deeb');
  }

  //activities Validation
  if (activitiesCheck()) {
    let activiesMessages = "No activities checked\n";
    $('.activities legend').css('color', 'red');
    message += activiesMessages;
  } else {
    $('.activities legend').css('color', ' #184f68');
  }

  //Credit card check

  let element = document.getElementById("payment");
  let stb = element.options[element.selectedIndex].value;
  if (stb == "credit card") {
    if (!luhnCheck()) {
      let CreditCardMessages = "Credit card is incorrect\n";
      $("#cc-num").css('border-color', 'red');
      message += CreditCardMessages;
    } else {
      $("#cc-num").css('border-color', '#184f68');
    }
  } else if (stb == "select_method") {
    let paymentMessage = "Please pick payment method";
    message += paymentMessage;
    $("fieldset:eq(3) legend").css('color', 'red');
  } else {
     $("fieldset:eq(3) legend").css('color', '#184f68');
  }

  //Final Message test
  if (message !== "") {
    alert(message);
  } else {
    location.reload();
  }
}


$("form").submit(function(event) {
  event.preventDefault();
  verifyInputs();
});


//Various checks

function zipCheck() {
  let zipNum = getUserInput("zip");
  let validZip = false;
  if (/\d{5}(~\W[a-zA-Z])*$/g.test(zipNum)) {
    return true;
  }
  return validZip;
};

var hasFired = false;
document.getElementById("zip").addEventListener("blur", function() {
  if (!zipCheck() && getUserInput("zip").length > 0 && !hasFired) {
    $("#zip").css('border-color', 'red');
    hasFired = true;
    alert("zip is incorrect");
  } else if (zipCheck()){
    hasFired = false;
    $("#zip").css('border-color', ' #184f68');
  }
}, true);


function activitiesCheck() {
  var n = $("input:checked").length;
  if (n <= 0) {
    return true;
  } else {
    return false;
  }
};

function ccvCheck() {
  let ccvNum = getUserInput("ccv");
  let validccvNum = false;
  if (/\d{5}(~\W[a-zA-Z])*$/g.test(ccvNum)) {
    validccvNum = true;
  }
  return validccvNum;
};

document.getElementById("ccv").addEventListener("blur", function() {
  if (!ccvCheck() && getUserInput("ccv").length > 0) {
    $("#ccv").css('border-color', 'red');
    alert("ccv incorrect length or data type");
  } else {
    $("#ccv").css('color', ' #184f68');
  }
}, false);

document.getElementById("cc-num").addEventListener("blur", function() {
  if (!luhnCheck() && getUserInput("cc-num").length > 0) {
    $("#cc-num").css('border-color', 'red');
//    alert("Credit card incorrect");
  } else {
    $("#cc-num").css('color', ' #184f68');
  }
}, false);


//Cart Manipulation
const cart = [];

function totalCart() { // -> return total cost
  var totalCost = 0;
  for (var i in cart) {
    totalCost += cart[i].price;
  }
  return totalCost;
}

function invalidate() { // -> function to compare to items in the car
  $(".activities input").each(function() {
    $(this).prop('disabled', false);
  });
  for (var i in cart) {
    let name = cart[i].name,
      time = cart[i].time;
    $(".activities input").each(function() {
      let name2 = $(this).attr("name"),
        lis = $(this).parent().text(),
        time2 = lis.substring(lis.indexOf(" — "), lis.indexOf(","));
      if (time == time2 && name !== name2) {
        $("input[name=" + name2 + "]").prop('disabled', true);
      }
    })
  }
}

function displayTotal() { //-->Display the total in the cart in the activities section
  var total = totalCart();
  $("fieldset:eq(2)").append("<div id='total'></div>");
  if (total === 0) {
    $("#total").html("");
  } else {
    $("#total").html("Total: $" + total);
  }
}

$(".activities input").change(function(event) { //-->Puts items in the cart or take them out
  event.preventDefault();
  if ($(this).prop("checked")) {
    let name = $(this).attr("name"),
      info = $(".activities input[name=" + name + "]").parent().text(),
      price = Number(info.substring(info.indexOf("$") + 1, info.indexOf("$") + 4)),
      time = info.substring(info.indexOf(" — "), info.indexOf(","));
    var item = {
      name: name,
      time: time,
      price: price,
    }
    cart.push(item);
    displayTotal();
    invalidate();
  } else {
    cart.splice(item);
    displayTotal();
    invalidate();
  }
});

//Job role input
$("#title").on("change", function() { //--> add job role input for other selection
  let element = document.getElementById("title"),
    stb = element.options[element.selectedIndex].value,
    input = "<form id='other-title'><div class='student-search'><input placeholder='Your Job Role'><button>Submit</button></div></form>";
  if (stb == "other") {
    $("fieldset:eq(0)").append(input);
  } else if (stb !== "other") {
    $("#other-title").remove();
  };
})

$('#selectId').val('0');

$("#design").on("change", function() { //--> Fuction to change the shirts
  var element = document.getElementById("design");
  var stb = element.options[element.selectedIndex].value;
  if (stb == "js puns") {
   $("#colors-js-puns").show();
    $("#color").val("cornflowerblue");
    $("option[value=tomato]").closest('option').hide();
    $("option[value=steelblue]").closest('option').hide();
    $("option[value=dimgrey]").closest('option').hide();
    $("option[value=cornflowerblue]").closest('option').show();
    $("option[value=darkslategrey]").closest('option').show();
    $("option[value=gold]").closest('option').show();
  } else if (stb == "heart js") {
    $("#colors-js-puns").show();
    $("#color").val("tomato");
    $("option[value=cornflowerblue]").closest('option').hide();
    $("option[value=darkslategrey]").closest('option').hide();
    $("option[value=gold]").closest('option').hide();
    $("option[value=tomato]").closest('option').show();
    $("option[value=steelblue]").closest('option').show();
    $("option[value=dimgrey]").closest('option').show();
  } else {
    $("#colors-js-puns").hide();
    $("option[value=cornflowerblue]").closest('option').show();
    $("option[value=darkslategrey]").closest('option').show();
    $("option[value=gold]").closest('option').show();
    $("option[value=tomato]").closest('option').show();
    $("option[value=steelblue]").closest('option').show();
    $("option[value=dimgrey]").closest('option').show();
  };
});
