import React from "react";
import ReactDOMServer from "react-dom/server";

import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";
import { ApiProvider } from "@mf/api";

const ABORT_DELAY = 10000;

export const render = (ctx) => {
  const { req, res, serverData } = ctx;
  const { debug } = req.query;
  let isError = false;

  const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={req.url}>
      <ApiProvider fallback={serverData}>
        <App />
      </ApiProvider>
    </StaticRouter>,
    {
      bootstrapScripts: debug
        ? [`${process.env.ASSET_PATH}/client.bundle.js`]
        : [],
      onShellReady() {
        // Set error status code, if an error happened before starting streaming
        res.statusCode = isError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        if (debug) {
          res.write(`<!DOCTYPE html>`);
          res.write(`<html>`);
          res.write(`<div id="root">`);
        }
        pipe(res);

        if (debug) {
          res.write(`</div>`);
        }

        if (serverData) {
          res.write(
            `<script>window.__SERVER_DATA__=${JSON.stringify(
              serverData
            )}</script>`
          );
        }
        if (debug) {
          res.write(`</body>`);
          res.write(`</html>`);
        }
      },
      onError(error) {
        isError = true;
        console.error(error);
      },
    }
  );

  setTimeout(abort, ABORT_DELAY);
};
