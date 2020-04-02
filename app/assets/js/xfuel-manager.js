// On Load
$(document).ready(()=>{
    // To select the filter of regions
    $('.switch').click((e) => {
        const id = $(e.target).attr('id');
        $('.switch').each((i, bt) => {
            const nId = $(bt).attr('id');
            if (id == nId) {
                $(bt).removeClass('off');
                $(bt).addClass('on');
            }else{
                $(bt).removeClass('on');
                $(bt).addClass('off');
            }
        });
        loadList(id);
    });
    
    // To open the form to insert new
    $('.new-icon').click(() => {
        $('.hidden').addClass('reveal');
        $('.reveal').removeClass('hidden');
        $('#content-form').load('/forms/insert-form.php');
    });

    $('#table-body').click((e)=>{
        $('tr').each((i, item)=>{
            $(item).removeClass('selected');
        });
        
        if (e.target.localName == "td"){
            const row = e.target.parentNode; 
            $(row).addClass('selected');
        }
    });
    loadList('all');
});

// To create and return a table based in json
function createTable (data) {
    const tb = document.createElement("table");

    if (data.length > 0) {
        $.each(data, (i, item) => {
            let start = new Date(item.DATE_START);
            let finish = new Date(item.PLANNED_END);
            let tr = document.createElement("tr");

            $(tr).append('<td>' + item.TYPE + '</td>');
            $(tr).append('<td>' + item.LOCATION + '</td>');
            $(tr).append('<td>' + item.XFUEL_VALUE + ' MIN</td>');
            $(tr).append('<td>' + item.REASON + '</td>');
            $(tr).append('<td>' + start.getHours() + ":" + start.getMinutes() + '</td>');
            $(tr).append('<td>' + finish.getHours() + ":" + finish.getMinutes() + '</td>');
            $(tb).append(tr);
        });
    }else{
        let tr = '<tr>'
        for (i=0; i<6; i++){
            var td = td + '<td>NIL</td>';
        }
        tr = tr + td + '</tr>'
        $(tb).append(tr);
    }
    $(tb).attr('id', 'table');
    return tb;
}

// To load list of registers from database
function loadList(sort){
    const dtStart = getCurrentDate();
    const uri = "/api-xfuel/action.php?"
                + "filter=" + sort
                + "&date_start=" + dtStart;
    $.ajax({
        type: "GET",
        url: uri,
        success: (result)=>{
            // console.log("success");
            // console.log(e);
            $('#table-body').empty();
            $('#table-body').append(createTable(result));
        },
        error: (e)=>{
            alert("error\n" + e.responseText);
        }
    });
}

