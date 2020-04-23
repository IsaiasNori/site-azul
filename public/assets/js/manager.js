// To load list of registers from database
function loadList(filter = 'alert') {
    $('.switch')
        .removeClass('on');

    $(`#${filter}`)
        .addClass('on');

    $.get(`xfuel.php?region=${filter}`, (data, status) => {
        if (status === "success") {
            // console.log('success: ', response);
            createTable(data, filter);
        } else {
            // console.log('erro: ', response.responseText);
            msg(`Erro no servidor: ${status}`);
        }
    });
}

// To create table from server data
function createTable(data, filter) {
    const tableHead = $('#table-head');
    const tableBody = $('#table-body');
    const innerTable = document.createElement("table");

    tableHead.empty()
        .removeClass('columns-4')
        .removeClass('columns-3');

    tableBody
        .empty();

    $('tr')
        .removeClass('columns-4')
        .removeClass('columns-3');

    if (data.length > 0) {
        if (filter === 'alert') {
            tableHead.addClass('columns-3');
            tableHead.append('<span>XFUEL</span>');
            tableHead.append('<span>INFORMAÇÃO</span>');
            tableHead.append('<span>TÉRMINO</span>');

            $(data).each((i, item) => {
                let tr = document.createElement("tr");
                let dtFinish = dateFormat(item.date_end);

                $(tr).attr('id', item.id)
                    .attr('value', 'ALERTA')
                    .attr('title', item.remark.toUpperCase())
                    .attr('class', 'columns-3');

                $(tr).append(`<td>${item.xfuel_value} MIN</td>`);
                $(tr).append(`<td>${item.remark.toUpperCase()}</td>`);
                $(tr).append(`<td>${dtFinish}</td>`);

                $(innerTable).append(tr);
            });
        } else {
            tableHead.addClass('columns-4');
            tableHead.append('<span>LOCAL</span>');
            tableHead.append('<span>XFUEL</span>');
            tableHead.append('<span>MOTIVO</span>');
            tableHead.append('<span>TÉRMINO</span>');

            $(data).each((i, item) => {
                let tr = document.createElement("tr");
                let dtFinish = dateFormat(item.date_end);
                let remark = item.remark.toUpperCase() !== "" ? item.remark.toUpperCase() : "Sem Informação";

                $(tr).attr('id', item.id)
                    .attr('value', item.local.toUpperCase())
                    .attr('title', remark)
                    .attr('class', 'columns-4');

                $(tr).append(`<td>${item.local.toUpperCase()}</td>`);
                $(tr).append(`<td>${item.xfuel_value} MIN</td>`);
                $(tr).append(`<td>${item.reason.toUpperCase()}</td>`);
                $(tr).append(`<td>${dtFinish}</td>`);

                $(innerTable).append(tr);
            });
        }
        tableBody.append(innerTable);
    } else {
        tableBody.append('<div flex-center><label><br><br><br>NILL</label></div>');
    }
}

function deleteRow() {
    let reg = $('.selected').attr('value');
    let id = $('.selected').attr('id');
    let filter = $('.on').attr('id');

    let decision = confirm(`O Registro ${reg} será excluído premanentemente.\nDeseja continuar?`);

    if (decision) {
        $.ajax({
            type: 'DELETE',
            url: `xfuel.php?id=${id}`,
            success: (response) => {
                loadList(filter);
                msg(response);
                // console.log('response :', response);
            },
            error: (e) => {
                msg(e.resposeText)
                // console.log('e :', e);
            }
        });
    }
}

// Insert status msg
function msg(text) {
    $('#status-msg').empty().text(text);
}

// To filter list from regions
$('.switch').click((e) => {
    loadList(e.target.id);
});

$('.new-icon').click(() => {
    $('#placeholder-form')
        .addClass('POST')
        .removeClass('hidden')
        .load('insert-form.php');
});

$('.edit-icon').click(() => {
    if ($('.selected').length > 0) {
        $('#placeholder-form')
            .addClass('PUT')
            .removeClass('hidden')
            .load('insert-form.php');
    } else {
        msg('Selecione o item que deseja editar!');
    }
});

$('.delete-icon').click((e) => {
    e.preventDefault();
    if ($('.selected').length > 0) {
        deleteRow();
    } else {
        msg('Selecione o item que deseja excluír!');
    }
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
    setTimeout(msg, 5000, "");
});

// On ready: load list
$(document).ready(() => {
    loadList();
});

setInterval(() => {
        location.reload();
    },
    60000000
);