const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/rpc') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      const { method, params } = JSON.parse(data);
      if (method === 'add') {
        const [a, b] = params;
        const result = a + b;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ result }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not found' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});