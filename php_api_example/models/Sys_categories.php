<?php
//this file is main parent for model files
namespace app\models;


require_once "Main.php";
use app\models\Main as Main; 



class Sys_categories extends Main{


    public $id;
    public $parent_id;
    public $status;
    public $title;
    public $lang_key;
    public $icon;
    public $created_at;

    function __construct() {
        //set lang key if new added
        $this->lang_key = 'cat_key_'.\str_replace('.','',microtime(true));
        //set model values (table keys and table name)
        parent::__construct(array_keys(get_class_vars(get_class($this))),'sys_categories');
    }

    //special remove method for categories and childs
    public function delete($data){
        $rsp = array('data' =>array(),'rsp'=>false);
        if($data != null){
            $childs = array($data['id']);
            $childs = array_merge($childs,$this->getChilds($data['id']));
            $valid = true;

            //begin transaction
            $this->trans();

            //foreach item
            foreach($childs as $c){
                if($valid){
                    $valid = parent::delete(array(
                        'id'=>$c
                    ))['rsp'];
                }else{
                    //rollback everything
                    $this->trans(2);
                    break;
                }
            }

            //commit transaction if valid
            if($valid)$this->trans(1);

            $rsp = array('data' =>array(),'rsp'=>$valid,'msg'=>$valid ? 'Success..' : 'Failed !!');
        }
        return $rsp;
    }

    public function getChilds($parentId){
        $return = array();

        $result = parent::get(array(
            'parent_id'=>$parentId
        ));
        foreach($result['data'] as $r){
            array_push($return,$r['id']);
            //find other childs
            array_merge($return,$this->getChilds($r['id']));
        }
        //return elements
        return $return;
    }
}