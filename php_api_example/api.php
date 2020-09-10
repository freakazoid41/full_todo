<?php

namespace SUMO\Api;

class Api {
	protected function response($obj) {
		header('Content-type: application/json');
		echo json_encode($obj);
		die();
	}
}