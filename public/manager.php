<!DOCTYPE html>

<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./assets/css/manager.css">
    <script src="./assets/lib/jquery/jquery-3.4.1.min.js"></script>
    <script src="./assets/lib/date/date-format.js"></script>
    <title>Management BlueWeather</title>
</head>

<body>
    <header>
        <h1>Bl<font color="#5F87FF">u</font>e Weather</h1>

        <div>
            <h2>Extra Fuel Aplicado</h2>
            <h4><?php print date('H:i,  M d'); ?></h4>
        </div>

        <a href="/">HOME</a>
    </header>
    <div id="div-status" flex-center>
        <label id="status-msg"></label>
    </div>
    <main>
        <div id="content">
            <div id="menu-bar">
                <div id="switchs">
                    <button id="alert" class="switch">ALERTAS</button>
                    <button id="north" class="switch">NORTE</button>
                    <button id="northeast" class="switch">NORDESTE</button>
                    <button id="midwest" class="switch">C.OESTE</button>
                    <button id="southeast" class="switch">SUDESTE</button>
                    <button id="south" class="switch">SUL</button>
                    <button id="tma" class="switch">TMA</button>
                </div>
                <div id="icons">
                    <div title="Novo" class="icon new-icon"></div>
                    <div title="Editar" class="icon edit-icon"></div>
                    <div title="Remover" class="icon delete-icon"></div>
                </div>
            </div>

            <div id="table-content">
                <div id="table-head" flex-center>
                </div>
                <div id="table-body">
                </div>
            </div>
        </div>
    </main>

    <div id="placeholder-form" class="hidden"></div>

    <script src="./assets/js/manager.js"></script>
</body>

</html>