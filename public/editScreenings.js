
var d;
var t;
var cap;
var cost;
$("document").ready(function () {


    getData();

    $.getJSON("http://localhost:3000/screenings", function (data) {
        //console.log(data[0].ID); 

        $.each(data, function (index, value) {
            var movieID = value.filmID;
            var dropdown = value.ID;
            $("#tbody").append(`<tr>`);
            $("#tbody").append(`<td align='center'>${value.ID}</td>`);
            $("#tbody").append(`<td><input class='screeningDate-${value.ID}' value='${value.date}' type='text' size='20' style='text-align:center; width: 110px;'"/></td>`);
            $("#tbody").append(`<td><input class='screeningTime-${value.ID}' value='${value.time}' type='text' size='20' style='text-align:center; width: 80px;'/></td>`);
            $("#tbody").append(`<td><input class='screeningCap-${value.ID}' value='${value.capacity}' type='text' size='10' style='text-align:center; width: 60px;'/></td>`);
            $("#tbody").append(`<td><input class='screenNo-${value.ID}' value='${value.ScreenID}' type='text' size='10' style='text-align:center; width: 60px;'/></td>`);
            $("#tbody").append(`<td><input class='screeningCost-${value.ID}' value='${value.costPerSeat}' type='text' size='10' style='text-align:center; width: 80px;'/></td>`);
            $("#tbody").append(`<td><select style="width: 50px;" id='screeningFilmID-${value.ID}'><option value='0'>Select...</option></select></td>`);
            $.getJSON(`http://localhost:3000/movies`, function (data) {
                $.each(data, function (i, value) {
                    if (value.ID == movieID) {
                        $(`#screeningFilmID-${dropdown}`).append($('<option selected = true></option>')
                            .attr({ value: value.ID })
                            .text(value.ID)
                        );
                    }
                    else {
                        $(`#screeningFilmID-${dropdown}`).append($('<option></option>')
                            .attr({ value: value.ID })
                            .text(value.ID)
                        );
                    }
                });
            });
            $("#tbody").append(`<td><input class='seatsBooked-${value.ID}' value='${value.seatsBooked}' type='text' size='10' style='text-align:center;'/></td>`);
            $("#tbody").append(`<td><button class='updateButton' value='${value.ID}'>Update</button></td>`);
            $("#tbody").append(`<td><button class='deleteButton' value='${value.ID}'>Delete</button></td>`);
            $("#tbody").append(`</tr>`);
        });

        $("#addBtn").click(function () {
            //alert("hello");
            //id = $("#screeningID").val();
            d = $("#date").val();
            t = $("#time").val();
            cap = $("#capacity").val();
            cost = $("#costPerSeat").val();
            var movieDuration;
            var time;

            $.getJSON("http://localhost:3000/screeningsWithRuntime", function (data) {
                var found = false;
                var stillRunning = false;

                $.each(data, function (index, value) {

                    //console.log(value.runtime);
                    movieDuration = value.runtime;
                    time = value.time;
                    //console.log(time);
                    //console.log(time.substr(0, 2));
                    //console.log(time.substr(3, 2));
                    const date = new Date(`2023-01-01T${time}:00Z`);
                    //console.log(date);

                    const currentMinutes = date.getHours() * 60 + date.getMinutes();
                    //console.log(currentMinutes);
                    //console.log(parseInt(movieDuration));
                    const totalMinutes = parseInt(currentMinutes) + parseInt(movieDuration);
                    //console.log(totalMinutes);
                    date.setHours(Math.floor(totalMinutes / 60), (totalMinutes + 30) % 60);
                    console.log(date);

                    // Format updated time as string
                    const screenTime = date.getHours() + ":" + date.getMinutes(); // + ":" + date.getUTCMinutes();

                    // Output updated time
                    console.log(screenTime);

                    if (value.date == d && value.time == t && value.ScreenID == $("#screenNo").val()) {
                        //alert("Screening is already booked");
                        found = true;
                    }
                    else if (value.date == d && value.ScreenID == $("#screenNo").val() && t <= screenTime) {
                        stillRunning = true;
                    }
                });


                if (found || stillRunning) {
                    //alert("Screening is already booked");
                    DoubleBookingAlert();
                }
                else {
                    $.post("http://localhost:3000/screenings/add", {
                        screenNo: $("#screenNo").val(),
                        date: d,
                        time: t,
                        capacity: cap,
                        costPerSeat: cost,
                        film_id: $("#films").val(),
                        seats_booked: $("#seatsBooked").val()
                    });
                    window.location.reload();
                }

            });
        });


        $(".updateButton").click(function (event) {
            //alert(event.target.value);
            var id = event.target.value;
            var found = false;
            var stillRunning = false;
            var movieDuration;
            var time;
            $.getJSON("http://localhost:3000/screeningsWithRuntime", function (data) {

                $.each(data, function (index, value) {

                    movieDuration = value.runtime;
                    time = value.time;

                    const date = new Date(`2023-01-01T${time}:00Z`);
                    //console.log(date);

                    const currentMinutes = date.getHours() * 60 + date.getMinutes();
                    //console.log(currentMinutes);
                    //console.log(parseInt(movieDuration));
                    const totalMinutes = parseInt(currentMinutes) + parseInt(movieDuration);
                    //console.log(totalMinutes);
                    date.setHours(Math.floor(totalMinutes / 60), (totalMinutes + 30) % 60);
                    console.log(date);

                    // Format updated time as string
                    const screenTime = date.getHours() + ":" + date.getMinutes(); // + ":" + date.getUTCMinutes();

                    // Output updated time
                    console.log(screenTime);

                    if (value.date == $(`.screeningDate-${id}`).val() && value.time == $(`.screeningTime-${id}`).val() && value.ScreenID == $(`.screenNo-${id}`).val()) {
                        //alert("Screening is already booked");
                        found = true;
                    }
                    else if (value.date == $(`.screeningDate-${id}`).val() && value.ScreenID == $(`.screenNo-${id}`).val() && $(`.screeningTime-${id}`).val() <= screenTime) {
                        stillRunning = true;
                    }

                });

                if (found || stillRunning) {
                    //alert("Screening is already booked");
                    DoubleBookingAlert();
                }
                else {
                    $.post("http://localhost:3000/screenings/update", {
                        screening_id: id,
                        screenNo: $(`.screenNo-${id}`).val(),
                        date: $(`.screeningDate-${id}`).val(),
                        time: $(`.screeningTime-${id}`).val(),
                        capacity: $(`.screeningCap-${id}`).val(),
                        cost_per_seat: $(`.screeningCost-${id}`).val(),
                        film_id: $(`#screeningFilmID-${id}`).val(),
                        seats_booked: $(`.seatsBooked-${id}`).val()

                    });
                    window.location.reload();
                }
            });

        });


        $(".deleteButton").click(function (event) {
            JSalert();
            function JSalert() {

                Swal.fire({
                    title: 'Do you want to delete screening ' + event.target.value + '?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'

                }).then((result) => {
                    if (result.isConfirmed) {
                        var id = event.target.value;

                        $.post("http://localhost:3000/screenings/delete", {
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
                    //window.location.reload();
                })
            }
        });

        // $(".deleteButton").click(function(event){
        //     //alert(event.target.value);
        //     var id = event.target.value;

        //     $.post("http://localhost:3000/screenings/delete", {
        //         screening_id : id
        //     });
        //     window.location.reload();

        // });
    });


});





function getData() {

    $.getJSON(`http://localhost:3000/movies`, function (data) {

        $.each(data, function (i, value) {

            $("#films").append($('<option></option>')
                .attr({ value: value.ID })
                .text(value.ID)
            );
        });

    });

}

function DoubleBookingAlert() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Screening is already booked!'
    }).then(function () {
        window.location.reload();
    })
}