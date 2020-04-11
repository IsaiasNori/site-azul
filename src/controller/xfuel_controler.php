<?php


abstract class Controller{
    private $data;
    function __construct($params = array())
    {
        $data = $params;   
    }
    function insert(){}
    function delete(){}
    function update(){}
    function search(){}
}

class XfuelController extends Controller{

    function insert() {
        return 'insert';
    }

    function delete(){
        return 'delete';
    }

    function update(){
        return 'update';
    }
    
    function search(){
        return 'insert';
    }

}