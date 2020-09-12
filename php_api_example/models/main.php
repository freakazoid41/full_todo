<?php
//this file is main parent for model files
namespace app\models\main;


require_once "../config/database.php";
use app\config\database\Database as db; 



class Main extends db{
    /**
     * table keys
     * @var type 
     */
    private $keys = [];

    /**
     * Connection
     * @var type 
     */
    private $conn;


    /**
     * this method will contruct table keys and database connection
     * @var keys 
     */
    protected function __construct($keys){
        //connect to database
        parent::__construct();
        //set table keys
        $this->keys = $keys;
        //connect to database
        $this->conn = $this->connect();
    }
}