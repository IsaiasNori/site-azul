$(document).ready(()=>{
    $('#content').remove('.brick');
    $.get("/xfuel", loadData);
});

function loadData(data, status){
    if (status === 'success'){
        $(data).each((i, item)=>{
            const region = item.REGION.toLowerCase();
            $(`#${region}`).append(createBrick(item.LOCATION, item.XFUEL_VALUE, item.REASON));
            // console.log(item);
        });
    }
    else{
        console.log(status);
        alert (status);
    }
    
    $('.div-block').each((i, item)=>{
        let grid = (item.childElementCount > 5) ? 'div-block-grid2' : 'div-block-grid1';
        $(item).addClass(grid);
    })
    .toggle().toggle(1000);
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
    $(divName).text(name.toUpperCase());

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