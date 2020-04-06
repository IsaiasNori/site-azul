
// const typeField = $('#type-field');
// const localField = $("#local-field");
// const reasonField = $("#reason-field");



// const utils = function () {

// }
$(document).ready(()=>{
    formEmpty();
    
    $.get('/assets/json/utils.json', (json) => { 
        const types         = json.type;
        const reasons       = json.reason;
        const bases         = types.base;
        const tmas          = types.tma;
        const firs          = types.fir;

        const typeField     = $('#type-field');
        const localField    = $("#local-field");
        const reasonField   = $("#reason-field");

        $.each(types, (i)=>{
            typeField.append(
                `<option value="${i.toUpperCase()}">${i.toUpperCase()}</option>`
            );
        });

        $.each(reasons, (i)=>{
            reasonField.append(
                `<option value="${i.toUpperCase()}">${i.toUpperCase()}</option>`
            );
        });

        typeField.change((e)=>{
            localField.empty();
            switch ($(e.target).val()){
                case "BASE":
                    $.each(bases, (i, item)=>{
                        $.each(item, (j, value)=>{
                            localField.append(
                                `<option value="${value.toUpperCase()}">${value.toUpperCase()}</option>`
                            );
                        });
                    });
                    break;
                    
                case "TMA": 
                    $.each(tmas, (i, value)=>{
                        localField.append(
                            `<option value="${value.toUpperCase()}">${value.toUpperCase()}</option>`
                        );
                    });
                    break;
                    
                case "FIR":
                    $.each(firs, (i, value)=>{
                        localField.append(
                            `<option value="${value.toUpperCase()}">${value.toUpperCase()}</option>`
                        );
                    });
                    break;

                default: return;
            }
        });

        $('#btn-close').click((e)=>{
            e.preventDefault();
            hidde();
        });
        $('#btn-clear').click((e)=>{
            e.preventDefault();
            formEmpty();
        });
        $('#btn-save').click((e)=>{
            e.preventDefault();
            insertNew();
        });
    });

    $('[field]').change(()=>{
        $('.row').removeClass('alert');
        $('#messages').empty();
    });
});

    // To hidden the 'hidde' div (form)
function hidde () {
    if (window.event.srcElement == $('.reveal')[0] || window.event.srcElement == $('#btn-close')[0]){
        $('.reveal').addClass('hidden');
        $('.reveal').removeClass('reveal');
        $('#content-form').empty();
    }
}

function formEmpty(){
    $('[field]').empty();
    $('#xfuel-field').val("");
    $('.row').removeClass('alert');
    $('#messages').empty();
    $('#type-field ,#local-field ,#reason-field').append('<option>---</option>')

    console.log('clear');
    
    for (let i = 0; i < 24; i++) {
        const h = (i.toString().length < 2) ? `0${i.toString()}:00`  : `${i.toString()}:00`;
        $('#start-time, #end-time').append(`<option>${h}</option>`);
    };
}

function validateForm () {
    const msg = $('#messages');
    var obj;
    var row;

    if ($('#type-field').val() == '---' || !$('#type-field').val()) { 
        msg.text('O tipo de Informação é obrigatório!');
        row = $('#type-field').parent();
        row.addClass('alert');
        return false;
    }

    if ($('#local-field').val() == '---' || !$('#local-field').val()) {
        msg.text('A localidade é obrigatória!');
        row = $('#local-field').parent();
        row.addClass('alert');
        return false;
    }

    if ($('#xfuel-field').val() == "" && ($('#type-field').val() != 'BASE' || $('#type-field').val() != 'TMA')) {
        msg.text('Para BASE e TMA o xfuel é obrigatório!');
        row = $('#xfuel-field').parent();
        row.addClass('alert');
        return false;
    }




    // obj.type = $('#type-field').val();

}

function insertNew() {
    // alert("merdaaaaa");
    console.log(validateForm ());


    // $.ajax({
    //     type: "POST",
    //     url: "/api-xfuel/action.php",
    //     data: {
    //         name: "isaias",
    //         idade: 30,
    //         sexo: "M"
    //     }
    // }).done(function (e) {

    //     alert(e);
    
    // });
}

