// Note: 
//  - VGS Forward Proxy (outbound)
//  - need to put vgs cert in same folder
const fs = require('fs');
const url = require('url');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

// need this otherwise will receive self cert errror for vgs sanbox cert
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const reverse_proxy = "http://<user>:<pswd>@sandbox.verygoodproxy.com:8080";

const urlParams = url.parse(reverse_proxy);

const agent = new HttpsProxyAgent({
  ...urlParams,
  ca: [fs.readFileSync('./vgs-cert.pem')],
});
async function getData() {
  let result;
  try {
    result = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: 'tok_sandbox_25nA6SHN4FtUszR3fEUxbE',
      }),
      agent,
    });
  } catch (e) {
    console.error(e);
  }
  return await result.text();
}

getData().then(response => console.log(response));
