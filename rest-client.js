const http = require('http');

function restCall(path, params) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, 'http://localhost:3000');
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    http.get(url, res => {
      let responseData = '';
      res.on('data', chunk => {
        responseData += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(responseData);
        if (res.statusCode === 200) {
          resolve(response.result);
        } else {
          reject(response.error);
        }
      });
    }).on('error', error => {
      reject(error);
    });
  });
}

async function main() {
  try {
    const result = await restCall('/add', { a: 1, b: 2 });
    console.log(result); // 3
  } catch (error) {
    console.error(error);
  }
}

main();