import Handlebars from 'handlebars';
import { Button } from './components/button';
import * as Pages from './pages';

Handlebars.registerPartial('Button', Button);

export class App {
    private appElement: HTMLDivElement;
    constructor() {
        this.appElement = document.getElementById('app') as HTMLDivElement;
    }
    render() {
        const template = Handlebars.compile(Pages.SignIn);
        this.appElement.innerHTML = template({});
    }
}
