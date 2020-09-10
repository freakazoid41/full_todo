<?php

namespace SUMO\Api\Responders;

use SUMO\Api\Api;

class Info extends Api {
	public function __construct() {
	}

	public function version() {
		$this->response(array(
			'version' => '0.0-prealpha'
		));
	}
}