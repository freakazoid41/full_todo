<?php
//this file is main parent for model files
namespace app\controllers;
require_once "autoloader.php";

class System{
    protected function __contruct(){

    }


    public function handleRequest($parts,$request){
        //1.part is model name
        //get model
        require_once "models/".ucfirst($parts[1]).".php";
        //create new instence
        $model = 'app\\models\\'.ucfirst($parts[1]);
        $model = new $model();
        
        //2.part is id for get,patch or delete transactions
        switch($request){
            case "GET":
                //get request for data getting
                return $model->get(array(
					'id'=>isset($parts[2]) ? $parts[2] : '-1'
				));
            break;
            case "POST":
				//post request for data setting
				return $model->add($_POST);
            break;
			case "PATCH":
				if(isset($parts[2])){
					//patch request for data updating
					$var_array = array();
					mb_parse_str(file_get_contents("php://input"),$var_array);
					$var_array['id'] = $parts[2];
					return $model->update($var_array);
				}
			break;
			case "DELETE":
				if(isset($parts[2])){
					//delete request for data removing
					return $model->delete(array('id'=>$parts[2]));
				}
            break;
        }
        return array('msg' => 'Maybe something is missing ? (you did not send "id" idiot..)');
    }

    public function login($data,$headers){
		

        //get models
        require_once "models/Sys_users.php";
		require_once "models/Sys_utokens.php";

		$users = new \app\models\Sys_users();
		$utokens = new \app\models\Sys_utokens();

		//get user
		$rsp = $users->get($data);
		//if user exist
		if(!empty($rsp['data'])){
			//get token and person info
			$token = \app\helpers\System::getToken();
			$label = $headers['User-Agent'];
			//clean all old dated tokens
			$utokens->delete(array(
				'user_id'=>$rsp['data'][0]['id'],
				'user_sign'=>$label
			));

			//add new token to database
			$utokens->add(array(
				'user_sign'=>$label,
				'user_id'=>$rsp['data'][0]['id'],
				'user_token' => $token['token'],
				'end_at'=>$token['end']
			));

			//send new created token to client
			return array(
				'rsp'=>true,
				'msg' => 'Logged in !!',
				'data' => array(
					'user_id' =>$rsp['data'][0]['id'],
					//'person_id'=>$person['data'][0]['id'],
					'type'=>$rsp['data'][0]['utype'],
					'token' => $token['token'],
					//'person' => $person['data'][0]->name,
				)
			);
		}else{
			return array('rsp'=>false,'msg'=>'Bilgiler Yanlış !!');
		}
    }

    /*
    //take data
		$data = $this->input->post();
		//load user model
		$this->load->model('sys_users');
		$this->load->model('sys_utokens');
		$rsp = $this->sys_users->_get(null,array(
			'username'=>$data['username'],
			'password'=>$data['password']
		));
		if($rsp['rsp']===true){
			//get token and person info
			$token = _get_token();
			$label = $this->input->request_headers()['User-Agent'];
			//clean all old dated tokens
			$this->sys_utokens->_delete(array(
				'user_id'=>$rsp['data'][0]->id,
				'user_sign'=>$label
			));
			//add new token to database
			$this->sys_utokens->_add(array(
				'user_sign'=>$label,
				'user_id'=>$rsp['data'][0]->id,
				'user_token' => $token['token'],
				'end_at'=>$token['end']
			));

			$this->load->model('per_con_modules');
			$mlist = array();
			$modules = $this->per_con_modules->_get(null,array(
				'person_id'=>$rsp['data'][0]->person_id,
			));
			//set modules by their ids
			foreach($modules['data'] as $m){
				$mlist[$m->module_id] = $m;
			}
			
			//set person info
			$this->load->model('persons');
			$person = $this->persons->_get(null,array(
				'id'=>$rsp['data'][0]->person_id,
			));



			
			//send new created token to client
			$rsp = array(
				'rsp'=>true,
				'msg' => 'Logged in !!',
				'data' => array(
					'id' =>$rsp['data'][0]->id,
					'person_id'=>$person['data'][0]->id,
					'type'=>$rsp['data'][0]->utype,
					'token' => $token['token'],
					'person' => $person['data'][0]->name,
					'modules' =>$mlist
				)
			);
		}else{
			$rsp = array('rsp'=>false,'msg'=>'Bilgiler Yanlış !!');
		}
        return $this->output
		->set_content_type('application/json')
		->set_status_header(200)
		->set_output(json_encode($rsp));
    */
}