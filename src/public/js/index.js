$(document).ready(function () {

    $('#increment').click(() => {
        $.ajax({
            url: "/increment",
            type: "POST",
            success: function (res) {
                if (res.status === 200) {
                    $('#code').text(res.receipt);
                } else {
                    $('#code').text("Ooops... Something went wrong.");
                }
            },
            error: function (err) {
                $('#code').text(err);
            }
        });
    });

    $('#decrement').click(() => {
        $.ajax({
            url: "/decrement",
            type: "POST",
            success: function (res) {
                if (res.status === 200) {
                    $('#code').text(res.receipt);
                } else {
                    $('#code').text("Ooops... Something went wrong.");
                }
            },
            error: function (err) {
                $('#code').text(err);
            }
        });
    });

    $('#getCount').click(() => {
        $.ajax({
            url: "/getCount",
            type: "POST",
            success: function (res) {
                if (res.status === 200) {
                    $('#code').text(res.receipt);
                    $('.container p').text(res.count);
                } else {
                    $('#code').text("Ooops... Something went wrong.");
                }
            },
            error: function (err) {
                $('#code').text(err);
            }
        });
    });
});