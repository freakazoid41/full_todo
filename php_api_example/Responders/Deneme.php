<?php

namespace SUMO\Api\Responders;

use SUMO\Api\Api;

class Deneme extends Api {
	public function yap() {
		$this->response(array(
			'deneme'    => 'yapildi',
			'api'       => 'yapildi',
			'id'        => 1127,
			'tutar'     => 14124.1241284,
			'kimlervar' => ['ahmet', 'mahmut', 'ünlü']
		));
	}

	public function param($parameter) {
		$params = explode('/', $parameter);
		$this->response(array(
			'response'   => 'oldu galiba',
			'parameters' => $params
		));
	}
}