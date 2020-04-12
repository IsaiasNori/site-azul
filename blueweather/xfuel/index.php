<?php
$root = dirname(__DIR__, 2);

include_once ("$root/src/controller/xfuelcontroller.php");
include_once ("$root/src/model/xfueldao.php");
include_once ("$root/src/database/database.php");

try {
    $database = new DataBase();
    $xfueldao = new XfuelDAO($database);
    
    switch ($_SERVER['REQUEST_METHOD']){
        case 'GET':
            if (!isset($_GET)){ return 'Method Unavailable'; }

            $controller = new XfuelController($_GET, $xfueldao);
            $response = $controller->search();
        break;
        
        case 'POST':
            if (!isset($_POST)){ return 'Method Unavailable'; }

            $controller = new XfuelController($_POST, $xfueldao);
            $response = $controller->insert();
        break;
        
        default: return 'Method Unavailable';
    }

    header('Content-Type: application/json; charset=utf-8');
    echo (json_encode($response, JSON_UNESCAPED_UNICODE));
}
catch(Throwable $e){
    http_response_code(500);
    echo ($e);
}

?>