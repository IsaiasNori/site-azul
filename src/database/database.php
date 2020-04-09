<?php

class DataBase {
    static function connection(){
        $ev = parse_ini_file(dirname(__DIR__, 1) . "/config/app.ini");
        $pathdb = dirname(__DIR__, 2) . $ev['sqlite3-path'] . $ev ['database'];

        $cn = new SQLite3($pathdb);

        if (!isset($cn)) { 
            die ('Error in DataBase: ' . $cn->lastErrorMsg());
        }

        return $cn;
    }

    static public function getXFuelFromQuery($sql){
        try {
            $result = self::connection()->query($sql);
            
            if (error_get_last() != null ) { throw new Exception(error_get_last()); }

            $data = array();

            while ($res = $result->fetchArray(SQLITE3_ASSOC)){
                array_push($data, $res);
            }
    
            return $data;
        }
        catch(Throwable $e) {
            throw new ErrorException($e);
        }
    }
}
?>