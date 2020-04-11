<?php

interface IRegister {
    function insert();
    function delete();
    function update();
    function search();
    function checkValues();
}

interface IDAO {
    function __construct($database);
    function exec($procedure, $values);
}