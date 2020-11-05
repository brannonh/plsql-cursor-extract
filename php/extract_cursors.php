<?php

$log;
$file;
$line;
$num = 0;
$stack = array();
$parameters = array();
$locals = array();
$variables = array();
$cursors = array();

transpile('script.sql', 'cursors.log', 'cursors.sql');

function transpile($input, $logs, $output) {
  global $log, $file, $dump;

  $log = fopen($logs, 'w');
  $file = file($input);


  if (peek_token() == 'create') {
    package_body();
  }

  while (($token = seek(array('function', 'procedure'))) !== false) {
    if ($token == 'function') {
      log_var('$token', $token);
      //funktion();
      exit('funktion');
    } else if ($token == 'procedure') {
      procedure();
    }
  }

  finalize($input, $output);

  if ($dump) {
    log_stack();
    log_tables();
  }

  fclose($log);
}

function funktion() {
  log_trace('funktion()');
  nest();

  next_token('function');

  nest(true);
}

function procedure_body() {

}

