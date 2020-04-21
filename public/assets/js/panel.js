function loadData(response, status){
    $('#content').remove('.brick').show();

    if (status === 'success'){
        // console.log('response :', response);
        $(response).each(createBrick);
    }
    else{
        // console.log('status :', status);
        alert (status);
    }

    $('.div-block').each((i, item)=>{
        let grid = (item.childElementCount > 5) ? 'div-block-grid2' : 'div-block-grid1';
        $(item).addClass(grid);
    })
    .toggle().toggle(600);
}

function createBrick(index, item){
    const region        = item.REGION.toLowerCase();
    const local         = item.LOCATION.toUpperCase();
    const reason        = item.REASON.toLowerCase();
    const qtyFuel       = item.XFUEL_VALUE;
    const brick         = document.createElement("div");
    const divXfuel      = document.createElement("div");
    const divName       = document.createElement("div");
    const divFuelColor  = document.createElement("div");
    const color         = fuelColor(qtyFuel);

    $(divFuelColor).addClass(`dot ${color}`);
    $(divXfuel).append(divFuelColor).append(qtyFuel).addClass('xfuel-content');
    $(divName).text(local).addClass('base-name');
    $(brick).append(divName).append(divXfuel).addClass(`brick ${reason}-border`);

    $(`#${region}`).append(brick);
}

function fuelColor (time) {
    if(time >= 45)      return "red"; 
    else if(time >= 30) return "yellow"; 
    else if(time >= 15) return "green"; 
    return "white";
}

$('#content').hide();

$(document).ready(()=>{$.get("/xfuel",loadData);});


