const http = require('http');

const data = JSON.stringify({ email: 'alice.admin@example.com', password: 'pass123' });

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/admin/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    try {
      console.log('BODY:', JSON.parse(body));
    } catch (e) {
      console.log('BODY:', body);
    }
  });
});

req.on('error', (e) => {
  console.error('ERROR:', e.message);
});

req.write(data);
req.end();
