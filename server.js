const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/valorant", async (req, res) => {
  try {
    const response = await fetch(
      "https://vaccie.pythonanywhere.com/mmr/OrlandoTheFurio/NAP/eu"
    );

    const text = await response.text();

    const match = text.match(/^(.+?),\s*RR:\s*(\d+)/);

    if (!match) {
      return res.send(text);
    }

    const rank = match[1];
    const rr = match[2];

    res.send(`${rank} (${rr} RR)`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Rank non disponibile");
  }
});

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});