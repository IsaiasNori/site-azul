// On Load
$(document).ready(()=>{ loadList('all'); });

// To load list of registers from database
function loadList(sort){
    const uri = `/xfuel/?sort=${sort}`;

    $.ajax({
        type: "GET",
        url: uri,
        success: (result)=>{
            console.log('success: ', result);
            createTable(result);
        },
        error: (e)=>{
            // console.log('erro: ', e.responseText);
            alert('Erro no servidor\nContate o administrador');
        }
    });
}

// To create table from json
function createTable (data) {
    const tb = document.createElement("table");

    if (data.length > 0) {
        $.each(data, (i, item) => {
            let start = new Date(item.DATE_START);
            let finish = new Date(item.PLANNED_END);

            let tr = document.createElement("tr");
            $(tr).attr('value', i);

            $(tr).append(`<td>${item.TYPE}</td>`);
            $(tr).append(`<td>${item.LOCATION}</td>`);
            $(tr).append(`<td>${item.XFUEL_VALUE} MIN</td>`);
            $(tr).append(`<td>${item.REASON}</td>`);
            $(tr).append(`<td>${hourToString(start.getHours(), start.getMinutes())}</td>`);
            $(tr).append(`<td>${hourToString(finish.getHours(), finish.getMinutes())}</td>`);
            $(tb).append(tr);
        });
    }else{
        let tr = '<tr>'
        for (i=0; i<6; i++){
            var td = td + '<td>-</td>';
        }
        tr = tr + td + '</tr>'
        $(tb).append(tr);
    }

    $(tb).attr('id', 'table');
    $('#table-body').empty();
    $('#table-body').append(tb);
}


// To filter list from regions
$('.switch').click((e) => {
    const id = e.target.id;

    $('.switch').removeClass('on');
    $('.switch').addClass('off');

    $(e.target).removeClass('off');
    $(e.target).addClass('on')

    loadList(id);
});

// To open the form to insert new
$('.new-icon').click(() => {
    $('.hidden').addClass('reveal');
    $('.reveal').removeClass('hidden');
    $('#content-form').load('insert-form.php');
});

$('#table-body').click((e)=>{
    $('tr').each((i, item)=>{
        $(item).removeClass('selected');
    });
    
    if (e.target.localName == "td"){
        const row = e.target.parentNode; 
        $(row).addClass('selected');
    }
    $('#div-msg').empty();
});





