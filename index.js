import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public/"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/tech.html")
})
app.get("/main", (req, res) => {
    res.sendFile(__dirname + "/views/main.html")
})
app.get("/test", (req, res) => {
    res.sendFile(__dirname + "/views/test.html")
})
app.listen(port, () => console.log("http://localhost:" + port))