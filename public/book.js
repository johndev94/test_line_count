$("document").ready(function () {
  const url = 'editReview.html?';
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

      $('#myTable> tbody:last-child').append('<tr><td><img class="posters" src="covers/' + value.ID + '.png" id="' + value.ID + '" value=' + value.ID + '></td>' +
        '<td><h3>' + value.filmName + '</h3><br>Rating: ' + value.ageRating + '<br><br>Run Time: ' + value.runtime + '</td>' +
        '<td></td>' +
        '<td><button type="button" class="btn btn-primary" id="write">Time 1</button><br><br>' +
        '<a class="btn btn-primary">Time 2</a><br><br>' +
        '<a class="btn btn-primary">Time 3</a></td>' +
        '</tr>');
    });
  });
});

