$("document").ready(function () {

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  console.log(id);

  const today = new Date();

  $.getJSON(`http://localhost:3000/movieDetails/${id}`, function (data) { 

    $.each(data, function (index, value) {
      $("#filmContent").append(`<div style="float: left; margin-right: 20px;"><img src="covers/${value.ID}.png"></div>`);
      $("#filmContent").append(`<div style="float: left; width: 400px;"><h1>${value.filmName}</h1><h1>Runtime: ${value.runtime}</h1><h1><img src="images/${value.ageRating}.png"></h1><p style="font-size: 23px;">${value.description}</p></div>`);
      $("#filmContent").append(`<br style="clear: left;">`);
      $("#filmContent").append(`<br style="float: left;">`);
      $("#filmContent").append(`<div class="times"> </div>`);
      $("#filmContent").append(`<div style="position: relative; padding-bottom: 41.67%; height: 0; overflow: hidden;"> <iframe style="position: absolute; margin: 0 auto; width: 80%; height: 90%;" 
            src="https://www.youtube.com/embed/${value.trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`);
    });

    $.getJSON(`http://localhost:3000/screeningsData/${id}`, function (data) {
      console.log(data);
      $("#filmContent").append(`<div id="movie-times" style="display: inline-block; margin-left: 10px;"></div>`);
      $.each(data, function (index, value) {
        var stringDate = value.date;
        var parts = stringDate.split("/");
        var formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
        const screeningDate = new Date(formattedDate + 'T' + value.time);
        const dateString = screeningDate.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short"
        });
        const dayWithSuffix = getDayWithSuffix(screeningDate.getDate());
        const formattedDateString = dateString.replace(dayWithSuffix, `${dayWithSuffix} ${dateString.slice(0, 3)}`);
        console.log(formattedDateString);

        if (screeningDate >= today) {
          if ($(`#${formattedDate}`).length > 0) {
            // If it does, append the new time value to the existing text content
            const numButtons = $(`#${formattedDate} .timeBtns`).length;
            if (numButtons % 3 == 0) {
              $(`#${formattedDate}`).append(`<br><br><button class="timeBtns" value="${value.screeningID}" style="display: inline-block; margin-left: 10px;">${formattedDateString} @ ${value.time}</button>`);

            } else {
              $(`#${formattedDate}`).append(`<button class="timeBtns" value="${value.screeningID}" style="display: inline-block; margin-left: 10px;">${formattedDateString} @ ${value.time}</button>`);
            }
          } else {
            $("#movie-times").append(`<div>
                        <div class="col s12 m2 l2" class="times" id="${formattedDate}" style="display: flex; flex-direction: row;">
                          <button class="timeBtns" value="${value.screeningID}">${formattedDateString} @ ${value.time}</button>
                        </div></div>
                      `);
            $("#movie-times").append(`<br>`);
          }
        }
      });

      $(".timeBtns").click(function (e) {
        var id = e.target.value;
        console.log(id);
        sessionStorage.setItem("ID", id);
        window.location.replace("bookingDetails.html");

      });
    });


  });
});

function getDayWithSuffix(day) {
  const suffixes = ["th", "st", "nd", "rd"];
  const lastDigit = day % 10;
  let suffix = suffixes[lastDigit] || suffixes[0];
  if (day >= 11 && day <= 13) {
    suffix = "th";
  }
  return day + suffix;
}
