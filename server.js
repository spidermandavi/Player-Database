const express = require("express");

const app = express();
const cache = new NodeCache({ stdTTL: 300 });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const SPEED_MAP = {
  "0.5+0": "ultraBullet",
  "1+0": "bullet",
  "2+1": "bullet",
  "3+0": "blitz",
  "3+2": "blitz",
  "5+0": "blitz",
  "10+0": "rapid",
  "10+10": "rapid"
};

app.get("/api/player-moves", async (req, res) => {
  try {
    const {
      player,
      variant,
      speed,
      play
    } = req.query;

    const cacheKey = JSON.stringify(req.query);

    const cached = cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const lichessUrl = `https://explorer.lichess.ovh/player?player=${player}&variant=${variant}&speeds=${speed}&play=${play}`;

    const response = await axios.get(lichessUrl);

    cache.set(cacheKey, response.data);

    res.json(response.data);
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      error: "Failed to fetch player data"
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
