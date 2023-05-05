$("document").ready(function () {
  const url = 'editReview.html?';
  const url1 = 'viewReviews.html?';
  $.getJSON(`http://localhost:3000/movies`, function (data) {
    //shows table of movies and table for update and deleting
    $.each(data, function (i, value) {
      //Gets id 
      const obj = {
        id: value.ID,
        name: value.filmName
      };
      const searchParams = new URLSearchParams(obj);
      const queryString = searchParams.toString();
      sessionStorage.setItem("id", value.ID);

      $('#myTable> tbody:last-child').append('<tr><td><img class="posters" src="covers/' + value.ID + '.png" id="' + value.ID + '" value=' + value.ID + '></td>' +
        '<td><h3>' + value.filmName + '</h3><br>Rating: <img src="images/' + value.ageRating + '.png"><br><br>Run Time: ' + value.runtime + '</td>' +
        '<td></td>' +
        '<td><a class="btn btn-primary" href="' + url + queryString + '" id="write" onClick=reply_click(value.ID)">Write a review</a><br><br>' +
        '<a type="button" class="btn btn-secondary" href="' + url1 + queryString + '" id="read">Read reviews</a></td>' +
        '</tr>');

      function reply_click(clicked_id) {
        console.log(clicked_id);
      }
    });
  });
});

