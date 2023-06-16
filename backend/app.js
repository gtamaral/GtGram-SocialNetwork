require("dotenv").config()

const express = require("express");     //framework p criar o serv
const path = require("path");           //usado para manipular caminhos de diretorio
const cors = require("cors");           //middleware p habilitar o cors origin reosouce sharing(linha16)

const port = process.env.PORT;

const app = express();

//config JSON and form data response
app.use(express.json())
app.use(express.urlencoded({extended: false}));

// solve CORS = executa req pelo mesmo dominio => permite que o servidor responda a solicitações feitas a partir do domínio
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//db connection
require("./config/db.js");


//routes
const router = require("./routes/Router.js");
app.use(router);


app.listen(port, () => {
    console.log(`app rodando na porta ${port}`) 
});

