function loadData(response, status) {
    if (status === 'success') {
        $(response).each((index, item) => {
            if (item.type === 'alert') {
                createAlert(item);
            } else {
                createBrick(item);
            }
        });

        $('#main').show();

        $('.block').each((i, item) => {
                let grid = (item.childElementCount < 5) ? 'grid4' : 'grid12';
                $(item).addClass(grid);
            })
            .toggle()
            .toggle(600);

    } else {
        alert(status);
    }

}

function createBrick(item) {
    const region = item.region;
    const reason = item.reason;
    const local = item.local.toUpperCase();
    const xfuel = item.xfuel_value;
    const remark = item.remark.toUpperCase() !== "" ? item.remark.toUpperCase() : "Sem Informação";
    const dotColor = fuelColor(xfuel);

    const brick = document.createElement("div");
    const divLocal = document.createElement("div");
    const divXfuel = document.createElement("div");
    const divDotColor = document.createElement("div");

    $(divLocal)
        .text(local)
        .addClass('local');

    $(divDotColor)
        .addClass(`dot ${dotColor}`);

    $(divXfuel)
        .append(divDotColor)
        .append(`${xfuel}`)
        .attr('title', remark)
        .addClass('xfuel');

    $(brick)
        .append(divLocal)
        .append(divXfuel)
        .addClass(`brick ${reason}-border`);

    $(`#${region}`)
        .append(brick);
}

function createAlert(item) {
    const xfuel = item.xfuel_value;
    const remark = item.remark.toUpperCase();
    const dotColor = fuelColor(xfuel);

    const rowAlert = document.createElement('div');
    const divXfuel = document.createElement('div');
    const divAlert = document.createElement('div');
    const divDotColor = document.createElement("div");

    $(divDotColor)
        .addClass(`dot ${dotColor}`);

    $(divXfuel)
        .append(divDotColor)
        .append(`${xfuel}`)
        .addClass('cell-alert');

    $(divAlert)
        .append(remark)
        .addClass('cell-alert');

    $(rowAlert)
        .append(divXfuel)
        .append(divAlert)
        .addClass('row-alert');

    $('footer')
        .append(rowAlert)
        .show();
}

function fuelColor(time) {
    if (time >= 45) return "red";
    else if (time >= 30) return "yellow";
    else if (time >= 15) return "green";
    return "white";
}

$(document).ready(() => {
    $('#main').hide();
    $('#main').remove('.brick');
    $('#footer').remove('.div-alert');
    $.get("xfuel.php", loadData);
});