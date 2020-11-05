const { logBlockIn, logBlockOut } = require("../bootstrap/logger");

function generateScript() {
  logBlockIn('generateScript');

  $out = fopen(output, 'w');
  fwrite($out, "-- file: {input}\n\n");

  foreach ($cursors as $object => $defs) {
    foreach ($defs as $name => $select) {
      fwrite($out, sprintf("-- object: %s\n", $object));
      fwrite($out, sprintf("-- cursor: %s\n", $name));
      fwrite($out, sprintf("%s\n\n", $select));
    }
  }

  fclose($out);

  logBlockOut('generateScript');
}
