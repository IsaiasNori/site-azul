
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
        <nav>
            <div id="div-msg"></div>
            <div id="nav-menu">
                <a href="../">Painel</a>
            </div>
        </nav>
        <main center>
            <div id="content">
                <div id="menu-bar" center>
                    <div id="div-options">
                        <button id="all" class="switch on">TODOS</button>
                        <button id="north" class="switch off">NORTE</button>
                        <button id="northeast" class="switch off">NORDESTE</button>
                        <button id="midwest" class="switch off">C.OESTE</button>
                        <button id="southeast" class="switch off">SUDESTE</button>
                        <button id="south" class="switch off">SUL</button>
                        <button id="tma" class="switch off">TMAs</button>
                        <button id="info" class="switch off">INFO</button>
                    </div>

                    <div id="action-menu">
                        <span  class="icons new-icon"></span>
                        <span  class="icons edit-icon"></span>
                        <span  class="icons delete-icon"></span>
                    </div>
                </div>

                <div id="xfuel-table">
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