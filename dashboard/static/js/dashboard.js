$.ajaxSetup({
    headers: {
        'X-CSRFToken': $('input[name=csrfmiddlewaretoken]').val()
    }
});

$(document).ready(function () {
    $('#dashboardForm').on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (data) {
                $('#formContainer').hide();
                $('#responseContainer').html(data.message);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});
