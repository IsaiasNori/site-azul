// To load list of registers from database
function loadList(filter = 'alert') {
    $(`#${filter}`).addClass('on');
    $.get(`xfuel.php?region=${filter}`, (response, status) => {
        if (status === "success") {
            // console.log('success: ', response);
            createTable(response, filter);
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
                let dtFinish = dateFormat(item.date_end);

                $(tr).attr('id', item.id).attr('value', 'ALERTA').attr('class', 'columns-3');
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

                $(tr).attr('id', item.id).attr('value', item.local.toUpperCase()).attr('class', 'columns-4');
                $(tr).append(`<td>${item.local.toUpperCase()}</td>`);
                $(tr).append(`<td>${item.xfuel_value} MIN</td>`);
                $(tr).append(`<td>${item.reason.toUpperCase()}</td>`);
                $(tr).append(`<td>${dtFinish}</td>`);

                $(innerTable).append(tr);
            });
        }
        tableBody.append(innerTable);
    } else {
        msg('Vazio!');
    }
}

function deleteRow() {
    let reg = $('.selected').attr('value');
    let id = $('.selected').attr('id');

    let decision = confirm(`O Registro ${reg} será excluído premanentemente.\nDeseja continuar?`);

    if (decision) {
        $.ajax({
            type: 'DELETE',
            url: `xfuel.php?id=${id}`,
            success: (response) => {
                msg(response);
                let filter = $('.on').attr('id');
                loadList(filter);
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
    $('.switch').removeClass('on');
    loadList(e.target.id);
});

// To open form
$('.new-icon').click(() => {
    $('#placeholder-form').removeClass('hidden').load('insert-form.php');
});

$('.delete-icon').click(() => {
    if ($('.selected').length > 0) {
        deleteRow();
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
    msg("");
});

// On ready: load list
$(document).ready(() => {
    loadList();
});