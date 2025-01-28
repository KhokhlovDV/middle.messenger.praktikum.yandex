const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<body></body>', { url: 'https://example.com' });
global.window = jsdom.window;
global.document = jsdom.document;
global.FormData = jsdom.FormData;
