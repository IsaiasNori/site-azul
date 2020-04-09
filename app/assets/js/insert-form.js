function initialize(eraser = true){
    emptyForm();
    $.get('/assets/json/utils.json', (json, status)=>{
        if (status == 'success'){
            $.each(json.type, (key)=>{
                let opt = key==='alert' ? "ALERTA" : key.toUpperCase();
                $('#type').append(`<option value="${key}">${opt}</option>`);
            });
            if(!eraser){$('#type option[value="alert"]').prop('selected',true);}
        }else{
            alert('Erro ao conectar o servidor\n Tente novamente mais tarde!');
        }
    });
}

function loadRegion() {
    $.get('/assets/json/utils.json', (json, status)=>{
        if (status == 'success'){
            $('#region').parent().removeClass('disable');
            $('#x-fuel, #region, #local, #reason').prop('required', true);
            $.each(json.type.xfuel, (key, item)=>{
                $('#region').append(`<option value="${key}">${item.label}</option>`);
            });
        }else{
            alert('Erro ao conectar o servidor\n Tente novamente mais tarde!');
        }
    });
}

function loadLocal(regionVal) {
    $.get('/assets/json/utils.json', (json, status)=>{
        if (status == 'success'){
            $('#local').parent().removeClass('disable');
            $.each(json.type.xfuel[regionVal].bases, (i, local)=>{
                $('#local').append(`<option value="${local}">${local.toUpperCase()}</option>`);
            });
        }else{
            alert('Erro ao conectar o servidor\n Tente novamente mais tarde!');
        }
    });
}

function emptyForm(){

    $('[field]').empty();
    $('#messages').empty();
    $('#x-fuel').val(null);
    $('input[type="date"]').val(null);
    $('.row').removeClass('alert');
    $('#type, #region, #local').empty().append('<option></option>');
    $('#region, #local, #reason').parent().addClass('disable');
    $('#x-fuel, #region, #local, #reason').removeProp('required');
    
    console.log($('#x-fuel, #region, #local, #reason'));
    for (let i = 0; i < 24; i++) {
        const h = (i.toString().length < 2) ? `0${i.toString()}:00`  : `${i.toString()}:00`;
        $('#start-tm, #end-tm').append(`<option>${h}</option>`);
    };
}

function inputData() {
    // console.log('url :', $('form').serialize());
    if (validateForm()){
        $.ajax({
            type: "POST",
            url: "/api-xfuel/action.php",
            data: $('form').serialize(),
            success: (response)=>{
                console.log('response :', response);
                // hidde();
                // loadList('all');
                // $('#div-msg').text("Registro inserido com sucesso!")
                // alert("Registro inserido!");
            },
            error: (e)=>{
                // console.log('erro:', e);
                alert('Erro ao tentar salvar os dados\nContate o administrador!');
            }
        });
    }
}

function validateForm () {
    const msg = $('#messages');
    let bol = true;

    let dtstart = new Date($('#start-dt').val());
    let hourStart = parseInt($('#start-tm').val().substr(0, 2));
    let minStart = parseInt($('#start-tm').val().substr(3, 2));

    let currentTime = new Date();

    // if (currentTime.getHours() > hourStart) { msg.text("Data final deve ser maior que data inicial!") bol}
    
    if (dtstart.getTime() > dtend.getTime()){ bol = false;
    }
    else if (dtstart.getTime() == dtend.getTime())
    {
        if (hourStart > parseInt($('#end-tm').val().substr(0, 2))){ bol = false;
        }
        else if (hourStart == parseInt($('#end-tm').val().substr(0, 2))) 
        {
            if (minStart > parseInt($('#end-tm').val().substr(3, 2))){ bol = false; }
        }
    }

    if (!bol){ msg.text("Data final deve ser maior que data inicial!"); }

    // function activeAlert(elm){
    //     let row;
    //     row = $(elm).parent();
    //     row.addClass('alert');
    //     $(elm).focus();
    //     bol = false;
    // }

    return bol;
}

// To hidden the 'hidde' div (form)
function hidde () {
    $('.reveal').addClass('hidden');
    $('.reveal').removeClass('reveal');
    $('#content-form').empty();
}    

// behavior
$('.reveal').click((e)=>{if(e.target.id==="enabling"){ hidde();}});

$('#btn-clear').click((e)=>{e.preventDefault();initialize();$('#rmk').empty();});

$('#btn-close').click((e)=>{e.preventDefault();hidde();});

$('[field]').click(()=>{$('#messages').empty();$('.row').removeClass('alert');});

$('#type').change((e)=>{if(e.target.value===""){initialize();}else if(e.target.value==="alert"){initialize(false);}else{loadRegion();}});

$('#region').change((e)=>{if(e.target.value===""){initialize();}else{loadLocal(e.target.value);}});

$('#local').change((e)=>{if(e.target.value===""){initialize();}});

$('form').ready(()=>{initialize();});