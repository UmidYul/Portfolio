import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from "body-parser";
import { Telegraf } from "telegraf";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
const port = 3000
const bot = new Telegraf('8487935904:AAFwK3K4NNhuq02pm6zKwSQ9KqvSzulXM9o');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public/"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/main.html")
})
app.get("/Main", (req, res) => {
    res.sendFile(__dirname + "/views/main.html")
})
app.get("/Contact", (req, res) => {
    res.sendFile(__dirname + "/views/contact.html")
})
app.get("/test", (req, res) => {
    res.sendFile(__dirname + "/views/test.html")
})

app.post("/contact", (req, res) => {
    res.redirect("/")
    try {
        const { name, surname, phone, email, message } = req.body
        bot.telegram.sendMessage(8176192068, `
<b>Name:</b> ${name}
<b>Surename:</b> ${surname}
<b>Phone:</b> ${phone}
<b>Email:</b> ${email}
<b>Message:</b>
<blockquote>${message}</blockquote>
        `, {
            parse_mode: "HTML"
        });
    } catch (error) {

    }
})

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});
app.listen(port, () => console.log("http://localhost:" + port))