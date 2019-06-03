var mergecoin = require('./lib');    

var client = new mergecoin.Client({
  host: 'localhost',
  port: '51473',
  user: 'rpcuser',
  pass: 'rpcpassword'
});

client.getBalance('*', 6, function(err, balance) {
  if (err) return console.log(err);
  console.log('Balance:', balance);
});

client.cmd('getbalance', '*', 6, function(err, balance){
  if (err) return console.log(err);
  console.log('Balance:', balance);
});  

console.log('Master node info:');

client.listMasternodes(function(err, nodes){
  if (err) return console.log(err);
  console.log(nodes);
});


client.getMasternodeCount(function(err, count){
  if (err) return console.log(err);
  console.log(count);
});

