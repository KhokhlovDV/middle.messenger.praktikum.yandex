const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<body><div id="app"></div></body>', {
    url: 'https://example.com',
});
global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.DocumentFragment = jsdom.window.DocumentFragment;
global.Element = jsdom.window.Element;
global.HTMLElement = jsdom.window.HTMLElement;
