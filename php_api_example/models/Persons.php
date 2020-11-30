<?php
//this file is main parent for model files
namespace app\models;


require_once "Main.php";
use app\models\Main as Main; 



class Persons extends Main{


    public $id;
    public $status;
    public $gender;
    public $title;
    public $id_number;
    public $birth_at;
    public $created_at;

    function __construct() {
        //set model values (tabke keys and table name)
        parent::__construct(array_keys(get_class_vars(get_class($this))),'persons');
    }

    function getTable($obj){
        $columns = array(
            'id'         => 'p.id',
            'gender'     => 'p.gender',
            'title'      => 'p.title',
            'status'     => 'p.status',
            'id_number'  => 'p.id_number',
            'birth_at'   => 'p.birth_at',
            'created_at' => 'p.created_at',
            'pcount'     => '8',
            'jcount'     => '9'
        );
        $limit = '';
        $order = '';
        $join = '';
        $where = ' where p.title!=\'\' ';    
        if (isset($obj['scale']['page']) && isset($obj['page'])) {
            $start = (intval($obj['scale']['page']) * intval($obj['scale']['limit'])) - intval($obj['scale']['limit']);
            $limit = " LIMIT " . $obj['scale']['limit'] . " OFFSET " . $start;
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
                            if($k!== 'pcount' && $k!== 'jcount'){
                                if($i!=0) $where.=' or ';
                                $column = explode('as',$columns[$k])[0];
                                $where.=' upper(trim(CAST('.$column.' as TEXT))) like'."'%" . $value . "%' ";
                                $i++;
                            }
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