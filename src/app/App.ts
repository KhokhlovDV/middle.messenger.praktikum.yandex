import { Router } from '../framework';
import { SignInPage } from '../pages';

export class App {
    init() {
        const outlet = document.getElementById('app') as HTMLDivElement;
        Router.getInstance().use('/', SignInPage).start(outlet);
    }
}
