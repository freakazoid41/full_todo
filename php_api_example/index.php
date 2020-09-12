<?php 


namespace app;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//include routing from library
require_once "libraries/routing.php";
use app\library\routing\Routing as routing; 

//initialize app
$app = new routing();

$app->route('/', function () {
    return "Hello World";
});


$app->route('/request/*', function ($parts,$request) {
    print_r($request);
    //we are in request route
    //this route is for only system requests
    //1.part is model name
    //2.part is id for get,patch or delete transactions
    switch($request){
        case "GET":
            //get request for data getting
        break;
        case "POST":
            //post request for data setting
        break;
        case "PATCH":
            //patch request for data updating
        break;
        case "DELETE":
            //delete request for data removing
        break;
    }




    print_r($parts);
    return "Bura Modül";
});


$app->route('/about', function () {
    return "Hello form the about route";
});

$app->route('/err404', function () {
    header("HTTP/1.0 404 Not Found");
    return "Not Available";
});

$action = $_SERVER['REQUEST_URI'];
$app->dispatch($action);
