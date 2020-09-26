<?php
//this file is main parent for model files
namespace app\models;


require_once "main.php";
use app\models\Main as Main; 



class Sys_utokens extends Main{


    public $id;
    public $user_id;
    public $user_sign;
    public $user_token;
    public $end_at;
    public $created_at;

    function __construct() {
        //set model values (tabke keys and table name)
        parent::__construct(array_keys(get_class_vars(get_class($this))),'sys_utokens');
    }

    
}