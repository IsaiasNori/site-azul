var utils = "";

function loadRegion() {
    let json = utils;
    $('#region').empty().append('<option></option>').prop('required', true).parent().removeClass('disable');
    $.each(json.regions, (index, region) => {
        $('#region').append(`<option value="${index}">${region.label}</option>`);
    });
}

function loadLocal() {
    let json = utils;
    let region = $('#region').val();
    $('#local, #xfuel_value').empty().prop('required', true).parent().removeClass('disable');
    $('#local').append('<option></option>');
    $.each(json.regions[region].locals, (index, local) => {
        $('#local').append(`<option value="${local}">${local.toUpperCase()}</option>`);
    });
}

function loadReason() {
    let json = utils;
    $('#remark').empty().parent().removeClass('disable');
    $('#reason').empty().append('<option></option>').prop('required', true).parent().removeClass('disable');
    $.each(json.reasons, (index, reason) => {
        $('#reason').append(`<option value="${index}">${reason}</option>`);
    });
}

function inputData(e) {
    e.preventDefault();
    let data = validateForm();
    if (!data) {
        return;
    } else {
        let type = $('#placeholder-form').hasClass("POST") ? "POST" : "PUT";
        let filter = $('.on').attr('id');

        if (type === "POST") {
            $.ajax({
                type: 'POST',
                url: "./xfuel.php",
                data: data,
                success: (response) => {
                    if (response.id !== "") {
                        alert("Registro inserido com sucesso!");
                        loadList(filter);
                        closeForm();
                    }
                },
                error: (e) => {
                    emptyForm();
                    alert(e.responseText);
                }
            });
        } else if (type === "PUT") {
            data.id = $('.selected').attr('id');
            var params = "";
            $.each(data, (key, value) => {
                params += `${key}=${value}&`;
            });

            params = params.slice(0, -1);

            $.ajax({
                type: 'PUT',
                url: `./xfuel.php?${params}`,
                success: (response) => {
                    if (response.id !== "") {
                        alert("Registro alterado com sucesso!");
                        loadList(filter);
                        closeForm();
                    }
                },
                error: (e) => {
                    emptyForm();
                    alert(e.responseText);
                }
            });
        }
    }
}

function validateForm() {
    let currentTime = new Date();
    let start = new Date(`${$('#start-dt').val()} ${$('#start-tm').val()}`);
    let end = new Date(`${$('#end-dt').val()} ${$('#end-tm').val()}`);


    if (start < currentTime) {
        alert(`Data Inicial deve ser maior que a Atual`);
        $('#start-dt').focus();
        return false;
    }
    if (end <= start) {
        alert('Data final deve ser maior que Data Inicial');
        $('#end-dt').focus();
        return false;
    }

    start = `${$('#start-dt').val()} ${$('#start-tm').val()}`;
    end = `${$('#end-dt').val()} ${$('#end-tm').val()}`;

    var data = {
        xfuel_value: $('#xfuel_value').val(),
        type: $('#type').val(),
        region: $('#region').val(),
        local: $('#local').val(),
        reason: $('#reason').val(),
        date_start: start,
        date_end: end,
        remark: $('#remark').val(),
        user_create: $('#user_create').val(),
        user_change: $('#user_change').val()
    };

    return data;
}


function emptyForm() {
    $("#type").val(null);
    $('#region, #local, #reason, #start-tm, #end-tm').empty();
    $('#xfuel_value, #start-dt, #end-dt, #remark').val("");
    $('#xfuel_value, #region, #local, #reason, #remark').prop('required', false).parent().addClass('disable');

    for (let i = 0; i < 24; i++) {
        const h = (i.toString().length < 2) ? `0${i.toString()}:00` : `${i.toString()}:00`;
        $('#start-tm, #end-tm').append(`<option>${h}</option>`);
    };
}

function reloadForm() {
    let id = $('.selected').attr('id');


    $.get(`./xfuel.php?id=${id}`, (data, status) => {
        if (status === "success") {
            if (data.length === 1) {
                data = data[0];
                let type = data.type;

                let dateStart = new Date(data.date_start);
                let dateEnd = new Date(data.date_end);

                timeStart = hourToString(dateStart.getHours(), dateStart.getMinutes());
                timeEnd = hourToString(dateEnd.getHours(), dateEnd.getMinutes());

                let month = (dateStart.getUTCMonth() + 1) > 9 ? dateStart.getUTCMonth() + 1 : `0${dateStart.getUTCMonth()+1}`
                dateStart = `${dateStart.getFullYear()}-${month}-${dateStart.getUTCDate()}`;

                month = (dateEnd.getUTCMonth() + 1) > 9 ? dateEnd.getUTCMonth() + 1 : `0${dateEnd.getUTCMonth()+1}`
                dateEnd = `${dateEnd.getFullYear()}-${month}-${dateEnd.getUTCDate()}`;

                $('#type').val(type);

                console.log('type :', type);

                if (type === "xfuel") {
                    loadRegion();
                    $('#region').val(data.region);
                    loadLocal();
                    $('#local').val(data.local);
                    loadReason();
                    $('#reason').val(data.reason);
                } else if (type === "alert") {
                    $('#xfuel_value, #remark').parent().removeClass('disable');
                    $('#remark').prop('required', true);
                }

                $('#xfuel_value').val(data.xfuel_value);
                $('#start-dt').val(dateStart);
                $('#end-dt').val(dateEnd);
                $('#start-tm').val(timeStart);
                $('#end-tm').val(timeEnd);
                $('#remark').val(data.remark);

            } else {
                alert('Dados corrompidos\nFavor refazer o registro!');
            }
        } else {
            alert('Servidor indisponível\nTente Novamente Mais Tarde!');
        }
    });
}

// To close form
function closeForm() {
    $('#placeholder-form').empty().addClass('hidden').removeClass('PUT POST');
}

// events
$('#content-form').click((e) => {
    //Ao clicar fora do form. 
    if (e.target.id === "content-form") {
        closeForm();
    }
});

$('#btn-clear').click((e) => {
    e.preventDefault();
    emptyForm();
});

$('#btn-close').click((e) => {
    e.preventDefault();
    closeForm();
});

$('#type').change((e) => {
    let val = e.target.value;
    //Necessário limpar o form ao mudar o campo Type
    //+
    emptyForm();
    if (val === "xfuel") {
        loadRegion();
    } else if (val === "alert") {
        $('#xfuel_value, #remark').parent().removeClass('disable')
        $('#remark').prop('required', true);
    }
    //+
    // por isso seto novamente o valor escolhido.
    $(`#type option[value='${val}']`).prop('selected', true);
});

$('#region').change((e) => {
    if (e.target.value === "") {
        $('#local, #xfuel_value, #reason, #remark').empty().parent().addClass('disable');
    } else {
        loadLocal();
    }
});

$('#local').change((e) => {
    if (e.target.value === "") {
        $('#xfuel_value, #reason, #remark').empty().parent().addClass('disable');
    } else {
        loadReason();
    }
});

$('#reason').change((e) => {
    if (e.target.value === "") {
        $('#remark').empty().parent().addClass('disable');
    }
});

$('form').ready(() => {
    $.get('./assets/lib/json/utils.json', (json, status) => {
        if (status === "success") {
            emptyForm();
            $('#type').empty().append('<option></option>');
            $.each(json.types, (index, type) => {
                $('#type').append(`<option value="${index}">${type}</option>`);
            });
            utils = json;
            if ($('#placeholder-form').hasClass("PUT")) {
                reloadForm();
            }
        } else {
            alert('Servidor indisponível\nTente Novamente Mais Tarde!');
        }
    });
}).on('submit', inputData);