const today = new Date();

const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

const formattedDate = `${dd}-${mm}-${yyyy}`;
const dateDefault = `${yyyy}-${mm}-${dd}`;
//date = date.replace(/\//g, '-');
$("document").ready(function () {
  console.log(formattedDate);
  $("#date").val(dateDefault);

  $.getJSON(`http://localhost:3000/nowShowing/${formattedDate}`, function (data) {
    console.log(data);

    if (data.length == 0) {
      $("#films").append(`<h3 style="font-size:24px; text-align: center;">NO FILMS ARE BEING SHOWED TODAY</h3>`);
    }
    else {
      $("#films").append(`<h3 style="font-size:24px;">NOW SHOWING TODAY</h3>`);

      $.each(data, function (index, value) {
        var currentTime = new Date();
        var screeningTime = new Date(dateDefault + 'T' + value.Time);

        if (screeningTime > currentTime) {
          if ($(`#${value.ID}`).length > 0) {
            // If it does, append the new time value to the existing text content
            $(`#${value.ID}`).html($(`#${value.ID}`).html() + `<br><br> <button class="timeBtns" value="${value.screeningID}"> ${value.Time}</button>`);
          } else {
            $("#films").append(`<hr style="size: 12px; background-color: black;">`);
            $("#films").append(`<div id="tab${index + 1}" class="col s12" style="margin-top: 50px;"> 
                  <div class="row"> <div class="col s12 m2 l2"> 
                  <div class="movieImage" style="" > <img src="covers/${value.ID}.png"> </div> </div>
                  <div class="col s12 m7 l8"> <h3 style="font-size:24px;">${value.filmName}</h3> 
                  <div class="movieDuration" style="text-align: left; margin-bottom: 20px; margin-left: 0px; padding-top: 14px; vertical-align: middle"> <img src="images/${value.ageRating}.png"> ${value.runtime} minutes </div>
                  <div class="movieDescription" style="margin-top: 70px;"> ${value.description} </div> </div>
                  <div class="col s12 m2 l2" class="time" id="${value.ID}"> <button class="timeBtns" value="${value.screeningID}"> ${value.Time}</button> </div> </div>`);
          }
        }
      });
      $(".timeBtns").click(function (e) {
        var id = e.target.value;
        console.log(id);
        sessionStorage.setItem("ID", id);
        window.location.replace("bookingDetails.html");
      });
    }
  });


  $("#dateBtn").click(function () {
    $("#datePicker").show();
  });

  $("#todayBtn").click(function () {
    window.location.reload();
  });

  $("#date").change(function () {
    $("#films").empty();
    var selectedDate = $("#date").val();
    var dateObj = new Date(selectedDate);

    var day = String(dateObj.getDate()).padStart(2, '0');
    var month = String(dateObj.getMonth() + 1).padStart(2, '0');
    var year = String(dateObj.getFullYear());

    var dateFormatted = `${day}-${month}-${year}`;
    var yearFirst = `${year}-${month}-${day}`;

    console.log(dateFormatted);

    $.getJSON(`http://localhost:3000/nowShowing/${dateFormatted}`, function (data) {
      console.log(data);
      if (data.length == 0) {
        $("#films").append(`<h3 style="font-size:24px; text-align: center;">NO FILMS ARE BEING SHOWED ON ${dateFormatted}</h3>`);
      }
      else {
        $("#films").append(`<h3 style="font-size:24px;">NOW SHOWING ON ${dateFormatted}</h3>`);

        $.each(data, function (index, value) {
          var currentTime = new Date();
          var screeningTime = new Date(yearFirst + 'T' + value.Time);

          if (screeningTime > currentTime) {
            if ($(`#${value.ID}`).length > 0) {
              // If it does, append the new time value to the existing text content
              $(`#${value.ID}`).html($(`#${value.ID}`).html() + `<br><br> <button class="timeBtns" value="${value.screeningID}"> ${value.Time}</button>`);
            } else {
              $("#films").append(`<hr style="size: 12px; background-color: black;">`);
              $("#films").append(`<div id="tab${index + 1}" class="col s12" style="margin-top: 50px;"> 
                <div class="row"> <div class="col s12 m2 l2"> 
                <div class="movieImage" style="" > <img src="covers/${value.ID}.png"> </div> </div>
                <div class="col s12 m7 l8"> <h3 style="font-size:24px;">${value.filmName}</h3> 
                <div class="movieDuration" style="text-align: left; margin-bottom: 20px; margin-left: 0px; padding-top: 14px; vertical-align: middle"> <img src="images/${value.ageRating}.png"> ${value.runtime} minutes </div>
                <div class="movieDescription" style="margin-top: 70px;"> ${value.description} </div> </div>
                <div class="col s12 m2 l2" class="time" id="${value.ID}"> <button class="timeBtns" value="${value.screeningID}"> ${value.Time}</button> </div> </div>`);
            }
          }
        });
        $(".timeBtns").click(function (e) {
          var id = e.target.value;
          console.log(id);
          sessionStorage.setItem("ID", id);
          window.location.replace("bookingDetails.html");
        });
      }
    });
  });
});
