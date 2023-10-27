import path from "path";

import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { render } from "./render";

const PORT = process.env.PORT || 3006;

const app = express();
const weatherProxy = createProxyMiddleware("/mf-weather", {
  target: "http://localhost:4006",
  changeOrigin: true,
  autoRewrite: true,
  pathRewrite: {
    "^/mf-weather": "/weather",
  },
});
app.use(weatherProxy);
app.use(express.static(path.resolve(__dirname, "../build")));

app.get("*", async (req, res) => {
  render({ req, res });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
