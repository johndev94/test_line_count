var f;
var a;
var d;
var r;
var t;
var i;
var id;
var maxID;
$("document").ready(function(){
	
    $.getJSON(`http://localhost:3000/movies`, function(data){

        //shows table of movies and table for update and deleting
        $.each(data, function(i, value){
          
          //For editing movies
          $('#myTable1> tbody:last-child').append('<tr>');
          $('#myTable1> tbody:last-child').append('<td style="width: 60px;"><input class="filmID-'+value.ID+'" value="'+value.ID+'" style="width: 60px;"></td>');
          $('#myTable1> tbody:last-child').append('<td><input class="filmName-'+value.ID+'" value='+value.filmName+'></td>');
          $('#myTable1> tbody:last-child').append('<td style="width: 80px;"><input class="filmRating-'+value.ID+'" value='+value.ageRating+' style="width: 80px;"></td>');
          $('#myTable1> tbody:last-child').append('<td><input size="20" class="filmDescription-'+value.ID+'" value='+value.description+'></td>');
          $('#myTable1> tbody:last-child').append('<td style="width: 80px;"><input class="filmRuntime-'+value.ID+'" value='+value.runtime+' style="width:80px;"></td>');
          $('#myTable1> tbody:last-child').append('<td style="width: 120px;"><input class="filmTrailer-'+value.ID+'" value='+value.trailer+' style="width: 120px;"></td>');
          $('#myTable1> tbody:last-child').append('<td><button class="updateButton" value='+value.ID+'>Update</button></td>');
          $('#myTable1> tbody:last-child').append('<td><button class="deleteButton" onClick="foo()" id='+value.ID+' value='+value.filmName+'>Delete</button></td>');
          $('#myTable1> tbody:last-child').append('</tr>');
        });	 

        //add button
        $("#addBtn").click(function(){
          f = $("#filmName").val();
          a = $("#ageRating").val();
          d  = $("#description").val();//
          r  = $("#runtime").val();
          t = $("#trailer").val();//
  
          $.post("http://localhost:3000/movies/add", {
              
              filmName: f,
              ageRating: a,
              description: d,
              runtime: r,
              trailer: t
          });
          location.reload();
        });
        //delete button
        $(".deleteButton").click(function(event){ 
          JSalert();
          function JSalert(){
            Swal.fire({
                title: 'Do you want to delete the movie '+event.target.value+'?',
                
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
                  var id = event.target.id;
                    
                    $.post("http://localhost:3000/movies/delete", {
                      film_id : id
                    });   
                    Swal.fire('Saved!', '', 'success').then(function() {
                        window.location.reload();
                    });                    
                } 
                else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info').then(function() {
                    window.location.reload();
                });
                }
                //window.location.reload();
              })
        }          
        });
        //update button
        $(".updateButton").click(function(event){;
          var id = event.target.value;

          $.post("http://localhost:3000/movies/update", {
              film_id : id,
              runtime : $(`.filmRuntime-${id}`).val(),
              filmName : $(`.filmName-${id}`).val(),
              ageRating : $(`.filmRating-${id}`).val(),
              description : $(`.filmDescription-${id}`).val(),
              trailer : $(`.filmTrailer-${id}`).val(),
              filmID : $(`.filmID-${id}`).val()
    
          });
          window.location.reload();      
        });        
    });	       
});