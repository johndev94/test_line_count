
$("document").ready(function () {

    if (typeof (Storage) !== "undefined") {
        var cost;
        var costString = "";
        var id = sessionStorage.getItem("ID");
        var seatsLeft;

        $.getJSON(`http://localhost:3000/screenings/${id}`, function (data) {
            console.log(data);
            costString = ``;
            //console.log(costString);
            $.each(data, function (index, value) {
                seatsLeft = value.capacity - value.seatsBooked;
                cost = value.cost;
                costString = cost.toString();
                $("#filmContent").append(`<img src="covers/` + value.ID + `.png">`);
                $("#filmContent").append(`<br>`);
                $("#filmContent").append(`<b> ` + value.filmName + `</b>`);
                $("#filmContent").append(`<br>`);
                $("#filmContent").append(`<b> Runtime:` + value.runtime + `</b>`);
                $("#filmContent").append(`<br>`);
                $("#filmContent").append(`<b>Age Rating:<img src="images/` + value.ageRating + `.png"></b>`);
                $("#filmContent").append(`<br>`);
                $("#filmContent").append(`<b>Description:</b>` + value.description + ``);
                $("#filmContent").append(`<br>`);

                if (costString.includes('.')) {
                    costString += `0 per seat`;
                } else {
                    costString += ` per seat`;
                }
            });
            //console.log(costString);
            console.log(seatsLeft);
            $('#ticket-select').append(`@ €` + costString);
        });
        var select = '<label for="pet-select">Choose amount of tickets:</label><br><select name="tickets" id="ticket-select">';
        for (i = 1; i <= 10; i++) {
            select += '<option value=' + i + '>' + i + '</option>';
        }
        select += `</select>`;
        $('#ticket-select').html(select);

        $("#confirm").click(function (event) {
            console.log(cost);
            console.log($('#ticket-select :selected').val());
            if ($('#ticket-select :selected').val() > seatsLeft) {
                NotEnoughSeatsAlert(seatsLeft);
            }
            else {
                sessionStorage.setItem("ticketAmt", $('#ticket-select :selected').val());
                sessionStorage.setItem("cost", cost);
                window.location.replace("payment.html");
            }
        });
    }
    else {
        alert("No web storage available");
    }

});

function NotEnoughSeatsAlert(seatsRemaining) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Not enough seats, there's ${seatsRemaining} seat(s) left!`
    }).then(function () {
        window.location.reload();
    })
}







