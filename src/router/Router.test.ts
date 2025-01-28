import { expect } from 'chai';
import { describe, it } from 'mocha';
import { createSandbox } from 'sinon';
import { Router } from './Router';
import { Block } from '../framework';
import { Routes } from '../constants';

describe('Router', () => {
    let router: Router;
    const outlet = document.getElementById('app') as HTMLDivElement;

    class MockBlock extends Block {
        render() {
            return `<div></div>`;
        }
    }

    beforeEach(() => {
        router = Router.getInstance();
        router
            .use(Routes.Default, MockBlock)
            .use(Routes.SignUp, MockBlock)
            .setNotFoundRoute(Routes.NotFound, MockBlock, {});
        router.start(outlet);
    });

    afterEach(() => {
        Router.destroyInstance();
    });

    describe('Common behavior', () => {
        it('should be singleton', () => {
            expect(router).to.equal(Router.getInstance());
        });

        it('should display default page', () => {
            expect(router.getCurrentRoute()?.pathname).to.equal(Routes.Default);
        });

        it('should navigate to correct page', () => {
            router.go(Routes.SignUp);
            expect(router.getCurrentRoute()?.pathname).to.equal(Routes.SignUp);
        });

        it('should navigate to not found page', () => {
            router.go('/unknownAddress');
            expect(router.getPath()).to.equal(Routes.NotFound);
        });
    });

    describe('History behavior', () => {
        const sandbox = createSandbox();

        afterEach(() => {
            sandbox.restore();
        });

        it('should navigate back', () => {
            router.go(Routes.SignUp);
            const back = sandbox.spy(window.history, 'back');
            router.back();
            expect(back.callCount).to.equals(1);
        });

        it('should navigate forward', () => {
            const forward = sandbox.spy(window.history, 'forward');
            router.go(Routes.SignUp);
            router.back();
            router.forward();
            expect(forward.callCount).to.equals(1);
        });
    });
});
