const http = require("http");
const getUsers = require("./modules/users");

const PORT = 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const searchParams = url.searchParams;
  const params = Array.from(searchParams.keys());

  if (params.length === 1 && searchParams.has("hello")) {
    const name = searchParams.get("hello");

    if (name && name.trim()) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end(`Hello, ${name}.`);
    } else {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain");
      response.end("Enter a name");
    }
    return;
  }

  if (params.length === 0 && url.pathname === "/users") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(getUsers());
    return;
  }
  if (params.length === 0 && url.pathname === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello, World!");
    return;
  }
  response.statusCode = 500;
  response.end();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});
