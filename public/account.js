$("document").ready(function () {
  $.getJSON(`http://localhost:3000/screeningsMovies`, function (data) {

    $.each(data, function (i, value) {

      if (value.customerID == sessionStorage.getItem("user_id")) {

        $('#bookingsContainer').append("<div><img class='accountImg' src ='covers/" + value.filmID + ".png'>" + "<div id='bookingText'>Screen Number: " + value.ScreenID + " <br>Time: " + value.time + " <br>Date: " + value.date + "<button class='delButton' value='" + value.screeningID + "' style='max-width: 200px;'>Delete</button><br></div></div><br><br>");
      }
      else {


      }
      $.getJSON(`http://localhost:3000/bookings`, function (data) {

        $.each(data, function (i, value) {
          if (sessionStorage.getItem('user_id') == value.customerID) {
            $(".delButton").click(function (event) {
              console.log("del button");
              JSalert();
              function JSalert() {

                Swal.fire({
                  title: 'Do you want to delete this booking ' + event.target.value + '?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'

                }).then((result) => {
                  if (result.isConfirmed) {
                    var id = event.target.value;

                    $.post("http://localhost:3000/bookings/delete", {
                      screening_id: id
                    });
                    Swal.fire('Saved!', '', 'success').then(function () {
                      window.location.reload();
                    });

                  }
                  else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info').then(function () {
                      window.location.reload();
                    });
                  }


                })

              }
            });
          }


        });
      });
    });
  });
});

