const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/add?')) {
    const query = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const a = parseInt(query.get('a'));
    const b = parseInt(query.get('b'));
    if (!isNaN(a) && !isNaN(b)) {
      const result = a + b;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ result }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid parameters' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});