<?php
//this file is main parent for model files
namespace app\models;


require_once "Main.php";
use app\models\Main as Main; 



class Sys_persons extends Main{


    public $id;
    public $type_id;
    public $name;
    public $code;
    public $gender;
    public $id_number;
    public $birth_place;
    public $birth_date;
    public $status;
    public $created_at;

    function __construct() {
        //set model values (tabke keys and table name)
        parent::__construct(array_keys(get_class_vars(get_class($this))),'sys_persons');
    }

    public function delete($data){
        $rsp = array('data' =>array(),'success' => false);
        if($data != null){
            //start transactions
            $this->trans();

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
            
            if($result==1){
                //remove address information
                $sql = "delete from sys_address where per_id='".$data['id']."'" ;
                $query = $this->conn->query($sql); 
                $result = $query->rowCount();
            }
            
            //return result
            if($result==1){
                //commit transactions
                $this->trans(1);
                $rsp = array('data' =>array(),'success' => true,'msg'=>'Success...');
            }else{
                $this->trans(2);
                $rsp = array('data' =>array(),'success' => false);
            }
        }
        return $rsp;
    }

    function getTable($obj){
        $columns = array(
            'id'         => 'p.id',
            'type_id'    => 'p.type_id',
            'name'       => 'p.name',
            'status'     => 'p.status',
            'gender'     => 'p.gender',
            'code'       => 'p.code',
            'created_at' => 'p.created_at',
        );
        $limit = '';
        $order = '';
        $join = '';
        $where = ' where p.name!=\'\' ';    
        if (isset($obj['scale']['page']) && isset($obj['scale']['limit'])) {
            $start = (intval($obj['scale']['page']) * intval($obj['scale']['limit'])) - intval($obj['scale']['limit']);
            $limit = " LIMIT ".$start.','. $obj['scale']['limit'];
        }

        if (isset($obj['order'])){
            $column = explode('as',$columns[$obj['order']['key']])[0];
            $order = ' order by ' .$column. ' ' . $obj['order']['style'].' ';
        }
        
        if (isset($obj['filter'])){
            //$obj['filter'] = json_decode($obj['filters'],true);
            foreach($obj['filter'] as $f){
                switch($f['key']){
                    case 'all':
                        $value = mb_strtoupper($f['value']);
                        $where .= ' and (';
                        //set columns   
                        $i = 0;
                        foreach($columns as $k=>$v){
                            if($i!=0) $where.=' or ';
                            $column = explode('as',$columns[$k])[0];
                            $where.=' upper(trim(CAST('.$column.' as TEXT))) like'."'%" . $value . "%' ";
                            $i++;
                        }
                        $where .= ' ) ';
                    break;
                    default:
                        if(trim($f['value']) != '')$where.=" and ".$columns[$f['key']]." ='".$f['value']."' ";
                        break;
                }
                
            }
        }     

        //create query    
        $sql = 'select '.implode(",", array_values($columns)).' from '.$this->table.' as p '.$join.' ' . $where.$order.$limit ;
        $result = $this->conn->query($sql)->fetchAll(\PDO::FETCH_ASSOC);
       
        //count query
        $sql = 'select count(*) as row from '.$this->table.' as p '.$join.' ';
        $total_count = $this->conn->query($sql)->fetch(\PDO::FETCH_ASSOC);
        
        return array(
            'data'          => $result,
            'pageCount'     => ceil(intval($total_count['row']) / intval($obj['scale']['limit'])),
            'totalCount'    => $total_count['row'],
            'filteredCount' => count($result),
        );
    }
}