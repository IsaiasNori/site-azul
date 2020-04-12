
<!DOCTYPE html>

<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700,900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/assets/css/manager.css">
        <script src="/assets/common/jquery/jquery-3.4.1.min.js"></script>
        <script src="/assets/common/date/date-format.js"></script>
        <title>Blue Weather Management</title>
    </head>

    <body>
        <header></header>
        <div id="div-status">
            <label id="status-msg">Teste Teste Teste Teste</label>
        </div>
        <main>
            <div id="content">
                <div id="menu-bar" center>
                    <div id="switchs">
                        <button id="all" class="switch on">TODOS</button>
                        <button id="north" class="switch">NORTE</button>
                        <button id="northeast" class="switch">NORDESTE</button>
                        <button id="midwest" class="switch">C.OESTE</button>
                        <button id="southeast" class="switch">SUDESTE</button>
                        <button id="south" class="switch">SUL</button>
                        <button id="tma" class="switch">TMAs</button>
                        <button id="info" class="switch">INFO</button>
                    </div>
                    <div id="icons">
                        <div class="icon new-icon"></div>
                        <div class="icon edit-icon"></div>
                        <div class="icon delete-icon"></div>
                    </div>
                </div>

                <div id="div-table">
                    <div id="table-head">
                        <span>TIPO</span>
                        <span>LOCAL</span>
                        <span>XFUEL</span>
                        <span>MOTIVO</span>
                        <span>INICIO</span>
                        <span>TERMINO</span>
                    </div>

                    <div id="table-body">
                        <!-- REGISTROS -->
                    </div>
                </div>
            </div>
        </main>

        <div id="enabling" class="hidden" center>
            <div id="content-form"></div>
        </div>
        
        <script src="/assets/js/manager.js"></script>
    </body>
</html>