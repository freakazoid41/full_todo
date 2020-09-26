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
}