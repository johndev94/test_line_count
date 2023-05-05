$("document").ready(function(){
	const url = 'movieDetails.html?';
  $.getJSON(`http://localhost:3000/movies`, function(data){
      var count = 0;
      var newRow = $('<tr></tr>');
      

      $.each(data, function(i, value)
      {
        const obj = {
          id: value.ID,
          name: value.filmName
        };
        const searchParams = new URLSearchParams(obj);
        const queryString = searchParams.toString();
        console.log(count);
        newRow.append('<td><a href="'+url+queryString+'"><img class="posters" src="covers/'+value.ID+'.png"></a></td>');
        ++count;
        if(count % 4 == 0)
        {
          $('#myTable').append(newRow);
          newRow = $('<tr></tr>');
        }
      });

      if (count % 4 != 0) 
      {
        $('#myTable').append(newRow);
      }
      
      $('.posters').on('load', function() {
        $(this).css({
          height: '300px',
          width: '200px'
        });
      });
      
  });
  $(".custom-toggle").each(function (i){
    var classes = $(this).attr("class"),
    id = $(this).attr("id"),
    name = $(this).attr("name");

    $(this).wrap('<div class="custom-toggle" id="' + name + '"></div');
    $(this).after('<label for="custom-toggle-' + i + '"></label>');
    $(this).attr("id", "custom-toggle-" + i);
    $(this).attr("name", name);

  });

  $(".custom-toggle input").change(function (){
      $("body").toggleClass("green");
  });
});





