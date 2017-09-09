var chaincoin = require('./lib');
var settings = require('./settings')

var client = new chaincoin.Client({
  host: settings.host,
  port: settings.port,
  user: settings.user,
  pass: settings.pass
});

client.masternodelist(function(err, list){
  if (err) return console.log(err);
  console.log('Masternodes List:', list);
});
