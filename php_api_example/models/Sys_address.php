<?php
//this file is main parent for model files
namespace app\models;


require_once "Main.php";
use app\models\Main as Main; 



class Sys_address extends Main{


    public $id;
    public $per_id;
    public $title;
    public $country;
    public $city;
    public $province;
    public $zipcode;
    public $content;
    public $created_at;

    function __construct() {
        //set model values (tabke keys and table name)
        parent::__construct(array_keys(get_class_vars(get_class($this))),'sys_address');
    }

    
}