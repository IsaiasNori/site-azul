// To load list of registers from database
function loadList(filter = 'alert') {
    $('.on').removeClass('on');
    $(`#${filter}`).addClass('on');
    $.get(`xfuel.php?region=${filter}`, (response, status) => {
        if (status === "success") {
            // console.log('success: ', response);
            createTable(response, filter);
        } else {
            // console.log('erro: ', response.responseText);
            alert('Erro no servidor\nContate o administrador');
        }
    });
}

// To create table from server json
function createTable(data, filter) {
    let today = new Date();
    const tableHead = $('#table-head');
    const tableBody = $('#table-body');

    const table = document.createElement("table");

    tableHead.empty().removeClass('columns-4').removeClass('columns-3');
    tableBody.empty();
    $('tr').removeClass('columns-4').removeClass('columns-3');

    if (data.length > 0) {

        if (filter === 'alert') {
            tableHead.addClass('columns-3');
            tableHead.append('<span>XFUEL</span>');
            tableHead.append('<span>INFORMAÇÃO</span>');
            tableHead.append('<span>TÉRMINO</span>');

            $(data).each((i, item) => {
                let tr = document.createElement("tr");
                // let end = new Date(item.date_end);
                // let endTm = hourToString(end.getHours(), end.getMinutes());
                // endTm = (end.getDay() > today.getDay()) ? `<td>${endTm}+</td>` : `<td>${endTm}</td>`;
                let dt = dateFormat(item.date_end);

                $(tr).attr('value', item.id).attr('class', 'columns-3');
                $(tr).append(`<td>${item.xfuel_value} MIN</td>`);
                $(tr).append(`<td>${item.remark.toUpperCase()}</td>`);
                // $(tr).append(endTm);
                $(tr).append(`<td>${dt}</td>`);
                $(table).append(tr);
            });

        } else {
            tableHead.addClass('columns-4');
            tableHead.append('<span>LOCAL</span>');
            tableHead.append('<span>XFUEL</span>');
            tableHead.append('<span>MOTIVO</span>');
            tableHead.append('<span>TÉRMINO</span>');

            $(data).each((i, item) => {
                let tr = document.createElement("tr");
                // let end = new Date(item.date_end);
                // let endTm = hourToString(end.getHours(), end.getMinutes());
                // endTm = (end.getDay() > today.getDay()) ? `<td>${endTm}+</td>` : `<td>${endTm}</td>`;
                let dt = dateFormat(item.date_end);

                $(tr).attr('value', item.id).attr('class', 'columns-4');
                $(tr).append(`<td>${item.local.toUpperCase()}</td>`);
                $(tr).append(`<td>${item.xfuel_value} MIN</td>`);
                $(tr).append(`<td>${item.reason.toUpperCase()}</td>`);
                $(tr).append(`<td>${dt}</td>`);
                // $(tr).append(endTm);
                $(table).append(tr);
            });

        }

        tableBody.append(table);

    } else {

        tableHead.append("<span> NILL </span>");

    }

}

// Insert status msg
function msg(text) {
    $('#status-msg').text(text);
}

// To filter list from regions
$('.switch').click((e) => {
    $('.on').removeClass('on');
    $(e.target).addClass('on');

    loadList(e.target.id);
});

// To open form
$('.new-icon').click(() => {
    $('#placeholder-form').removeClass('hidden').load('insert-form.php');
});

// Select or deselect table row
$('#table-body').click((e) => {
    $('tr').removeClass('selected');
    if (e.target.localName === 'td') {
        $(e.target.parentNode).addClass('selected');
    }
});

// Clear status msg
$('main').click(() => {
    msg(null)
});

// On ready: load list
$(document).ready(() => {
    loadList();
});