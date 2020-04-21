<?php
include_once(dirname(__DIR__) . "/src/database/database.php");

try {
    $db = new DataBase("XFUEL");

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (!isset($_GET)) {
                die('Method Unavailable');
            }

            $params = $_GET;
            $all = false;

            if (isset($params['date_start'])) {
                $start = new DateTime($params['date_start']);
                $params['date_start'] = $start->format('Y-m-d H:i');
                $all = true;
            }

            if (isset($params['date_end'])) {
                $end = new DateTime($params['date_end']);
                $params['date_end'] = $end->format('Y-m-d H:i');
                $all = true;
            }

            if (!$all) {
                $closed = isset($params['date_closed']) ? new DateTime($params['date_closed']) : null;
                $params['date_closed'] = $closed !== null ? $closed->format('Y-m-d H:i') : null;
            }

            $result = $db->select($params);
            header('Content-Type: application/json; charset=utf-8');
            echo (json_encode($result, JSON_UNESCAPED_UNICODE));
            break;

        case 'POST':
            if (!isset($_POST)) {
                return 'Method Unavailable';
            }

            $params = $_POST;

            if ($params['type'] === 'xfuel') {
                $params['region']       = $params['region'] !== "" ? $params['region'] : false;
                $params['reason']       = $params['reason'] !== "" ? $params['reason'] : false;
                $params['remark']       = $params['remark'] !== "" ? $params['remark'] : "";
            } else if ($params['type'] === 'alert') {
                $params['region']       = $params['region'] !== "" ? $params['region'] : 'alert';
                $params['reason']       = $params['reason'] !== "" ? $params['reason'] : 'alert';
                $params['remark']       = $params['remark'] !== "" ? $params['remark'] : false;
            } else {
                die('Tipo de informação inválida!');
            }

            $params['xfuel_value']  = $params['xfuel_value'] !== "" ? intval($params['xfuel_value']) : 0;
            $params['local']        = $params['local'] !== "" ? $params['local'] : false;
            $params['date_start']   = $params['date_start'] !== "" ? $params['date_start'] : false;
            $params['date_end']     = $params['date_end'] !== "" ? $params['date_end'] : false;
            $params['user_create']  = isset($params['user_create']) ? $params['user_create'] : "Teste";
            $params['user_change']  = isset($params['user_change']) ? $params['user_change'] : "Teste";

            if (checkFields($params)) {
                $result = $db->insert($params);
                header('Content-Type: application/json; charset=utf-8');
                echo (json_encode($result, JSON_UNESCAPED_UNICODE));
            } else {
                die("O campo {checkFields($params)} é obrigatório!");
            }
            break;

        default:
            die('Method Unavailable');
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo ($e);
}


function checkFields($params)
{
    foreach ($params as $key => $value) {
        if (!$value) {
            return $key;
        }
    }
    return true;
}
