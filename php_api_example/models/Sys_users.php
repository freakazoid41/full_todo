<?php
//this file is main parent for model files
namespace app\models;


require_once "Main.php";
use app\models\Main as Main; 



class Sys_users extends Main{


    public $id;
    public $person_id;
    public $utype;
    public $status;
    public $username;
    public $password;
    public $created_at;

    function __construct() {
        //set model values (tabke keys and table name)
        parent::__construct(array_keys(get_class_vars(get_class($this))),'sys_users');
    }

    
}