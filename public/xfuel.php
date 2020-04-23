<?php
include_once(dirname(__DIR__) . "/src/database/database.php");

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (!isset($_GET)) {
                throw new Error("Error Method Unavailable", 1);
            }
            $results = ready($_GET);
            header('Content-Type: application/json; charset=utf-8');
            echo (json_encode($results, JSON_UNESCAPED_UNICODE));
            break;

        case 'POST':
            if (!isset($_POST)) {
                throw new Error("Error Method Unavailable", 1);
            }
            $results = create($_POST);
            header('Content-Type: application/json; charset=utf-8');
            echo (json_encode($results, JSON_UNESCAPED_UNICODE));
            break;

        case 'DELETE':
            if (!isset($_REQUEST) || !isset($_REQUEST['id'])) {
                throw new Error("Error Method Unavailable", 1);
            }
            $id = intval($_REQUEST['id']);
            $closed = new DateTime('now');
            $results = update($id, ['date_closed' => $closed->format('Y-m-d H:i')]);
            if ($results) {
                echo ('Removido com sucesso!');
            } else {
                throw new Error("Erro ao remover!", 1);
            }
            break;

        case 'PUT':
            if (!isset($_REQUEST) || !isset($_REQUEST['id'])) {
                throw new Error("Error Method Unavailable", 1);
            }
            $id = intval($_REQUEST['id']);
            $closed = new DateTime('now');
            $results = update($id, ['date_closed' => $closed->format('Y-m-d H:i')]);
            if ($results) {
                $params = $_REQUEST;
                unset($params['id']);
                $results = create($params);
                header('Content-Type: application/json; charset=utf-8');
                echo (json_encode($results, JSON_UNESCAPED_UNICODE));
            } else {
                throw new Error("Erro ao remover!", 1);
            }
            break;
            break;

        default:
            throw new Error("Error Method Unavailable", 1);
            break;
    }
} catch (\Throwable $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo ($e->getMessage());
}


function ready($params)
{
    try {
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

        $db = new DataBase("XFUEL");
        $result = $db->select($params);
        return $result;
    } catch (\Throwable $e) {
        throw new Error($e->getMessage());
    }
}

function create($params)
{
    try {
        if ($params['type'] === 'xfuel') {
            $check = ready(['local' => $params['local']]);
            if (isset($check[0]['id'])) {
                throw new Error("Processo interrompido: Registro duplicado!");
            }
            $params['region'] = $params['region'] !== "" ? $params['region'] : false;
            $params['local'] = $params['local'] !== "" ? $params['local'] : false;
            $params['reason'] = $params['reason'] !== "" ? $params['reason'] : false;
            $params['remark'] = $params['remark'] !== "" ? $params['remark'] : "";
        } else if ($params['type'] === 'alert') {
            $check = ready(['remark' => $params['remark']]);
            if (isset($check[0]['id'])) {
                throw new Error("Processo interrompido: Registro duplicado!");
            }
            $params['region'] = 'alert';
            $params['local'] = 'alert';
            $params['reason'] = 'alert';
            $params['remark'] = $params['remark'] !== "" ? $params['remark'] : false;
        } else {
            throw new Error("Processo interrompido: Tipo de Registro Inválido!");
        }

        $params['xfuel_value'] = $params['xfuel_value'] !== "" ? intval($params['xfuel_value']) : 0;
        $params['date_start'] = $params['date_start'] !== "" ? $params['date_start'] : false;
        $params['date_end'] = $params['date_end'] !== "" ? $params['date_end'] : false;
        $params['user_create'] = isset($params['user_create']) ? $params['user_create'] : "Teste";
        $params['user_change'] = isset($params['user_change']) ? $params['user_change'] : "Teste";

        if (!checkFields($params)) {
            throw new Error("Processo interrompido: O campo {checkFields($params)} é obrigatório!");
        } else {
            $db = new DataBase("XFUEL");
            $result = $db->insert($params);
            return $result;
        }
    } catch (\Throwable $e) {
        throw new Error($e->getMessage());
    }
}

function update($id, $params)
{
    try {
        $db = new DataBase('XFUEL');
        $result = $db->update($id, $params);
        return $result;
    } catch (\Throwable $e) {
        throw new Error($e, 1);
    }
}

function remove($id)
{
    try {
        if ($id !== "") {
            $db = new DataBase('XFUEL');
            $result = $db->delete($id);
            return $result;
        } else {
            throw new Error("Processo interrompido: Informe o ID a ser excluído!");
        }
    } catch (\Throwable $e) {
        throw new Error($e->getMessage());
    }
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
