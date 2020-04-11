<?php
require_once(dirname(__DIR__, 2) . "/src/database/database.php");

switch ($_SERVER['REQUEST_METHOD']){
    case 'GET':
        getXfuel();
    break;
    
    case 'POST':
        postXfuel();
    break;
    
    default: return 'Method Unavailable';
}





function getXfuel(){
    if (isset($_GET['filter'])){
        try {
            $filter     = $_GET['filter'];
            $dtStart    = $_GET['date_start'];
            
            // if (isset($_GET['date_end'])) { $dtEnd = $_GET['date_end']; }
            // |^|^|^|^|^|^|^|^|Implementar funcao para recuperar historico
            
            if($filter == "all" ){
                $queryString = "SELECT * FROM XFUEL WHERE REAL_END IS NULL;" ;
            }else{
                $val = "'" . $filter . "'";
                $queryString = "SELECT * FROM XFUEL WHERE REGION = $val AND REAL_END IS NULL;" ;
                // $queryString = "SELECT * FROM XFUEL WHERE REGION = " . $filter . " AND REAL_END IS NULL;" ;
            }
            
            $data = DataBase::getXFuelFromQuery($queryString);
            
            if (error_get_last() != null) { throw new ErrorException('Error'); }

            header('Content-Type: application/json; charset=utf-8');
            echo (json_encode($data, JSON_UNESCAPED_UNICODE));
        }
        catch(Throwable $e) {
            http_response_code(500);
            echo(error_get_last());
        }
    }
}

function postXfuel(){
    // implementar essa caralha
    try {
        checkValues();

        if (error_get_last() != null) { throw new ErrorException(error_get_last()); }

        // echo('1:' . error_get_last());
        
        
        $xFuel      = intval($_POST['x-fuel']);
        $type       = $_POST['type'];
        $region     = $_POST['region'];
        $local      = $_POST['local'];
        $reason     = $_POST['reason'];
        $start      = new DateTime($_POST['start-dt'] . ' ' . $_POST['start-tm']);
        $end        = new DateTime($_POST['end-dt'] . ' ' . $_POST['end-tm']);
        $rmk        = $_POST['rmk'];
        

        
        // echo(error_reporting());
        // echo(E_WARNING);
        // if ($type == 'xfuel'){
        //     $values = "($xFuel,'$type','$region','$local','$reason','"
        //             . $start->format('d-m-Y H:i') . "','"
        //             . $end->format('d-m-Y H:i')
        //             . "','$rmk', 'eu','eu')";
    
        //     echo($values);
        // }
        // else {
        //     $values = "($xFuel,'$type','info','info','info','"
        //             . $start->format('d-m-Y H:i') . "','"
        //             . $end->format('d-m-Y H:i')
        //             . "','$rmk','eu','eu')";
            
        //     echo($values);
        // }
        // var_dump($start->format('d-m-Y H:i'));
            // // $sql = ""
            // var_dump(checkValues());

    }
    catch (Throwable $e) {
        http_response_code(500);
        var_dump(error_get_last());
        echo($e);
    }
    
}



function checkValues() {
    try{
        $find = array(",", ";", "*", "\n");
        str_replace($find, "", $_POST);
        foreach ($_POST as $field => $value){
            if (is_string($value)){
                if ($_POST[$field] != "") {$_POST[$field] = strtoupper($_POST[$field]);}
            }
        }
        return true;
    }
    catch(Throwable $e){
        throw new ErrorException('inconsitent data');
    }
}

?>