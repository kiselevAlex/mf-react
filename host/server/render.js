import React from "react";
import ReactDOMServer from "react-dom/server";
import { Helmet } from "react-helmet";

import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";

const ABORT_DELAY = 10000;

export const render = (ctx) => {
  const { req, res } = ctx;
  const helmet = Helmet.renderStatic();

  let isError = false;

  const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
    {
      bootstrapScripts: ["/client.bundle.js"],
      onAllReady() {
        res.statusCode = isError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        res.write(`<!DOCTYPE html>`);
        res.write(`<html ${helmet.htmlAttributes.toString()}>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
        </head>
        <body>`);
        res.write(`<div id="root">`);
        pipe(res);
        res.write(`</div>`);
        res.write(`</body></html>`);
      },
      onError(error) {
        isError = true;
        console.error(error);
      },
    }
  );

  setTimeout(abort, ABORT_DELAY);
};
