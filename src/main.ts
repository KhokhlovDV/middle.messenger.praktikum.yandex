import './styles/main.pcss';
import { App } from './app';

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
