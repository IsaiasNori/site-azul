function initialize(){
    emptyForm();
    $.get('/assets/json/utils.json', (data, status)=>{
        if (status == 'success'){
            $.each(data.type, (i)=>{
                $('#type').append(`<option value="${i}">${i.toUpperCase()}</option>`);
            });
            loadForm(data);
        }else{
            alert('Erro no servidor\n Contate o administrador!')
        }
    });
}

function change(typeValue){
    emptyForm();
    $.get('/assets/json/utils.json', (data, status)=>{
        if (status == 'success'){
            $.each(data.type, (i)=>{
                $('#type').append(`<option value="${i}">${i.toUpperCase()}</option>`);
            });
            $('#type').val(typeValue);
            loadForm(data);
        }else{
            alert('Erro no servidor\n Contate o administrador!')
        }
    });
}

function loadForm(json){
    let type = $('#type').val();

    if (type == 'base') {
        $.each(json.type.base, (i, region)=>{
            $.each(region, (j, base)=>{
                $('#local').append(`<option value="${base}">${base.toUpperCase()}</option>`);
            });
        });
    }else{
        $.each(json.type[type], (j, item)=>{
            $('#local').append(`<option value="${item}">${item.toString().toUpperCase()}</option>`);
        });
    }

    $.each(json.reason, (i)=>{
        $('#reason').append(`<option value="${i}">${i.toUpperCase()}</option>`);
    });

    for (let i = 0; i < 24; i++) {
        const h = (i.toString().length < 2) ? `0${i.toString()}:00`  : `${i.toString()}:00`;
        $('#start-tm, #end-tm').append(`<option>${h}</option>`);
    };
}

function emptyForm(){
    $('[field]').empty();
    $('#messages').empty();
    $('.row').removeClass('alert');
    $('#x-fuel').val(null);
    $('input[type="date"]').val(null);
}

function inputData() {
    $.ajax({
        type: "POST",
        url: "/api-xfuel/action.php",
        data: $('form').serialize(),
        success: (e)=>{
            hidde();
            loadList('all');
            alert("Registro inserido!");
        },
        error: (e)=>{
            console.log('Erro! \nMensagem de erro:', e);
        }
    });
}

function validateForm () {
    const msg = $('#messages');
    let row;
    let bol = true;

    $('[field]').each((i, item)=>{
        if ($(item).val() == "") {
            msg.text('Campo com preenchimento obrigatório!');
            row = $(item).parent();
            row.addClass('alert');
            $(item).focus();
            bol = false
            return false;
        }
    });

    
    // if ($('#type-field').val() == '---' || !$('#type-field').val()) { 
    //     msg.text('O tipo de Informação é obrigatório!');
    //     row = $('#type-field').parent();
    //     row.addClass('alert');
    //     return false;
    // }

    // if ($('#local-field').val() == '---' || !$('#local-field').val()) {
    //     msg.text('A localidade é obrigatória!');
    //     row = $('#local-field').parent();
    //     row.addClass('alert');
    //     return false;
    // }

    // if ($('#xfuel-field').val() == "" && ($('#type-field').val() != 'BASE' || $('#type-field').val() != 'TMA')) {
    //     msg.text('Para BASE e TMA o xfuel é obrigatório!');
    //     row = $('#xfuel-field').parent();
    //     row.addClass('alert');
    //     return false;
    // }
    // obj.type = $('#type-field').val();

    return bol;
}

// To hidden the 'hidde' div (form)
function hidde () {
    $('.reveal').addClass('hidden');
    $('.reveal').removeClass('reveal');
    $('#content-form').empty();
}    

// behavior
$('.reveal').click((e)=>{ if (e.target.id === "enabling"){ hidde(); }});

$('#btn-save').click(function (e) { 
    e.preventDefault();
    if (validateForm()){ 
        inputData();
    }
});

$('#btn-clear').click(function (e) { 
    e.preventDefault();
    initialize();
    $('#rmk').empty();
});

$('#btn-close').click(function (e) { 
    e.preventDefault();
    hidde();
});

$('#type').change((e)=>{
    change($(e.target).val());
});

$('[field]').click(()=>{
    $('#messages').empty();
    $('.row').removeClass('alert');
});

$('form').ready(()=>{
    initialize();
});