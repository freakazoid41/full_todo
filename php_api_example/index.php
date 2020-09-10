<?php

namespace SUMO;
include 'autoloader.php';

$rurl = $_GET['requesturl'];
if(!preg_match('/^[a-z]+\/[a-z]+[\/a-z0-9]*$/', $rurl, $matches)) {
	die('bad request (invalid characters)');
}
$path = explode('/', $rurl, 3);
if(count($path) < 2 || empty($path[0]) || empty($path[1])) {
	die('bad request (no endpoints defined');
}
else {
	$oricls = $path[0];
	$cls = ucfirst($path[0]);
	$fullcls = "SUMO\\Api\\Responders\\$cls";
	$mth = $path[1];

	if(!file_exists('Responders/'.$cls.'.php')) {
		die('bad endpoint (invalid class)');
	}

	$$oricls = new $fullcls;

	if(!method_exists($$oricls, $mth)) {
		die('bad endpoint (invalid method)');
	}

	if(count($path) == 2) {
		$$oricls->$mth();
	}
	else {
		$$oricls->$mth($path[2]);
	}
}
