//CONST
import express from "express";
import bodyParser from "body-parser";
import { showMessages, messages, submitMessage } from "./database.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
let newUser = "";
let newMessage = "";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

//SERVER

app.get("/", (req, res) => {
  res.contentType(".html");
  res.status(200).sendFile("index.html");
});

app.get("/getmessages", (req, res) => {
  showMessages()
    .then(() => {
      res.json(messages);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Erro ao buscar mensagens do banco de dados" });
    });
});

app.post("/submit", (req, res) => {
  newUser = req.body.user;
  newMessage = req.body.message;
  submitMessage(newMessage, newUser);
  res.redirect("/");
});

app.listen(8080, (req, res) => console.log("rodando na porta 8080."));

export { newUser, newMessage };
