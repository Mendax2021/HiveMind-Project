import http from "http";
const PORT = 3000;
let server = http
  .createServer(function (request, response) {
    let course = "Web Technologies";
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(`<!DOCTYPE html>
<html><body>
<h1>Hello ${course}</h1>
<p>Current date is ${new Date().toDateString()}</p>
</body></html>`);
    response.end();
  })
  .listen(PORT);
console.log(`Web app listening on port ${PORT}`);
