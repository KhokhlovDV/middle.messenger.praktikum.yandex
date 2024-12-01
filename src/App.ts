import Handlebars from 'handlebars';
import { Button } from './components/button';
import * as Pages from './pages';
import { Router } from './Router';

Handlebars.registerPartial('Button', Button);

export class App {
    private appElement: HTMLDivElement;
    private router: Router;
    constructor() {
        this.appElement = document.getElementById('app') as HTMLDivElement;
        this.router = new Router(
            [
                { path: '/not-found', onRouteMatch: this.renderNotFound },
                { path: '/', onRouteMatch: this.renderSignIn },
                { path: '/sign-up', onRouteMatch: this.renderSignUp },
            ],
            '/not-found'
        );
    }

    renderNotFound = () => {
        const template = Handlebars.compile(Pages.NotFound);
        this.appElement.innerHTML = template({});
    };

    renderSignIn = () => {
        const template = Handlebars.compile(Pages.SignIn);
        this.appElement.innerHTML = template({});
        document.getElementById('sign-in')?.addEventListener('click', () => {
            console.log('CLIECK!!!');
            this.router.navigate('/sign-up');
        });
    };

    renderSignUp = () => {
        const template = Handlebars.compile(Pages.SignUp);
        this.appElement.innerHTML = template({});
    };
}
