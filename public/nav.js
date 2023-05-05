$("document").ready(function () {
    $('head').append('<link rel="preconnect" href="https://fonts.googleapis.com">' +
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
        '<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap" rel="stylesheet">');

    $('body').append('<div>' +
        '<div class="wave"></div>' +
        '<div class="wave"></div>' +
        '<div class="wave"></div>' +
        '</div>');

    if (getCookie("customer") == "" && getCookie("admin") == "" && getCookie("manager") == "") {
        $("#nav").html(
            "<ul>" +


            "<li><a href='index.html'>Home</a></li>" +
            "<li><a href='screenings.html'>Now Showing</a></li>" +
            "<li><a href='reviews.html'>Reviews</a> </li>" +
            "<li><a href='login.html'>Log In</a></li>" +
            "</ul>");
    }
    else {
        if (getCookie("customer") != "") {
            //alert("Hello customer");
            $("#nav").html(
                "<ul>" +
                "<img src='images/cinemaLogo.png' alt='Dev Game Reviews Logo' height='30'></img>" +
                "<li></li>" +
                "<li><a href='index.html'>Home</a></li>" +
                "<li><a href='screenings.html'>Now Showing</a></li>" +
                "<li><a href='reviews.html'>Reviews</a> </li>" +
                "<li><a href='account.html'>Account</a></li>" +
                "<li><a href='logout.html'>Logout</a></li>" +
                "</ul>");

            $("#footer").html($("#footer").html() + "<br>" +

                "<br>" +
                "<p style='text-align:center'>&copy; Copyright 2023 - Team project: Group 4</p>");
        }
        else if (getCookie("admin") != "") {
            $("#nav").html(
                "<ul>" +

                "<li></li>" +
                "<li><a href='editMovies.html'>Edit Movies</a> </li>" +
                "<li id='test'><a href='editScreenings.html'>Edit Screenings</a></li>" +
                "<li><a href='editAccounts.html'>Edit Users</a></li>" +
                "<li><a href='logout.html'>Logout</a></li>" +
                "</ul>");

            $("#footer").html($("#footer").html() + "<br>" +

                "<br>" +
                "<p style='text-align:center'>&copy; Copyright 2023 - Team project: Group 4</p>");
        }
        else if (getCookie("manager") != "") {
            $("#nav").html(
                "<ul>" +
                "<li></li>" +
                "<li><a href='report.html'>Report</a></li>" +
                "<li><a href='logout.html'>Logout</a></li>" +
                "</ul>");

            $("#footer").html($("#footer").html() + "<br>" +

                "<br>" +
                "<p style='text-align:center'>&copy; Copyright 2023 - Team project: Group 4</p>");

            }
    }

});
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
