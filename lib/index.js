var commands = require('./commands'),
    commandsDeprecated = require('./commands_deprecated'),
    deprecate = require('deprecate'),
    rpc = require('./jsonrpc');

function Client(opts) {
  this.rpc = new rpc.Client(opts);
}

Client.prototype.cmd = function() {
  var args = [].slice.call(arguments);
  var cmd = args.shift();

  callRpc(cmd, args, this.rpc);
}

function callRpc(cmd, args, rpc) {
  var fn = args[args.length-1];

  // If the last function is a callback, pop it from the args list
  if(typeof fn === 'function') {
    args.pop();
  } else {
    fn = function() {};
  }

  rpc.call(cmd, args, function(){
    var args = [].slice.call(arguments);
    args.unshift(null);
    fn.apply(this, args);
  }, function(err){
    fn(err);
  });
}

(function() {

  var getWrapper = function(protoFn, deprecated) {
    var command = deprecated ? commandsDeprecated[protoFn] : commands[protoFn];
    return function() {
      if (deprecated) {
        deprecate(`${protoFn} is deprecated`);
      }
      var args = [].slice.call(arguments);
      callRpc(command, args, this.rpc);
    };
  };

  for (var protoFn in commands) {
    Client.prototype[protoFn] = getWrapper(protoFn, false);
  }
  
  for (var protoFn in commandsDeprecated) {
    Client.prototype[protoFn] = getWrapper(protoFn, true);
  }

})();

module.exports.Client = Client;
