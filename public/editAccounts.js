var e;
var p;
var t;
var r;
var t;
var i;
var id;
var maxID;
$("document").ready(function () {

  $.getJSON(`http://localhost:3000/users`, function (data) {

    //shows table of movies and table for update and deleting
    $.each(data, function (i, value) {

      // For editing movies
      $('#myTable1> tbody:last-child').append('<tr>');
      $('#myTable1> tbody:last-child').append('<td style="width: 60px;"><input class="userID-' + value.ID + '" value="' + value.ID + '" style="width: 60px;"></td>');
      $('#myTable1> tbody:last-child').append('<td style="width: 180px;"><input class="userEmail-' + value.ID + '" value="' + value.email + '" style="width: 180px;"></td>');
      $('#myTable1> tbody:last-child').append('<td style="width: 120px;"><input class="userPassword-' + value.ID + '" value="' + value.password + '" style="width: 100px;"></td>');
      $('#myTable1> tbody:last-child').append('<td ><input class="userType-' + value.ID + '" value="' + value.type + '"></td>');
      $('#myTable1> tbody:last-child').append('<td style="padding-left:20px;"><button class="updateButton" value="' + value.ID + '">Update</button></td>');
      $('#myTable1> tbody:last-child').append('<td><button class="deleteButton" id="' + value.email + '" value="' + value.ID + '">Delete</button></td>');
      $('#myTable1> tbody:last-child').append('</tr>');
    });
    //add button
    $("#addBtn").click(function () {
      e = $("#emailAdd").val();
      p = $("#passwordAdd").val();
      t = $("#typeAdd").val();//

      $.post("http://localhost:3000/users/add", {
        email: e,
        password: p,
        type: t
      });
      location.reload();
    });
    //delete button
    $(".deleteButton").click(function (event) {


      JSalert();
      function JSalert() {
        Swal.fire({
          title: 'Do you want to delete user ' + event.target.id + '?',

          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            var id = event.target.value;

            $.post("http://localhost:3000/users/delete", {
              userID: id
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
          //window.location.reload();
        })
      }
    });

    //update button
    $(".updateButton").click(function (event) {
      ;
      var id = event.target.value;

      $.post("http://localhost:3000/users/update", {
        //userID : id,
        email: $(`.userEmail-${id}`).val(),
        password: $(`.userPassword-${id}`).val(),
        type: $(`.userType-${id}`).val(),
        userID: $(`.userID-${id}`).val()

      });
      window.location.reload();
    });
  });
});


