import path from "path";

import express from "express";
import { render } from "./render";
import { getWeatherData } from "@mf/api";
import { fetchServerData } from "@mf/api/src/fetchServerData";

const PORT = process.env.PORT || 4006;

const app = express();

app.use(express.static(path.resolve(__dirname, "../build")));

app.get(`/:city`, async (req, res) => {
  const { city } = req.params;

  const serverData = await fetchServerData([[() => getWeatherData(city)]]);

  render({ req, res, serverData });
});

app.get(`*`, async (req, res) => {
  render({ req, res });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
