<?php

class DataBase {
    static function connection(){
        $ev = parse_ini_file(dirname(__DIR__, 1) . "/config/app.ini");
        $pathdb = dirname(__DIR__, 2) . $ev['sqlite3-path'] . $ev ['database'];

        $cn = new SQLite3($pathdb);

        if (!isset($cn)) { 
            die ('Error: ' . $cn->lastErrorMsg());
        }
        return $cn;
    }

    static public function getXFuelFromQuery($sql){
        $result = self::connection()->query($sql);
        $data = array();

        while ($res = $result->fetchArray(SQLITE3_ASSOC)){
            array_push($data, $res);
        }

        return $data;
    }
}
?>