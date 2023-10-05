import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import App from '../src/App';

const PORT = process.env.PORT || 3006;
const ABORT_DELAY = 10000;

const app = express();
const blogProxy = createProxyMiddleware('/blog', {
    target: 'http://localhost:4006',
    changeOrigin: true,
    pathRewrite: {
        '^/blog': '/',
    },
});

app.get('/', (req, res) => {
    let isError= false;

    const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
        <div id="root"><App /></div>,
        {
            bootstrapScripts: ["/client.bundle.js"],
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

app.use(blogProxy);
app.use(express.static(path.resolve(__dirname, '../build')));