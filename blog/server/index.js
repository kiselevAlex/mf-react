import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';

import App from '../src/App';

const PORT = process.env.PORT || 4006;
const ABORT_DELAY = 10000;

const app = express();

app.get('/', (req, res) => {
    let isError= false;

    const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
        // <div id="blog"><App /></div>,
        <App />,
        {
            // bootstrapScripts: ["/blog/client.bundle.js"],
            // bootstrapScripts: ["/blog/remoteEntry.js"],
            onShellReady() {
                // Set error status code, if an error happened before starting streaming
                res.statusCode = isError ? 500 : 200;
                res.setHeader("Content-type", "text/html");
                pipe(res);
            },
            onError(error) {
                isError = true;
                console.error(error);
            }
        },
    );

    setTimeout(abort, ABORT_DELAY);
});
  
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use(express.static(path.resolve(__dirname, '../build')));