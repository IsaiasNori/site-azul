function initialize(eraser = true){
    emptyForm();
    $.get('../assets/json/utils.json', (json, status)=>{
        if (status === 'success'){
            $.each(json.type, (key)=>{
                let opt = key==='alert' ? "ALERTA" : key.toUpperCase();
                $('#type').append(`<option value="${key}">${opt}</option>`);
            });
            if(!eraser){$('#type option[value="alert"]').prop('selected',true);}
        }else{
            msg('Servidor indisponível!');
        }
    });
}

function loadRegion() {
    $.get('../assets/json/utils.json', (json, status)=>{
        if (status === 'success'){
            $('#region, #local, #reason').parent().removeClass('disable');
            $('#x-fuel, #region, #local, #reason').prop('required', true);
            $.each(json.type.xfuel, (key, item)=>{
                $('#region').append(`<option value="${key}">${item.label}</option>`);
            });
            $.each(json.reason, (key, item)=>{
                $('#reason').append(`<option value="${key}">${key.toUpperCase()}</option>`);
            });
        }else{
            msg('Servidor indisponível!');
        }
    });
}

function loadLocal(regionVal) {
    $.get('../assets/json/utils.json', (json, status)=>{
        if (status === 'success'){
            $.each(json.type.xfuel[regionVal].bases, (i, local)=>{
                $('#local').append(`<option value="${local}">${local.toUpperCase()}</option>`);
            });
        }else{
            msg('Servidor indisponível!');
        }
    });
}

function emptyForm(){

    $('[field]').empty();
    $('#messages').empty();
    $('#x-fuel').val(null);
    $('input[type="date"]').val(null);
    $('.row').removeClass('alert');
    $('#type, #region, #local, #reason').empty().append('<option></option>');
    $('#region, #local, #reason').parent().addClass('disable');
    $('#x-fuel, #region, #local, #reason').prop('required', false);
    
    for (let i = 0; i < 24; i++) {
        const h = (i.toString().length < 2) ? `0${i.toString()}:00`  : `${i.toString()}:00`;
        $('#start-tm, #end-tm').append(`<option>${h}</option>`);
    };
}

function inputData(e) {
    e.preventDefault();
    if (validateForm()){
        $.ajax({
            type: "POST",
            url: "/xfuel",
            data: $('form').serialize(),
            success: (response)=>{
                console.log('response :', response);
                if (response.id !== ""){
                    loadList('all');
                    $('#div-msg').text("Registro inserido com sucesso!")
                    hidde();
                }
            },
            error: (e)=>{
                console.log('e :', e.responseText);
                msg('Servidor indisponível!');
            }
        });
    }
}

function validateForm () {
    // let bol = true;

    let currentTime = new Date();
    let start = new Date(`${$('#start-dt').val()} ${$('#start-tm').val()}`);
    let end = new Date(`${$('#end-dt').val()} ${$('#end-tm').val()}`);


    if(start < currentTime) {$('#start-dt').focus(); msg(`Data Inicial deve ser maior que a Atual`); return false;}
    if(end <= start) {$('#start-dt').focus(); msg('Data final deve ser maior que Data Inicial'); return false;}

    return true;
}

// To hidden the 'hidde' div (form)
function hidde () {
    $('.reveal').addClass('hidden');
    $('.reveal').removeClass('reveal');
    $('#content-form').empty();
}

function msg(text){$('#messages').text(text);}

// behavior
$('.reveal').click((e)=>{if(e.target.id==="enabling"){ hidde();}});

$('#btn-clear').click((e)=>{e.preventDefault();initialize();$('#rmk').empty();});

$('#btn-close').click((e)=>{e.preventDefault();hidde();});

$('[field]').click(()=>{$('#messages').empty();$('.row').removeClass('alert');});

$('#type').change((e)=>{if(e.target.value===""){initialize();}else if(e.target.value==="alert"){initialize(false);}else{loadRegion();}});

$('#region').change((e)=>{if(e.target.value===""){initialize();}else{loadLocal(e.target.value);}});

$('#local').change((e)=>{if(e.target.value===""){initialize();}});

$('form').ready(()=>{initialize();}).on('submit', inputData);
