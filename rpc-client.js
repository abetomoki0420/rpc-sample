const http = require('http');

function rpcCall(method, params) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ method, params });
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/rpc',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    const req = http.request(options, res => {
      let responseData = '';
      res.on('data', chunk => {
        responseData += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(responseData);
        if (response.result) {
          resolve(response.result);
        } else {
          reject(response.error);
        }
      });
    });
    req.on('error', error => {
      reject(error);
    });
    req.write(data);
    req.end();
  });
}

async function main() {
  try {
    const result = await rpcCall('add', [1, 2]);
    console.log(result); // 3
  } catch (error) {
    console.error(error);
  }
}

main();