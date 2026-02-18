import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bodyParser from "body-parser";
import { Telegraf } from "telegraf";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()

function loadEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;
        const eqIndex = line.indexOf("=");
        if (eqIndex === -1) continue;
        const key = line.slice(0, eqIndex).trim();
        let value = line.slice(eqIndex + 1).trim();
        if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        if (key && !process.env[key]) {
            process.env[key] = value;
        }
    }
}

loadEnvFile(join(__dirname, ".env"));

const port = Number(process.env.PORT) || 3000;
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;
const bot = botToken ? new Telegraf(botToken) : null;

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

function isValidContactInput({ name, surname, phone, message }) {
    const phoneRegex = /^\+?[0-9()\-\s]{7,20}$/;
    return Boolean(
        name && name.length >= 2 &&
        surname && surname.length >= 2 &&
        message && message.length >= 10 &&
        phone && phoneRegex.test(phone)
    );
}

function escapeHtml(value = "") {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#039;");
}

app.post("/contact", async (req, res) => {
    try {
        const payload = {
            name: (req.body.name || "").trim(),
            surname: (req.body.surname || "").trim(),
            phone: (req.body.phone || "").trim(),
            email: (req.body.email || "").trim(),
            message: (req.body.message || "").trim()
        };

        if (!isValidContactInput(payload)) {
            return res.redirect("/Contact?status=error&type=validation");
        }

        if (!bot || !telegramChatId) {
            return res.redirect("/Contact?status=error&type=config");
        }

        await bot.telegram.sendMessage(telegramChatId, `
<b>Name:</b> ${escapeHtml(payload.name)}
<b>Surname:</b> ${escapeHtml(payload.surname)}
<b>Phone:</b> ${escapeHtml(payload.phone)}
<b>Email:</b> ${escapeHtml(payload.email || "-")}
<b>Message:</b>
<blockquote>${escapeHtml(payload.message)}</blockquote>
        `, {
            parse_mode: "HTML"
        });
        return res.redirect("/Contact?status=success");
    } catch (error) {
        return res.redirect("/Contact?status=error&type=send");
    }
})

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});
app.listen(port, () => console.log("http://localhost:" + port))
