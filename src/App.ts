export class App {
    private appElement: HTMLDivElement;
    constructor() {
        this.appElement = document.getElementById('app') as HTMLDivElement;
    }
    render() {
        this.appElement.innerHTML = 'Initial setup';
    }
}
