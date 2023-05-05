$("document").ready(function(){
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const id = urlParams.get('id');

  $("#movieName").html(name);
  $.getJSON(`http://localhost:3000/reviews/${id}`, function(data){
      if(data.length == 0){
        $("#content").append("<b>No reviews for this movie</b>");
      }
      else{
        //shows table of movies and table for update and deleting
        $.each(data, function(i, value){

          $('#myTable> tbody:last-child').append('<tr>'+
          '<td>'+value.reviewer_name+'</td>'+
          '<td>'+value.review_text+'</td>'+
          '<td>'+value.rating+' stars </td>'+
          '<td>'+value.review_date+'</td>'+
          '</tr>');
        });
      }
  });
});