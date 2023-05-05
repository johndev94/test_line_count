$("document").ready(function () {

    var e;
    var p;
    var id;
    var maxID;
    var email;
    var passWrd;
    const registerButton = document.getElementById("register");
    const loginButton = document.getElementById("login");
    const container = document.getElementById("container");
    var registerChecker = false;


    //for REGEX
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;


    registerButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
    });

    loginButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
    });

    //check if email is correct format
    $("#email").change(function () {
        let test = validate($("#email").val(), emailRegex);
        console.log();

        if (test == false) {
            document.getElementById("registerEmail").innerHTML = "Please use format joe123@outlook.ie";
            registerChecker = false;
        }
        else {
            $("#registerEmail").text("");
            console.log("reg = true");
            registerChecker = true;
            // document.getElementById("registerEmail").innerHTML = " ";
        }
    });

    //check if password is correct format 
    $("#regPass").change(function () {
        console.log("Handler for `keypress` called.");

        let test = validate($("#regPass").val(), passwordRegex);
        if (test == false) {
            registerChecker = false;
            $("#registerPassword").text("Require 8+ character password with symbol, upper/lowercase letter and number");
        }
        else {
            $("#registerPassword").text("");
            console.log("reg = true");
            registerChecker = true;
            // document.getElementById("registerEmail").innerHTML = " ";
        }
    });

    //check if passwords match
    $("#repeatPass").on("keypress", function () {
        console.log("Handler for `keypress` called.");

    });

    $("#loginBtn").click(function () {
        email = $("#user").val();
        passWrd = $("#pass").val();
        console.log(email);
        console.log(passWrd);
        $.getJSON(`http://localhost:3000/login`, function (data) {
            $.each(data, function (i, value) {
                if (value.email == email && value.password == passWrd && value.type == "customer") {
                    setCookie("customer", email, 30);
                    sessionStorage.setItem('user_id', value.ID);
                    window.location.replace("http://localhost:3000/index.html");
                }
                else if (value.email == email && value.password == passWrd && value.type == "admin") {
                    setCookie("admin", email, 30);
                    window.location.replace("http://localhost:3000/editScreenings.html");
                }
                else if (value.email == email && value.password == passWrd && value.type == "manager") {
                    setCookie("manager", email, 30);
                    alert("Logged in as manager");
                    window.location.replace("http://localhost:3000/report.html");
                    // re-direct to manager page
                }
            });
        });
    });


    $("#admin").click(function () {
        setCookie("admin", email, 30);
        window.location.replace("http://localhost:3000/editScreenings.html");
    });

    $("#manager").click(function () {
        setCookie("manager", email, 30);
        alert("Logged in as manager");
        window.location.replace("http://localhost:3000/report.html");
    });

    function validate(field, regex) {
        if (regex.test(field)) {
            return true;
        }
        else {
            return false;
        }
    }

    $("#registerBtn").click(function () {
        if (registerChecker == false) {
            alert("Please fill out your register information first")
        }
        else {
            e = $("#email").val();
            p = $("#regPass").val();
            var t = "customer"
            console.log(e);
            console.log(p);
            var taken;
            $.getJSON(`http://localhost:3000/login`, function (data) {
                console.log(data);
                $.each(data, function (i, value) {

                    if (e == value.email) {
                        taken = true;
                    }
                    else {
                        taken = false;
                    }
                });

                if (taken) {
                    RegisterAlert();
                }
                else {
                    $.post("http://localhost:3000/register", {
                        email: $("#email").val(),
                        password: $("#regPass").val(),
                        type: t
                    });

                    window.location.replace("http://localhost:3000/login.html");
                    alert("Succesfully registered");
                }
            });

        }
        window.location.reload();
    });


});
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function RegisterAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email is already registered with another account!'
    }).then(function () {
        window.location.reload();
    })
}
