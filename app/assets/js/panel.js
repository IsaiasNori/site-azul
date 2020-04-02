$(document).ready(()=>{
    let content = $('#content');
    content.remove('.brick');
    let blocks = $('.div-block');

    const dtStart = getCurrentDate();
    const uri = "/api-xfuel/action.php?"
                + "filter=all"
                + "&date_start=" + dtStart;
    $.ajax({
        type: "GET",
        url: uri
    }).done(function (result) {
        // let registers = JSON.parse(result);
        console.log( typeof(result) );
        // console.log("reg= " + registers );

        // for (const region in registers) {
        //     for (const base in region) {
        //         let brick = createBrick(base);
        //     }
        // }
    }).fail(function (d, status){
        alert (status);
    });




    blocks.toggle().toggle(1000);
});

function createBrick(item) {
    console.log('object :', item);
}

// $('.div-block').each((i, div) => {
// 	if (div.children.length <= 5){
// 		$(div).addClass('div-block-grid1');
// 	}
// 	else {
// 		$(div).addClass('div-block-grid2');
// 	}
// });

// $('#content').fadeIn(3000);

// // apagar essa linha depois
// $('#info-content').hide();


// function loadData(){
// 	const dtStart = getCurrentDate();
//     const uri = "/xfuel/action.php?"
//                 + "filter=all"
//                 + "&date_start=" + dtStart;
//     $.ajax({
//         type: "GET",
//         url: uri
//     }).done(function (result) {
//         $('#content').empty();
//         $('#content').append(createGrid(JSON.parse(result)));
//     }).fail(function (d, status){
//         alert (status);
//     });
// }

// function createGrid(data){
// 	$.each(data, (i, item)=>{
		
// 	});
// }