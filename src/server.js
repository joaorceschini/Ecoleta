const express = require('express');
const server = express();

// configurar a pasta public
server.use(express.static("public"))

// utilizando templete engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da minha aplicação
// pagina inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título" })
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

// ligar o servidor
server.listen(3000)