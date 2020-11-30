<?php
//this file is main parent for model files
namespace app\models;


require_once "Main.php";
use app\models\Main as Main; 



class Sys_countries extends Main{


    public $id;
    public $title;
    public $code;
    public $created_at;

    function __construct() {
        //set model values (tabke keys and table name)
        parent::__construct(array_keys(get_class_vars(get_class($this))),'sys_countries');
    }
}