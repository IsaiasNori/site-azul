<?php
include_once ('interface.php');

class XfuelDAO implements IDAO
{
    private $db;
    function __construct($database)
    {
        $this->db = $database;
    }

    function exec($procedure, $sql){
        $data = array();
        try {
            switch ($procedure){
                case 'insert':
                    // codar...
                    $results = $this->db->query($sql);

                    // while ($res = $results->fetchArray(SQLITE3_ASSOC)){
                    //     array_push($data, $res);
                    // }
                    $id = $this->db->lastInsertRowID();
                    $data = array("id" => $id);

                break;
                case 'delete':
                    // codar...
                    $query = 'delete';
                break;
                case 'update':
                    // codar...
                    $query = 'update';
                break;
                case 'search':
                    // codar...
                    // $query = 'search';
                    $results = $this->db->query($sql);
                    while ($row = $results->fetchArray()) {
                        array_push($data, $row);
                    }   
                break;
                default: return;
            }
            
            if (error_get_last() != null ) { throw new Exception(error_get_last()); }

            // return $data;
            // arrumar aqui
            return $data;
        }
        catch(Throwable $e) {
            throw new ErrorException('exec');
        }
    }
}

