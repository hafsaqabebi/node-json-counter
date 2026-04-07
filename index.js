const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const FILE = path.join(__dirname, "visits.json");

let lock = false;

// Lire le compteur
function readCounter() {
  try {
    if (!fs.existsSync(FILE)) {
      fs.writeFileSync(FILE, JSON.stringify({ count: 0 }, null, 2));
    }
    const data = fs.readFileSync(FILE, "utf8");
    const json = JSON.parse(data);
    return typeof json.count === "number" ? json.count : 0;
  } catch (err) {
    console.error("Erreur lecture JSON:", err);
    return 0;
  }
}

// Écrire le compteur
function writeCounter(count) {
  try {
    fs.writeFileSync(FILE, JSON.stringify({ count }, null, 2));
  } catch (err) {
    console.error("Erreur écriture JSON:", err);
  }
}

// Route principale
app.get("/", async (req, res) => {
  while (lock) {
    await new Promise(r => setTimeout(r, 10));
  }
  lock = true;

  try {
    let count = readCounter();
    count++;
    writeCounter(count);
    res.send(`<h2>Compteur de visites</h2><p>Nombre de visites : ${count}</p>`);
  } finally {
    lock = false;
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});