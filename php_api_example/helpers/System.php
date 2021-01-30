<?php

namespace app\helpers;


class System {

    static function getToken()
    {
        $token = 'pickle_key'.str_replace('.','',microtime(true));
        return array(
            'token'=>base64_encode($token),
            'end' => date("Y-m-d H:i:s", strtotime("+30 minutes"))
        );
    }

    static function checkToken($obj)
    {

        if(isset($obj['X-TOKEN'])){
            //load user token model
            require_once "models/Sys_utokens.php";
            $utokens = new \app\models\Sys_utokens();
            //get token info    
            $token = $utokens->get(array(
                'user_token' => $obj['X-TOKEN'],
                'user_sign'=>$obj['User-Agent']
            ));

            if($token['success']){
                //check time is valid
                if(strtotime("now") < strtotime(explode('+',$token['data'][0]['end_at'])[0])){
                    return array('success'=>true);
                }else{
                    //give more time if you want or just reject
                    //hour diff
                    $diff =  abs(strtotime("now") - strtotime(explode('+',$token['data'][0]['end_at'])[0]))/(60*60);
                    if($diff<1){
                        //give another 30 minute
                        $utokens->update(array(
                            'id' => $token['data'][0]['id'],
                            'end_at' =>date("Y-m-d H:i:s", strtotime("+30 minutes"))
                        ));
                        return array('success'=>true);
                    }else{
                        //clear keys
                        $CI->sys_utokens->_delete($token['data'][0]['id']);
                        return array('success'=>false,'msg' => 'old key ..');
                    }
                }
            }else{
                return array('success'=>false,'msg'=>'Invalid Key..');
            }
        }else{
            return array('success'=>false,'msg'=>'Key Not Exist !!!');
        }
    }   
}