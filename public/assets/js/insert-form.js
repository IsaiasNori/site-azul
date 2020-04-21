function initialize(eraser = true) {
    emptyForm();
    $.get('assets/lib/json/utils.json', (json, status) => {
        if (status === 'success') {
            $.each(json.types, (index, type) => {
                $('#type').append(`<option value="${index}">${type}</option>`);
            });
            if (!eraser) {
                $('#type option[value="alert"]').prop('selected', true);
            }
        } else {
            msg('Servidor indisponível!');
        }
    });
}

function loadRegion() {
    $.get('assets/lib/json/utils.json', (json, status) => {
        if (status === 'success') {
            $('#region, #local, #reason').parent().removeClass('disable').prop('required', true);;
            $.each(json.regions, (index, region) => {
                $('#region').append(`<option value="${index}">${region.label}</option>`);
            });
            $.each(json.reasons, (index, reason) => {
                $('#reason').append(`<option value="${index}">${reason}</option>`);
            });
        } else {
            msg('Servidor indisponível!');
        }
    });
}

function loadLocal(regionVal) {
    $.get('assets/lib/json/utils.json', (json, status) => {
        if (status === 'success') {
            $.each(json.regions[regionVal].locals, (index, local) => {
                $('#local').append(`<option value="${local}">${local.toUpperCase()}</option>`);
            });
        } else {
            msg('Servidor indisponível!');
        }
    });
}

function emptyForm() {

    $('[field]').val(null);
    $('#type, #region, #local, #reason').empty().append('<option></option>');
    $('#region, #local, #reason').parent().addClass('disable');
    $('#messages').empty();
    $('.row').removeClass('alert');
    $('#xfuel_value, #region, #local, #reason, #remark').prop('required', false);

    for (let i = 0; i < 24; i++) {
        const h = (i.toString().length < 2) ? `0${i.toString()}:00` : `${i.toString()}:00`;
        $('#start-tm, #end-tm').append(`<option>${h}</option>`);
    };
}

function inputData(e) {
    e.preventDefault();
    if (validateForm()) {
        let filter = $('#region').val();
        $.ajax({
            type: "POST",
            url: "xfuel.php",
            data: $('form').serialize(),
            success: (response) => {
                if (response.id !== "") {
                    closeForm();
                    loadList(filter);
                    msg("Registro inserido com sucesso!");
                }
            },
            error: (e) => {
                console.log('e :', e.responseText);
                msg('Servidor indisponível!');
                closeForm();
            }
        });
    }
}

function validateForm() {
    // let bol = true;

    let currentTime = new Date();
    let start = new Date(`${$('#start-dt').val()} ${$('#start-tm').val()}`);
    let end = new Date(`${$('#end-dt').val()} ${$('#end-tm').val()}`);


    if (start < currentTime) {
        $('#start-dt').focus();
        msg(`Data Inicial deve ser maior que a Atual`);
        return false;
    }
    if (end <= start) {
        $('#end-dt').focus();
        msg('Data final deve ser maior que Data Inicial');
        return false;
    }

    $('#date_start').val(`${$('#start-dt').val()} ${$('#start-tm').val()}`);
    $('#date_end').val(`${$('#end-dt').val()} ${$('#end-tm').val()}`);

    $('#start-dt, #start-tm, #end-dt, #end-tm').remove();

    return true;
}

// To close form
function closeForm() {
    $('#placeholder-form').empty().addClass('hidden');
}

// behavior
$('#placeholder-form').click((e) => {
    if (e.target.id === "placeholder-form") {
        closeForm();
    }
});

$('#btn-clear').click((e) => {
    e.preventDefault();
    initialize();
    $('#remark').empty();
});

$('#btn-close').click((e) => {
    e.preventDefault();
    closeForm();
});

$('[field]').click(() => {
    $('#messages').empty();
    $('.row').removeClass('alert');
});

$('#type').change((e) => {
    if (e.target.value === "") {
        initialize();
    } else if (e.target.value === "alert") {
        initialize(false);
        $('#region').val('alert');
        $('#remark').prop('required', true);
    } else {
        loadRegion();
    }
});

$('#region').change((e) => {
    if (e.target.value === "") {
        initialize();
    } else {
        loadLocal(e.target.value);
    }
});

$('#local').change((e) => {
    if (e.target.value === "") {
        initialize();
    }
});

$('form').ready(() => {
    initialize();
}).on('submit', inputData);