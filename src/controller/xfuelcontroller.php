<?php
include_once ('controller.php');

class XfuelController extends Controller{
    function __construct($data, $dao)
    {
        parent::__construct($data, $dao);
    }

    function insert() {
        try {
            if($this->checkValues()){
                $xFuel      = intval($this->data['x-fuel']);
                $type       = $this->data['type'];
                $region     = ($this->data['region']!=="") ? $this->data['region'] : 'info';
                $local      = ($this->data['local']!=="") ? $this->data['local'] : 'info';
                $reason     = ($this->data['reason']!=="") ? $this->data['reason'] : $this->data['type'];
                $start      = new DateTime($this->data['start-dt'] . ' ' . $this->data['start-tm']);
                $end        = new DateTime($this->data['end-dt'] . ' ' . $this->data['end-tm']);
                $rmk        = $this->data['rmk'];

                $start  = $start->format('Y-m-d H:i');
                $end    = $end->format('Y-m-d H:i');
                
                $params = "XFUEL_VALUE, TYPE, REGION, LOCATION, REASON, DATE_START, PLANNED_END, REMARK, CREATE_USER, CHANGE_USER";
                
                $left = "$xFuel,'$type','$region','$local','$reason',";

                $right  = "'$start','$end','$rmk','eu','eu'";

                $values = $left . $right;

                $sql = "INSERT INTO XFUEL ($params) VALUES ($values);";
                
                $result = $this->dao->exec('insert', $sql);
                return $result;

                // return 'insert';
            }
            else {
                throw new ErrorException('Controller');
            }
            
        }
        catch (Throwable $e) {
            throw new ErrorException('Insert' . $e);
        }
    }

    function delete(){
        return 'delete';
    }

    function update(){
        return 'update';
    }
    
    function search(){
        try {
            if($this->checkValues()){
                $filter = isset($this->data['sort']) ? $this->data['sort']: 'all';
                $today = new DateTime('now');

                $start = isset($this->data['start']) ? new DateTime($this->data['start']) : $today;
                $start = $start->format('Y-m-d') . " 00:00";
                $dateStart = "DATE_START >= '$start' ";
                
                if(isset($this->data['end'])) {
                    $end = new DateTime($this->data['end']);
                    $end = $end->format('Y-m-d') . " 00:00";
                    $dateEnd = "AND REAL_END IS NULL OR REAL_END <= '$end';";
                }

                $dateEnd = isset($dateEnd) ? $dateEnd : "AND REAL_END IS NULL;";

                $rightSql = $dateStart . $dateEnd;
                
                $leftSql = ($filter == "all") ? "SELECT * FROM XFUEL WHERE " : "SELECT * FROM XFUEL WHERE REGION = '$filter' AND ";
                
                $sql = $leftSql . $rightSql;
                
                $result = $this->dao->exec('search', $sql);
                return $result;
            }
            else {
                throw new ErrorException('Controller');
            }
        }
        catch (Throwable $e) {
            throw new ErrorException('Search' . $e);
        }
    }
    

    function checkValues() {
        try{
            $find = array(",", ";", "*", "\n");
            str_replace($find, "", $this->data);
            // foreach ($this->data as $field => $value){
            //     if (is_string($value)){
            //         if ($this->data[$field] != "") {$this->data[$field] = strtoupper($this->data[$field]);}
            //     }
            // }
            return true;
        }
        catch(Throwable $e){
            return false;
        }
    }

}