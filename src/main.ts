import './styles/main.pcss';
import { App } from './app/App';

const app = new App();
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
