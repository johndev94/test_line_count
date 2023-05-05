$("document").ready(function(){
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const name = urlParams.get('name');
  console.log(id);
  $("#movieName").html(name);
  $("#submit").click(function(){
    console.log(name);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    const formattedDate = `${dd}/${mm}/${yyyy}`;
    let shortenedDate = formattedDate.substring(0,10);
      $.post("http://localhost:3000/reviews/add", {        
        name : $(`#reviewer_name`).val(),
        description : $(`#review_text`).val(),
        rating : $(`#rating`).val(),
        date : shortenedDate,
        filmID: id
        
      });
    window.location.replace("http://localhost:3000/reviews.html");

  });
});
