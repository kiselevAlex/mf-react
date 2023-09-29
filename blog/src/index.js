import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';

let root = document.getElementById('blog');

if (!root) {
    root = document.createElement('div');
    root.setAttribute('id', 'blog');
    document.body.appendChild(root);
}

hydrateRoot(root, <App />);
