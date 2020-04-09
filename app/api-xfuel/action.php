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
        // if (checkValues() == true) { throw new ErrorException('Error'); }

        $xFuel      = strtoupper($_POST['x-fuel'    ]);
        $type       = strtoupper($_POST['type'      ]);
        $region     = strtoupper($_POST['region'    ]);
        $local      = strtoupper($_POST['local'     ]);
        $reason     = strtoupper($_POST['reason'    ]);
        $startDt    = strtoupper($_POST['start-dt'  ]);
        $startTm    = strtoupper($_POST['start-tm'  ]);
        $endDt      = strtoupper($_POST['end-dt'    ]);
        $endTm      = strtoupper($_POST['end-tm'    ]);
        $rmk        = strtoupper($_POST['rmk'       ]);

        $values = "('$xFuel', '$type', '$region', '$local', '$reason', '$startDt $startTm', '$endDt $endTm','$rmk',"
            . " 'eu', 'eu')";

        // // $sql = ""
        // var_dump(checkValues());
        var_dump($values);

    }
    catch (Throwable $e) {
        http_response_code(500);
        echo(error_get_last());
    }
    
}



function checkValues() {
    $find = array(",", ";", "*", "\n");
    str_replace($find, "", $_POST);
}

?>