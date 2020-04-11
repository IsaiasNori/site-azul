<?php
include_once (dirname(__DIR__, 1) . '..\model\interface.php');

abstract class Controller implements IRegister{
    protected $data;
    protected $dao;
    function __construct($data, $dao){
        $this->data = $data;
        $this->dao = $dao;
    }   
}