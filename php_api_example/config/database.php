<?php
//this file will contain db parameters of project
namespace app\config;

class Database {
    /**
     * database params
     * @var type 
     */
    private $params;

    protected function __construct(){
        //set database parameters
        /*$this->params = array(
            //host name  parameter
            'host' => '213.238.181.33',
            //post parameter
            'port' => '5432',
            //username parameter
            'user' => 'rentus',
            //password parameter
            'password' => 'Kadir412.',
            //db name parameter
            'database' => 'rentdb',
        );*/
    }


    /**
     * this method will connect to database and return pdo element
     * @return \PDO
     * @throws \Exception
     */
    function connect(){
        $pdo = new \PDO("sqlite:".__DIR__."/transport.sqlite");
        $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        return $pdo;
    }
}

