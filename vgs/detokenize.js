process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const fs = require('fs');
const url = require('url');
const fetch = require('node-fetch');
const HttpsProxyAgent = require('https-proxy-agent');

const reverse_proxy = "http://<vgs-user>:<vgs-pswd>@tntqolsgkl9.sandbox.verygoodproxy.com:8080";
const urlParams = url.parse(reverse_proxy);

const agent = new HttpsProxyAgent({
  ...urlParams,
  ca: [fs.readFileSync('./sandbox-cert.pem')],
});

async function detokenize(tokenized_password) {
  let result;
  try {
    result = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: tokenized_password,
      }),
      agent,
    });
  } catch (e) {
    console.error(e);
  }
  return await result.json();
}

async function call() {
  const result = await detokenize("tok_sandbox_25nA6SHN4FtUszR3fEUxbE"); 
  console.log(result.json.password);
}

call();
