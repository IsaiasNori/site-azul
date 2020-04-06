$(document).ready(()=>{
    let content = $('#content');
    content.remove('.brick');
    
    const dtStart = getCurrentDate();
    const uri = "/api-xfuel/action.php?"
    + "filter=all"
    + "&date_start=" + dtStart;
    $.ajax({
        type: "GET",
        url: uri
    }).done(function (result) {
        loadData(result);
    }).fail(function (d, status){
        alert (status);
    });
    
    let blocks = $('.div-block');
    blocks.toggle().toggle(1000);
});


function loadData(data){
    $(data).each((i, item)=>{
        const region = item.REGION.toLowerCase();
        
        $(`#${region}`).append(createBrick(item.LOCATION, item.XFUEL_VALUE, item.REASON));
        console.log(item);
    });
    
    $('.div-block').each((i, item)=>{
        if ($(item).children > 5) $(item).addClass('div-block-grid2');
        else $(item).addClass('div-block-grid1');
    });
}

function createBrick(name, qtyFuel, reason){
    let color = fuelColor(qtyFuel);

    let divFuelColor = document.createElement("div");
    $(divFuelColor).addClass(`dot ${color}`);

    let divXfuel = document.createElement("div");
    $(divXfuel).addClass('xfuel-content');
    $(divXfuel).append(divFuelColor);
    $(divXfuel).append(qtyFuel);

    let divName = document.createElement("div");
    $(divName).addClass('base-name');
    $(divName).text(name);

    let brick = document.createElement("div");
    $(brick).addClass(`brick ${reason.toLowerCase()}-border`);
    $(brick).append(divName);
    $(brick).append(divXfuel);

    return brick;
}

function fuelColor (time) {
    if(time >= 45) return "red"; 
    else if(time >= 30)  return "yellow"; 
    else if(time >= 15) return "green"; 
    return "white";
}