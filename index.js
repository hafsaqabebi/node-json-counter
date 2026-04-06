const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  let data = JSON.parse(fs.readFileSync("visits.json"));
  data.visits++;

  fs.writeFileSync("visits.json", JSON.stringify(data));

  res.send(`Nombre de visites : ${data.visits}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});