<?php

set_include_path(get_include_path() . PATH_SEPARATOR . 'Responders/');
spl_autoload('Api');
foreach (glob('Responders/*.php') as $file) {
	spl_autoload(explode('.', explode('/', $file)[1])[0]);
}
