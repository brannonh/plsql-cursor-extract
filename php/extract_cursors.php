<?php

$log;
$file;
$line;
$num = 0;
$nested = 0;
$stack = array();
$parameters = array();
$locals = array();
$variables = array();
$cursors = array();
$trace = true;
$dump = true;

transpile('script.sql', 'cursors.log', 'cursors.sql');

function transpile($input, $logs, $output) {
  global $log, $file, $dump;

  $log = fopen($logs, 'w');
  $file = file($input);

  log_trace('transpile()');

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

function seek($expected) {
  log_trace('seek($expected)');
  nest();

  log_var('$expected', $expected);

  $token = peek_token();
  while (!in_array($token, $expected) && $token !== false) {
    next_token();
    $token = peek_token();
  }

  nest(true);
  return $token;
}

function next_token($expected = '') {
  log_trace('next_token($expected)');
  nest();
  $token = get_token(false, $expected);
  nest(true);
  return $token;
}

function peek_token() {
  log_trace('peek_token()');
  nest();
  $token = get_token(true);
  nest(true);
  return $token;
}

function get_token($peek = false, $expected = '') {
  global $line;

  log_trace('get_token($peek, $expected)');
  nest();

  log_var('$peek', $peek);
  log_var('$expected', $expected);

  $pos = $length = 0;
  $captured = false;
  $number = false;
  $token = $next = '';

  if (!empty($line)) {
    $length = strlen($line);
  }

  while (!$captured) {
    if (empty($line)) {
      $length = get_line();
      $pos = 0;
    }

    if ($length == -1) {
      // End of input.
      if ($peek) {
        nest(true);
        return false;
      } else {
        log_error('Unexpected end of input.');
      }
    } else if ($pos >= $length) {
      // End of line. Force a new line.
      $line = false;
    } else {
      $next = $line[$pos++];

      if (empty($token) && stripos("0123456789'", $next) !== false) {
        // Token is a literal. Just get the whole thing.
        $token .= $next;
        if ($next == "'") {
          while ($line[$pos] != "'") {
            $token .= $line[$pos++];
          }
          $token .= $line[$pos++];
        } else {
          while (stripos('0123456789', $line[$pos]) !== false) {
            $token .= $line[$pos++];
          }
        }

        $captured = true;
      } else if (empty($token) && stripos('0123456789', $next) !== false) {
        // First character is a number. Not allowed.
        log_error('Token cannot begin with a number.');
      } else if (stripos('abcdefghijklmnopqrstuvwxyz0123456789._', $next) !== false) {
        // Character is part of a word.
        $token .= $next;
      } else if (empty(trim($next))) {
        // Character is space.
        if (!empty($token)) {
          $captured = true;
        }
      } else {
        // Character is symbol.
        if (empty($token)) {
          $token .= $next;
        } else {
          $pos--;
        }

        $captured = true;
      }
    }
  }

  $token = strtolower($token);
  if (!empty($expected) && strcmp($token, $expected)) {
    log_error("Found {$token}. Expected {$expected}.");
  }

  if (!$peek) {
    $line = substr($line, $pos);
  }

  log_var('$token', $token);
  log_var('$line', $line);

  nest(true);

  return $token;
}

function get_line() {
  global $file, $line, $num;

  log_trace('get_line()');
  nest();

  $line = array_shift($file);
  $num++;
  log_msg($line);

  nest(true);
  if ($line === null) {
    return -1;
  } else {
    return strlen($line);
  }
}

function package_body() {
  global $stack;

  log_trace('package_body()');
  nest();

  next_token('create');
  next_token('or');
  next_token('replace');
  next_token('package');
  next_token('body');
  $package = next_token();
  next_token('as');

  $stack[] = array('type' => 'package', 'name' => $package);

  nest(true);
}

function funktion() {
  log_trace('funktion()');
  nest();

  next_token('function');

  nest(true);
}

function procedure() {
  global $stack, $variables;

  log_trace('procedure()');
  nest();

  next_token('procedure');
  $proc = next_token();

  $stack[] = array('type' => 'procedure', 'name' => $proc);

  if (peek_token() == '(') {
    parameters($proc);
  }

  next_token('is');

  if (peek_token() != 'begin') {
    locals($proc);
  }

  next_token('begin');
  procedure_body();
  next_token('end');

  if (peek_token() != ';')
    next_token($proc);
  next_token(';');

  array_pop($stack);

  nest(true);
}

function parameters($object, $in = true, $out = true) {
  global $parameters, $variables;

  log_trace('parameters($object, $in, $out)');
  log_var('$object', $object);
  log_var('$in', $in);
  log_var('$out', $out);
  nest();

  $parameters[$object] = array();
  $i = max(0, count($variables) - 1);

  next_token('(');
  if(peek_token() != ')') {
    $parameters[$object][] = $variables[$i][] = parameter($in, $out);
    while (peek_token() == ',') {
      next_token(',');
      $parameters[$object][] = $variables[$i][] = parameter($in, $out);
    }
  }
  next_token(')');

  nest(true);
}

function parameter($in = true, $out = true) {
  log_trace('parameter($in, $out)');
  log_var('$in', $in);
  log_var('$out', $out);
  nest();

  $token = next_token();

  if ($in && peek_token() == 'in') {
    next_token('in');
  }

  if ($out && peek_token() == 'out') {
    next_token('out');
  }

  next_token();

  nest(true);

  return $token;
}

function locals($object) {
  global $locals, $cursors;

  log_trace('locals($object)');
  log_var('$object', $object);
  nest();

  $locals[$object] = array();
  $cursors[$object] = array();

  while (($token = peek_token()) != 'begin') {
    if ($token == 'cursor') {
      list($name, $select) = cursor($object);
      $cursors[$object][$name] = $select;
    } else {
      $locals[$object][] = local();
    }
  }

  nest(true);
}

function cursor($object) {
  global $parameters, $locals, $variables;

  log_trace('cursor($object)');
  log_var('$object', $object);

  next_token('cursor');
  $cursor = next_token();

  $has_params = false;
  if (peek_token() == '(') {
    parameters("{$object}:{$cursor}", false, false);
    $has_params = true;
  }

  next_token('is');

  $string = $last = '';
  while (($next = peek_token()) != ';') {
    $string .= (stripos(',()', $next) !== false || stripos('(', $last) !== false) ? "{$next}" : " {$next}";
    $last = $next;
    next_token();
  }

  next_token(';');

  if ($has_params) {
    array_pop($variables);
  }

  return array($cursor, "{$string};");
}

function local() {
  log_trace('local()');
  nest();

  $var = next_token();
  while (peek_token() != ';') {
    next_token();
  }
  next_token(';');

  nest(true);

  return $var;
}

function procedure_body() {

}

function finalize($input, $output) {
  global $file, $parameters, $locals, $cursors;

  log_trace('finalize($output)');

  nest(); // This needs to be before the log_var for proper nesting.

  log_var('$output', $output);

  $out = fopen($output, 'w');
  fwrite($out, "-- file: {$input}\n\n");

  foreach ($cursors as $object => $defs) {
    foreach ($defs as $name => $select) {
      fwrite($out, sprintf("-- object: %s\n", $object));
      fwrite($out, sprintf("-- cursor: %s\n", $name));
      fwrite($out, sprintf("%s\n\n", $select));
    }
  }

  fclose($out);

  nest(true);
}

function nest($undo = false) {
  global $nested, $trace;

  if ($trace) {
    if ($undo) {
      $nested--;
    } else {
      $nested++;
    }
  }
}

function log_msg($msg, $lno = true) {
  global $log, $num, $nested;

  $prefix = sprintf('[%6u]:', $num);
  if ($lno === false) {
    $prefix = '         ';
  } else if ($lno !== true) {
    $prefix = sprintf('[%-6s]:', strtoupper(substr($lno, 0, 6)));
  }

  fwrite($log, sprintf("{$prefix}   %s%s\n", str_repeat('  ', $nested), rtrim($msg)));
}

function log_error($msg, $die = true) {
  log_msg(($die ? "Fatal " : '') . "Error: {$msg}");
  log_stack();
  log_tables();
  if ($die) {
    exit(1);
  }
}

function log_trace($msg) {
  global $trace;

  if ($trace) {
    log_msg($msg, false);
  }
}

function log_var($name, $var, $inline = true, $force = false) {
  global $trace;

  if ($trace || $force) {
    $string = print_r($var, true);
    if ($inline) {
      $string = str_ireplace("\n", ' ', $string);
    }

    log_msg("{$name} = " . $string, 'VARVAL');
  }
}

function log_stack() {
  global $stack, $trace;

  if ($trace) {
    if (!empty($stack)) {
      log_msg('Stack Trace');
    }

    while(!empty($stack)) {
      $level = array_pop($stack);
      log_msg(str_repeat(' ', count($stack) * 2) . "{$level['type']} {$level['name']}");
    }
  }
}

function log_tables() {
  global $parameters, $locals, $cursors, $variables;

  if (!empty($parameters) || !empty($locals) || !empty($cursors || !empty($variables))) {
    log_msg('Variable Tables', 'DMPBGN');

    log_var('$parameters', $parameters, false, true);
    log_var('$locals', $locals, false, true);
    log_var('$cursors', $cursors, false, true);
    log_var('$variables', $variables, false, true);

    log_msg('Variable Tables', 'DMPEND');
  }
}
