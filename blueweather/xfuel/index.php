<?php

// echo '<h1>Caralho</h1><hr>';
// chmod (dirname(__DIR__), 0755);
// chmod (dirname(__DIR__) . "/" . __FILE__, 0755);
include_once dirname(__DIR__, 2) . "/src/controller/xfuelcontroller.php";
include_once dirname(__DIR__, 2) . "/src/model/xfueldao.php";
include_once dirname(__DIR__, 2) . "/src/database/database.php";

try {
    switch ($_SERVER['REQUEST_METHOD']){
        case 'GET':
            if (isset($_GET)){     
                $database = new DataBase();
                $xfueldao = new XfuelDAO($database);
                $controller = new XfuelController($_GET, $xfueldao);
                $response = $controller->search();
            }
            else{
                echo 'Method Unavailable';
            }
        break;
        
        case 'POST':
            if (isset($_POST)){
                $database = new DataBase(); 
                $xfueldao = new XfuelDAO($database);
                $controller = new XfuelController($_POST, $xfueldao);
                $response = $controller->insert();
            }
            else{
                echo 'Method Unavailable';
            }
        break;
        
        default: echo 'Method Unavailable';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo (json_encode($response, JSON_UNESCAPED_UNICODE));
}
catch(Throwable $e){
    http_response_code(500);
    echo ($e);
}

?>