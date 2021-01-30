<?php
//this file is main parent for model files
namespace app\models;


require_once "Main.php";
use app\models\Main as Main; 



class Items extends Main{


    public $id;
    public $per_id;
    public $title;
    public $target_room;
    public $description;
    public $barcode;
    public $created_at;

    function __construct() {
        //set model values (tabke keys and table name)
        parent::__construct(array_keys(get_class_vars(get_class($this))),'items');
    }

    public function add($data=null){
        $rsp = array('data' =>array(),'success' => false,'msg'=>'Empty form..');
        if($data != null){
            //start transactions
            $this->trans();

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
            $sql = 'insert into '.$this->table.' ('.implode(',',$keys).") values (".implode(',',$values).")" ;
            $query = $this->conn->query($sql); 

            //get effected row count
            $result = $this->conn->lastInsertId();
            
            if($result!=0){
                //remove address information
                $sql = "insert into items_trans (item_id,status,desc) values ('".$result."','0','İtem Eklendi')" ;
                $query = $this->conn->query($sql); 
                $valid = $query->rowCount();
                if(!$valid) $result = 0;
            }

            //return result
            if($result==0){
                //rollback transactions
                $this->trans(2);
                $rsp = array('data' =>array(),'success' => false);
            }else{
                //commit transactions
                $this->trans(1);
                $rsp = array('data' =>array('id'=>$result),'success' => true,'msg'=>'Success...');
            }
        }
        return $rsp;
    }

    public function update($data){
        $rsp = array('data' =>array(),'success' => false,'msg'=>'Empty form..');
        if($data != null){
            //if id sended
            if(isset($data['id'])){
                $values = array();
                //set every key for update string
                foreach($data as $k=>$z){
                    if($z != '-1' && $k != 'id')array_push($values,trim($k)."='".trim($z)."'");
                }

                if(isset($data['status'])){
                    $this->table = 'items_trans';
                    //build sql
                    $sql = 'update '.$this->table.' set '.implode(',',$values)." where item_id='".$data['id']."'" ;
                }else{
                    //build sql
                    $sql = 'update '.$this->table.' set '.implode(',',$values)." where id='".$data['id']."'" ;
                } 

                $query = $this->conn->query($sql); 
                //get effected row count
                $result = $query->rowCount();
                //return result
                if($result!=1){
                    $rsp = array('data' =>array(),'success' => false);
                }else{
                    $rsp = array('data' =>array(),'success' => true,'msg'=>'Success...');
                }
            }else{
                $rsp = array('data' =>array(),'success' => false,'msg'=>'No id..');
            }
            
        }
        return $rsp;
    }

    function getTable($obj){
        $columns = array(
            'id'          => 'i.id',
            'person'      => 'p.name',
            'title'       => 'i.title',
            'status'      => 'it.status',
            'target_room' => 'i.target_room',
            'description' => 'i.description',
            'barcode'     => 'i.barcode',
            'created_at'  => 'i.created_at',
        );
        $limit = '';
        $order = '';
        $join = '   inner join sys_persons as p on p.id = i.per_id
                    inner join items_trans as it on it.item_id = i.id';
        $where = ' where i.title!=\'\' ';    
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
        $sql = 'select '.implode(",", array_values($columns)).' from '.$this->table.' as i '.$join.' ' . $where.$order.$limit ;
        $result = $this->conn->query($sql)->fetchAll(\PDO::FETCH_ASSOC);
       
        //count query
        $sql = 'select count(*) as row from '.$this->table.' as i '.$join.' ';
        $total_count = $this->conn->query($sql)->fetch(\PDO::FETCH_ASSOC);
        
        return array(
            'data'          => $result,
            'pageCount'     => ceil(intval($total_count['row']) / intval($obj['scale']['limit'])),
            'totalCount'    => $total_count['row'],
            'filteredCount' => count($result),
        );
    }
}