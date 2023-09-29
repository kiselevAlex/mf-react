import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';

import App from '../src/App';

const PORT = process.env.PORT || 4006;
const app = express();

app.get('/', (req, res) => {
    const content = ReactDOMServer.renderToString(<App />);
    const html = `<div id="blog">${content}</div>`;
  
    res.send(html);
});
  
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use(express.static(path.resolve(__dirname, '../build')));