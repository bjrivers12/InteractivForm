const userNumInput = document.getElementById("cc-num");

function getUserInput() {
  return userNumInput.value;
}

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
  } else if (stb == "paypal") {
    $("#credit-card").hide();
    $("fieldset:eq(3) p:eq(1)").hide();
    $("fieldset:eq(3) p:eq(0)").show();
  } else if (stb == "bitcoin") {
    $("#credit-card").hide();
    $("fieldset:eq(3) p:eq(0)").hide();
    $("fieldset:eq(3) p:eq(1)").show();
  };
})

function verifyInputs() {
  let message = "";
  let name = $("#name").val();
  let letters = /^[a-zA-Z]+$/;
  let mail = $("#mail").val();
  //regular expression for emails
  let check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var element = document.getElementById("payment");
  var stb = element.options[element.selectedIndex].value;
  if (name == "" || name == null||!letters.test(name))  {
    let nameMessage = "Name is blank";
    $('#name').css('border-color', 'red');
  } else {
    let nameMessage = "";
    $('#name').css('border-color', '#c1deeb');
  }
  if (mail == "" || mail == null || !check.test(mail)) {
    let emailMessage = "Email is blank or incorrect<br>";
     $('#mail').css('border-color', 'red');
  } else {
    $('#mail').css('border-color', '#c1deeb');
  }
  if (activitiesCheck()) {
    let activiesMessages = "No activities checked";
    $('.activities legend').css('color', 'red');
  } else {
    $('.activities legend').css('color', ' #184f68');
  }
  let errorMessage = nameMessage + "\n" + emailMessage + "\n" + activiesMessages;
  if (errorMessage == "")  {
    alert(errorMessage);
  } else {
    location.reload();
  }
}


$("form").submit(function(event) {
  event.preventDefault();
  verifyInputs();
});


function lengthCheck() {
  let ccNum = getUserInput(),
  let validCard = false;
  var numbers = /^[0-9]+$/;
  if ((numbers.test(ccNum)) ) {
    return false;
  }
};

  if (ccNum.length === 15) { //american express
    for (var i = ccNumSplit.length - 1; i >= 0; i--) {
      if (i % 2 === 0) {
        singleNums.push(ccNumSplit[i]);
      } else {
        doubleNums.push((ccNumSplit[i] * 2).toString());
      }
    }
  } else if (ccNum.length === 16) {
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

  console.log(sum);
  return validCard;
  console.log(validCard);
};







function luhnCheck() {
  let ccNum = getUserInput(),
    ccNumSplit = ccNum.split(""),
    sum = 0;
  let singleNums = [],
    doubleNums = [],
    finalArry = undefined;
  let validCard = false;
  if ((!/\d{15,16}(~\W[a-zA-Z])*$/g.test(ccNum)) || (ccNum.length > 16)) {
    return false;
  }

  if (ccNum.length === 15) { //american express
    for (var i = ccNumSplit.length - 1; i >= 0; i--) {
      if (i % 2 === 0) {
        singleNums.push(ccNumSplit[i]);
      } else {
        doubleNums.push((ccNumSplit[i] * 2).toString());
      }
    }
  } else if (ccNum.length === 16) {
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

  console.log(sum);
  return validCard;
  console.log(validCard);
};



function zipCheck() {
  let zipNum = getUserInput(zipNumInput);
  let validZip = false;
  if (/\d{5}(~\W[a-zA-Z])*$/g.test(zipNum))  {
    return true;
  }
  return validZip;
  console.log(validZip);
};

function activitiesCheck() {
  var n = $( "input:checked" ).length;
   if(n <= 0) {
     return true;
   } else {
    return false;
   }
};

function ccvCheck() {
  let ccvNum = getUserInput(ccNumInput);
  let validccvNum = false;
  if (/\d{5}(~\W[a-zA-Z])*$/g.test(zipNum))  {
    return true;
  }
  return validccvNum;
  console.log(validccvNum);
};



document.getElementById("cc-num").addEventListener("blur", function() {
  if (!luhnCheck()) {
    $("#cc-num").css('border-color', 'red');
    alert("Credit card incorrect");
  }
}, false);

const cart = [];

function totalCart() { // -> return total cost
  var totalCost = 0;
  for (var i in cart) {
    totalCost += cart[i].price;
  }
  return totalCost;
}

function invalidate() { // -> return total cost
   $(".activities input").each(function() {
     $(this).prop('disabled', false);
   });
  for (var i in cart) {
    let name = cart[i].name;
    let time = cart[i].time;
    $(".activities input").each(function() {
        let name2 = $(this).attr("name");
        let lis = $(this).parent().text();
        let time2 = lis.substring(lis.indexOf(" — "), lis.indexOf(","));
      if (time == time2 && name !== name2) {
          $("input[name=" + name2 + "]").prop('disabled', true);
        }
    })
  }
}


$(".activities input").change(function(event) {
      event.preventDefault();
      if ($(this).prop("checked")) {
        let name = $(this).attr("name");
        console.log(name);
        let info = $(".activities input[name=" + name + "]").parent().text();
        let price = Number(info.substring(info.indexOf("$") + 1, info.indexOf("$") + 4));
        let time = info.substring(info.indexOf(" — "), info.indexOf(","));
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
      }
    );

    //Focus on first text box
    $("#name").focus(); $("fieldset:eq(3) p:eq(0)").hide(); $("fieldset:eq(3) p:eq(1)").hide();

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
      } else if (stb == "paypal") {
        $("#credit-card").hide();
        $("fieldset:eq(3) p:eq(1)").hide();
        $("fieldset:eq(3) p:eq(0)").show();
      } else if (stb == "bitcoin") {
        $("#credit-card").hide();
        $("fieldset:eq(3) p:eq(0)").hide();
        $("fieldset:eq(3) p:eq(1)").show();
      };
    })


    function displayTotal() {
      var total = totalCart();
      $("fieldset:eq(2)").append("<div id='total'></div>");
      if (total === 0) {
        $("#total").html("");
      } else {
        $("#total").html("Total: $" + total);
      }
    }
