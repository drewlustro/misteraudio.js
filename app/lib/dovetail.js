var sys = require('sys')
var exec = require('child_process').exec;

var Dovetail = function() {};

Dovetail.prototype.init = function (params) {
    console.log('Dovetail.prototype.init()');
}

Dovetail.prototype.terminalCommand = function (params) {
    params = params || {};
    if (!params.command) throw new Error('no command attribute in parameters.', this);
    var child = exec(params.command, this.terminalCommandCallback);
    return child;
}

Dovetail.prototype.terminalCommandCallback = function (error, stdout, stderr) {
  if (error !== null) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
  }
  sys.puts(stdout);
  return stdout;
}


module.exports = Dovetail;