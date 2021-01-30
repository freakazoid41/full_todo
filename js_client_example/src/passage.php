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

      $this->api_url = 'http://api.transport.picklecan.loc';

      //set session informations to params if logged in
      if(isset($_SESSION['sinfo'])){
        //$this->uid = $_SESSION['sinfo']['user_id'];
        $this->token = $_SESSION['sinfo']['token'];
      }
    }

    /**
     * this method will send and receive data between api and client
     */
    public function call($url)
    {
        $method = $_SERVER['REQUEST_METHOD'];

        $curl = curl_init();
        switch ($method){
            case 'POST':
              curl_setopt($curl, CURLOPT_POST, 1);
              if (!empty($_POST))
                  curl_setopt($curl, CURLOPT_POSTFIELDS, $_POST);
              break;
            case 'DELETE':
            case 'PATCH':
              $data = array();
              mb_parse_str(file_get_contents("php://input"),$data);

              curl_setopt($curl, CURLOPT_CUSTOMREQUEST,$method);
              if (!empty($data))
                  curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));			 					
              break;
            default:
              break;
        }
        // OPTIONS:
        curl_setopt($curl, CURLOPT_URL, $this->api_url.$url);
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

        if($url == '/admin_login') $_SESSION['sinfo']['token'] = json_decode($result,true)['data']['token'];

        print_r($result);
        die;
    }


    function logout(){
      session_destroy();
      header('Location: /');
    }

  }   

(new Passage())->call($_GET['url']);