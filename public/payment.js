$("document").ready(function () {

    const cardNumRegex = /(?:\d[ -]*?){13,16}/;
    const CVCRegex = /^\d{3}$/;
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
    const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const num = document.getElementById("cardNum");



    if (typeof (Storage) !== "undefined") {

        $("#cost").append("<b>€" + sessionStorage.getItem("cost") * sessionStorage.getItem("ticketAmt") + "</b>");
    }
    else {
        alert("No web storage available");
    }

    //checks if user_id is in session storage and posts the info to bookings, if no user_id; stores customerID as 0
    $("#payment").click(function (event) {
        if (sessionStorage.getItem('user_id')) {
            $.post("http://localhost:3000/bookings/add", {

                tickets: sessionStorage.getItem("ticketAmt"),
                screeningID: sessionStorage.getItem("ID"),
                customerID: sessionStorage.getItem("user_id"),
                cost: sessionStorage.getItem("cost")

            });
        } else {
            $.post("http://localhost:3000/bookings/add", {

                tickets: sessionStorage.getItem("ticketAmt"),
                screeningID: sessionStorage.getItem("ID"),
                customerID: 0,
                cost: sessionStorage.getItem("cost")

            });
        }
        alert("Booking saved!");
        sessionStorage.removeItem("ID");
        sessionStorage.removeItem("ticketAmt");
        sessionStorage.removeItem("cost");
        window.location.replace("index.html");
    });

    $("#cardNum").change(function () {
        let test = validate($("#cardNum").val(), cardNumRegex);

        if (test == false) {
            document.getElementById("cardNumberRegex").innerHTML = "You must use numbers and between 13-16 digits";
        }
        else {
            $("#cardNumberRegex").text("");
            console.log("reg = true");
        }
    });

    $("#cardName").change(function () {
        let test = validate($("#cardName").val(), nameRegex);

        if (test == false) {
            document.getElementById("nameRegex").innerHTML = "Name must be in formt 'John Doe'";
        }
        else {
            $("#nameRegex").text("");
            console.log("reg = true");
        }
    });

    $("#cardDate").change(function () {
        let test = validate($("#cardDate").val(), dateRegex);

        if (test == false) {
            document.getElementById("dateRegex").innerHTML = "Date must be in formt '12/23'";
        }
        else {
            $("#dateRegex").text("");
            console.log("reg = true");
        }
    })


    $("#cardCVC").change(function () {
        let test = validate($("#cardCVC").val(), CVCRegex);

        if (test == false) {
            document.getElementById("CVCRegex").innerHTML = "Digits must be 3 digits long";
        }
        else {
            $("#CVCRegex").text("");
            console.log("reg = true");
        }
    });

    function validate(field, regex) {
        if (regex.test(field)) {
            return true;
        }
        else {
            return false;
        }
    }

});