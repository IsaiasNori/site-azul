<?php

class DataBase extends SQLite3{
    function __construct()
    {
        $ev = parse_ini_file(dirname(__DIR__, 1) . "/config/app.ini");
        $pathdb = dirname(__DIR__, 2) . $ev['sqlite3-path'] . $ev['database'];
        parent::__construct($pathdb);
    }
}
?>