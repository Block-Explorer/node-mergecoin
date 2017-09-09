# node-chaincoin

node-chaincoin is a simple wrapper for the chaincoin client's JSON-RPC API.
## Install

`npm install node-chaincoin`

## Start
1. Rename the settings-example.json to settings.json
2. Update the settings.json (renamed in the previous step) with the ip, port, user e pass
3. Run the command `node test.js` (this script will show the number of actives masternodes)
4. Run the command `nodes test2.js` (this script will list all the masternodes actives)

## Examples

### Get the Masternode List

```js
client.masternodelist(function(err, list) {
  if (err) return console.log(err);
  console.log('Masternodes List:', list);
});
```

### Get the number of actives masternodes
```js
client.masternode('count', function(err, list) {
  if (err) return console.log(err);
  console.log('Masternodes List:', list);
});
```

### Batch multiple RPC calls into single HTTP request

```js
var batch = [];
for (var i = 0; i < 10; ++i) {
  batch.push({
    method: 'getnewaddress',
    params: ['myaccount']
  });
}
client.cmd(batch, function(err, address) {
  if (err) return console.log(err);
  console.log('Address:', address);
});
```

## SSL
See [Enabling SSL on original client](https://en.bitcoin.it/wiki/Enabling_SSL_on_original_client_daemon).

If you're using this to connect to chaincoin across a network it is highly
recommended to enable `ssl`, otherwise an attacker may intercept your RPC credentials
resulting in theft of your chaincoin.

When enabling `ssl` by setting the configuration option to `true`, the `sslStrict`
option (verifies the server certificate) will also be enabled by default. It is
highly recommended to specify the `sslCa` as well, even if your chaincoind has
a certificate signed by an actual CA, to ensure you are connecting
to your own chaincoind.

```js
var client = new chaincoin.Client({
  host: 'localhost',
  port: 15715,
  user: 'username',
  pass: 'password',
  ssl: true,
  sslStrict: true,
  sslCa: fs.readFileSync(__dirname + '/server.cert')
});
```

If your using a self signed certificate generated with something like

`openssl x509 -req -days 365 -in server.cert -signkey server.key -out server.cert`

then `sslStrict` should be set to `false` because by defult node wont work with
untrusted certificates.
