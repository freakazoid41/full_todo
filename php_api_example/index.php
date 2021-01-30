<?php 


namespace app;
/*header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");*/

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//include routing from library
require_once "libraries/Routing.php";
use app\library\Routing as routing; 

//initialize app
$app = new routing();

$app->route('/', function () {
    return "Hello World";
});


$app->route('/request/*', function ($parts,$request,$headers) {
    require_once "controllers/System.php";
    $controller = new controllers\System($headers); 
    //we are in request route
    //this route is for only system requests
    //this why we will wait return from system controller
    header('Content-Type: application/json');
    header("HTTP/1.1 200 OK");
    return \json_encode($controller->handleRequest($parts,$request));
});

//client huge data requests
$app->route('/table/*', function ($parts,$request,$headers) {
    require_once "controllers/System.php";
    $controller = new controllers\System($headers); 
    //we are in request route
    //this route is for only system requests
    //this why we will wait return from system controller
    header('Content-Type: application/json');
    header("HTTP/1.1 200 OK");
    return \json_encode($controller->handleTableRequest($parts,$request));
});

//client query data requests
$app->route('/query/*', function ($parts,$request,$headers) {
    require_once "controllers/System.php";
    $controller = new controllers\System($headers); 
    //we are in request route
    //this route is for only system requests
    //this why we will wait return from system controller
    header('Content-Type: application/json');
    header("HTTP/1.1 200 OK");
    return \json_encode($controller->handleQueryRequest($parts,$request));
});


$app->route('/admin_login', function ($parts,$request,$headers) {
    //this rpute is just for admin login
    require_once "controllers/System.php";
    $controller = new controllers\System($headers); 
    //wait return from login 
    //set admin type
    $_POST['utype'] = 1;
    header('Content-Type: application/json');
    return \json_encode($controller->login($_POST,$headers));
});

$app->route('/err404', function () {
    header("HTTP/1.0 404 Not Found");
    return "Not Available";
});

$action = $_SERVER['REQUEST_URI'];
$app->dispatch($action);
