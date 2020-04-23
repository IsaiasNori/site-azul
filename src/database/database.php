<?php

class DataBase
{
    private $cn;
    private $table = "";
    function __construct($table)
    {
        $ev = parse_ini_file(dirname(__DIR__, 1) . "/config/app.ini");
        $pathdb = dirname(__DIR__, 2) . '/sqlite3/' . $ev['database'];

        $this->table = $table;

        $this->cn = new PDO("sqlite:$pathdb");
    }

    function select(array $filters = [], $columns = "*")
    {
        try {
            $results = array();

            if (count($filters) < 1) {
                $sql = "SELECT FIRST 50 {$columns} FROM $this->table";

                $data =  $this->cn->query($sql);

                while ($row = $data->fetch(PDO::FETCH_ASSOC)) {
                    array_push($results, $row);
                }
            } else {
                $sql = "SELECT {$columns} FROM "
                    . $this->table
                    . $this->filtersToSelectString($filters);

                $stmt = $this->cn->prepare($sql);

                foreach ($filters as $key => $value) {
                    $stmt->bindValue(":{$key}", $value);
                }
            }

            if ($stmt->execute()) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    array_push($results, $row);
                }

                return $results;
            } else {
                die('Error: DataBase');
            }
        } catch (Throwable $e) {
            die($e);
        }
    }

    function insert(array $params)
    {
        if ($params && count($params) > 0) {
            $keysSql = "(";
            $valuesSql = "(";
            foreach ($params as $key => $value) {
                $keysSql .= "$key,";
                $valuesSql .= ":$key,";
            }

            $keysSql =  substr($keysSql, 0, -1) . ")";
            $valuesSql = substr($valuesSql, 0, -1) . ")";

            $sql = "INSERT INTO $this->table $keysSql VALUES $valuesSql";

            $stmt = $this->cn->prepare($sql);

            foreach ($params as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }

            if ($stmt->execute()) {
                return ["id" => $this->cn->lastInsertId()];
            } else {
                die("Error: Database");
            }
        }
    }

    // abstract function getOne($columns = "*",$filters = []);

    function update($id, array $params)
    {
        if ($id && $params && count($params) > 0) {
            $setSql = " SET";

            foreach ($params as $key => $value) {
                $setSql .= " $key = :$key,";
            }

            $setSql =  substr($setSql, 0, -1);

            $sql = "UPDATE $this->table $setSql WHERE id = $id";

            $stmt = $this->cn->prepare($sql);

            foreach ($params as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }

            if ($stmt->execute()) {
                return ["id" => $id];
            } else {
                die("Error: Database");
            }
        }
    }

    function delete($id)
    {
        if ($id !== "") {
            $sql = "DELETE FROM $this->table WHERE id = :id";
            $stmt = $this->cn->prepare($sql);
            $stmt->bindValue(":id", $id, PDO::PARAM_INT);
            if ($stmt->execute()) {
                return true;
            }
        }
        return false;
    }

    private static function filtersToSelectString($arr)
    {
        $str = " WHERE 1 = 1";
        foreach ($arr as $key => $value) {
            if ($key === "date_start") {
                $str .= " AND {$key} >= :{$key}";
            } elseif ($key === "date_end") {
                $str .= " AND {$key} <= :{$key}";
            } else {
                if ($value === null) {
                    $str .= " AND {$key} IS :{$key}";
                } else {
                    $str .= " AND {$key} = :{$key}";
                }
            }
        }
        return $str;
    }
}
