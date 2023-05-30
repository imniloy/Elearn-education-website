const jsonServer = require("json-server"); // importing json-server library
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = 9000; // you can use any port number here; i chose to use 9000

server.db = router.db;
server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(port);
