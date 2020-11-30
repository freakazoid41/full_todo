<?php
//this file is main parent for model files
namespace app\models;


require_once "config/database.php";
use app\config\Database as db; 



class Main extends db{
    /**
     * table keys
     * @var array 
     */
    private $keys = [];

    /**
     * table name
     * @var string
     */
    protected $table = 'no_name';


    /**
     * Connection
     * @var object 
     */
    protected $conn;


    /**
     * this method will contruct table keys and database connection
     * @var array 
     */
    function __construct($keys,$table){
        //connect to database
        parent::__construct();
        //set table keys
        $this->keys = $keys;
        //se table name
        $this->table = $table;
        //connect to database
        $this->conn = $this->connect();
    }


    public function get($obj = null){
        $select = [];
        foreach($this->keys as $c){
            if($c != 'table' && $c != 'conn' )
            array_push($select,'i.'.$c);
        }
        //build sql
        $sql = "select  ".implode(',',$select)." from ".$this->table." as i";
        if($obj != null){
            //set every key for where string
            $values = array();
            foreach($obj as $k=>$z){
                if($z != '-1')array_push($values,trim($k)."='".trim($z)."'");
            }
            if(count($values)>0)$sql .= ' where '.implode(' and ',$values);
        }

        $query = $this->conn->query($sql); 
        $result = $query->fetchAll(\PDO::FETCH_ASSOC);
        //return result
        if(count($result)==0){
            return array('data' =>array(),'rsp'=>false);
        }
        return array('data' =>$result,'rsp'=>true);
    }

    public function add($data=null){
        $rsp = array('data' =>array(),'rsp'=>false,'msg'=>'Empty form..');
        if($data != null){
            $values = array();
            $keys = array();
            //set every key for update string
            foreach($data as $k=>$z){
                if($z != '-1' && $k != 'id' && \strlen($z)>0){
                    \array_push($keys,$k);
                    \array_push($values,"'".$z."'");
                }
            }

            //set lang key if exist in model
            if(in_array('lang_key',$this->keys)){
                array_push($keys,'lang_key');
                array_push($values,"'".$this->lang_key."'");
            }
            
            //build sql
            $sql = 'insert into '.$this->table.' ('.implode(',',$keys).") values (".implode(',',$values).") returning id" ;
            $query = $this->conn->query($sql); 
            //get effected row count
            $result = $this->conn->lastInsertId();
            //return result
            if($result==0){
                $rsp = array('data' =>array(),'rsp'=>false);
            }else{
                $rsp = array('data' =>array('id'=>$result),'rsp'=>true,'msg'=>'Success...');
            }
        }
        return $rsp;
    }

    public function update($data){
        $rsp = array('data' =>array(),'rsp'=>false,'msg'=>'Empty form..');
        if($data != null){
            //if id sended
            if(isset($data['id'])){
                $values = array();
                //set every key for update string
                foreach($data as $k=>$z){
                    if($z != '-1' && $k != 'id')array_push($values,trim($k)."='".trim($z)."'");
                }
                //build sql
                $sql = 'update '.$this->table.' set '.implode(',',$values)." where id='".$data['id']."'" ;
                $query = $this->conn->query($sql); 
                //get effected row count
                $result = $query->rowCount();
                //return result
                if($result!=1){
                    $rsp = array('data' =>array(),'rsp'=>false);
                }else{
                    $rsp = array('data' =>array(),'rsp'=>true,'msg'=>'Success...');
                }
            }else{
                $rsp = array('data' =>array(),'rsp'=>false,'msg'=>'No id..');
            }
            
        }
        return $rsp;
    }

    public function delete($data){
        $rsp = array('data' =>array(),'rsp'=>false);
        if($data != null){
            
            $values = array();
            //set every key for update string
            foreach($data as $k=>$z){
                if($z != '-1')array_push($values,trim($k)."='".trim($z)."'");
            }
            //build sql
            $sql = 'delete from '.$this->table.' where '.implode(' and ',$values) ;
            $query = $this->conn->query($sql); 
            //get effected row count
            $result = $query->rowCount();
            //return result
            if($result!=1){
                $rsp = array('data' =>array(),'rsp'=>false);
            }else{
                $rsp = array('data' =>array(),'rsp'=>true,'msg'=>'Success...');
            }
            
        }
        return $rsp;
    }

    public function trans($type=0){
        switch($type){
            case 0:
                //begin transaction
                $this->conn->beginTransaction();
            break;
            case 1:
                //commit transaction
                $this->conn->commit();
            break;
            case 2:
                //rollback transaction
                $this->conn->rollBack();
            break;
        }

    }
}