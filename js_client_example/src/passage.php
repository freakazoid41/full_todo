<?php
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
  session_start();

  class Passage {
    //temp token for test
    private $token = '-';
    private $pid = 0;
    private $api_url; 
    //private $cdn_url = 'http://cache.cilogluarge.com/fresolver.php';

    private $permissions = array(
      //'sys_users',
      //'sys_demands',
    );

    function __construct()
    {

      //$this->api_url = $_SERVER['HTTP_HOST'] === 'lb.cilogluarge.com' ? 'http://sapi.cilogluarge.com/': 'http://sapi.picklecan.loc/';
      $this->api_url = 'http://rapi.picklecan.loc/';

      //set session informations to params if logged in
      if(isset($_SESSION['sinfo'])){
        $this->uid = $_SESSION['sinfo']['user_id'];
        $this->token = $_SESSION['sinfo']['token'];
      }
    }

    /**
     * this method will send and receive data between api and client
     */
    public function call($data,$method,$url)
    {
        if(isset($data['filters'])) $data['filters'] = json_encode($data['filters']);
        if(isset($data['sorters'])) $data['sorters'] = json_encode($data['sorters']);
        $url =$this->api_url.$url;
        $curl = curl_init();
        switch ($method){
            case 'POST':
                curl_setopt($curl, CURLOPT_POST, 1);
                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case 'DELETE':
            case 'PATCH':
                curl_setopt($curl, CURLOPT_CUSTOMREQUEST,$method);
                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));			 					
                break;
            default:
                if ($data)
                    $url = sprintf("%s?%s", $url, http_build_query($data));
        }
        // OPTIONS:
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(
            'X-TOKEN:'.$this->token,
            'Person-Id:'.$this->pid,
            'User-Agent:'.$_SERVER['HTTP_USER_AGENT'],
            'IP:'.$_SERVER['REMOTE_ADDR'],
        ));
        curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        // EXECUTE:
        $result = curl_exec($curl);
        if(!$result){die("Connection Failure");}
        curl_close($curl);
        return $result;
    }


    function login($data){
      //$data = array_merge($_GET,$_POST);
      $response = $this->call(
        array('username'=>$data['username'],'password'=>$data['password']),
        'POST',
        'admin_login'
      );
      $data = json_decode($response,true);
      if($data['rsp']){
        //set session info
        $_SESSION['sinfo'] = $data['data'];
      }
      return $response;
    }

    /**
     * this method will send event info to api
     */
    public function event($data){
      $response = array();
      //check model permission
      //if(in_array($data['model'],$this->permissions)){
          $data['data'] = json_decode($data['data'],true);
          //$data['data']['person_id'] = $this->pid;
          unset($data['data']['event']);
          //file transactions
          /* if (isset($_FILES['file']['name']) && !empty($_FILES['file']['name'])) {
            $fresponse = $this->saveFile($_FILES,$data);
            if(boolval($fresponse['rsp']) != true){
              return json_encode(array('rsp'=>false,'msg'=>'CDN Not Saved File !!','cdn_rsp'=>$fresponse));
            }else{
              $data['data']['l_file'] = $fresponse['file'];
            }
          }*/
          switch($data['event']){
            case 'add':
              $response = $this->call($data['data'],'POST','request/'.$data['model']);
            break;
            case 'update':
              $response = $this->call($data['data'],'PATCH','request/'.$data['model'].'/'.$data['data']['id']);
            break;
            case 'delete':
              $response = $this->call($data['data'],'DELETE','request/'.$data['model'].'/'.$data['data']['id']);
            break;
          }
      
      //}
      return $response;
    }

    /**
     * this function vill save file to cdn
     */
    function saveFile($file,$data){
      /*$allowed = array('gif', 'png', 'jpg', 'jpeg','pdf');
      if (in_array(pathinfo($file['file']['name'], PATHINFO_EXTENSION), $allowed)) {
          $filename = $data['model'].'tempfile.'.pathinfo($file['file']['name'], PATHINFO_EXTENSION);
          //first save for temperory
          move_uploaded_file($file['file']['tmp_name'], './files/'.$filename);

          if (function_exists('curl_file_create')) { // php 5.5+
              $cFile = curl_file_create(realpath(getcwd().'/files/'.$filename));
          } else { // 
              $cFile = '@' . realpath(realpath(getcwd().'/files/'.$filename));
          }
          $post = array('model' => $data['model'],'key'=>$this->fileKey($data),'file_contents'=> $cFile);
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL,$this->cdn_url.'?job=_accept&dir='.$data['model']);
          curl_setopt($ch, CURLOPT_POST,1);
          curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
          curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, false);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          $result = curl_exec($ch);
          curl_close ($ch);
          return json_decode($result,true);
      }else{
          return array('rsp'=>false);
      }*/

    }

    function fileKey($data){
      $key = '';
      switch($data['model']){
          case 'sys_feedback':
              $key = $data['data']['category_id'].'_'.$data['data']['person_id'].'_'.time();
          break;
      }
      return $key;
    }


    /**
     * this method will get all data informations and some client transactions (like check session)
     */
    public function data($data){
      $response = array();
      switch($_GET['event']){
        case 'get':
          //choose type
          $url = 'request/'.$data['model'];
          if(isset($_GET['id'])) $url.='/'.$_GET['id'];
          $response = $this->call(null,'GET',$url);
        break;
        /*case 'query':
          //choose type
          $data = $this->input->post();
          $url = 'query/'.$data['model'];
          $response = $this->request->call(json_decode($data['data'],true),'POST',$url);
        break;
        case 'report':
          //choose type
          $data = $this->input->post();
          $url = 'report/'.$data['model'].'/'.$data['sub'];
          $response = $this->request->call(json_decode($data['data'],true),'POST',$url);
        break;*/
        case 'checkSession':
          $response['rsp'] = isset($_SESSION['sinfo']);
          if($response['rsp'])$response['data'] = $_SESSION['sinfo'];
          $response = json_encode($response);
        break;
        /*case '_getList':
          //choose type
          //set person id
          $filter = array(
            'field'=>'person_id',
            'type'=>'=',
            'value'=>$this->pid
          );
          if(isset($data['filters'])){
            $data['filters'] = json_decode($data['filters']);
            array_push($data['filters'],$filter);
          }else{
            $data['filters'] = array($filter);
          }
          $data['person_id'] = $this->pid;
          $response = $this->call($data,'POST','table/'.$data['model']);
        break;*/
      }
  
      return $response;
    }
  }

  if (isset($_GET['job'])) {
    header('Content-Type: application/json');
    echo (new Passage())->{$_GET['job']}($_POST, $_FILES);
  }