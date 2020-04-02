<?php
require_once(dirname(__DIR__, 2) . "/src/database/database.php");

switch ($_SERVER['REQUEST_METHOD']){
    case 'GET':
        getXfuel();
    break;
    
    case 'POST':
        insertXfuel();
    break;
    
    default: return 'Method Unavailable';
}





function getXfuel(){
    if (isset($_GET['filter'])){
        try{
            $filter     = $_GET['filter'];
            $dtStart    = $_GET['date_start'];
            
            // if (isset($_GET['date_end'])) { $dtEnd = $_GET['date_end']; }
            // |^|^|^|^|^|^|^|^|Implementar funcao para recuperar historico
            
            if($filter == 'all'){
                $queryString = "SELECT * FROM XFUEL WHERE REAL_END IS NULL;" ;
            }else{
                $queryString = "SELECT * FROM XFUEL WHERE REGION =" . $filter . "AND REAL_END IS NULL;" ;
            }
            
            $data = DataBase::getXFuelFromQuery($queryString);
            header('Content-Type: application/json; charset=utf-8');
            echo (json_encode($data, JSON_UNESCAPED_UNICODE));

        }catch(Exception $e){
            echo $e . '\nErro ao conectar banco de dados';
            echo (http_response_code(500));
        }
    }
}

function insertXfuel(){
    echo 'ahaaaaa';
    // implementar essa caralha
}

?>