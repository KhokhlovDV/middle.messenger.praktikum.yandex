import { expect } from 'chai';
import { describe, it } from 'mocha';
import Sinon, {
    createSandbox,
    SinonFakeXMLHttpRequest,
    SinonFakeXMLHttpRequestStatic,
    SinonStub,
} from 'sinon';
import { HttpTransport } from './HttpTransport';

describe('HTTP Transport', () => {
    const sandbox = createSandbox();
    let httpTransport: HttpTransport;

    beforeEach(() => {
        httpTransport = new HttpTransport('');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('Verify HTTP methods', () => {
        let request: SinonStub;
        beforeEach(() => {
            request = sandbox
                .stub(httpTransport, 'request' as keyof typeof httpTransport)
                .callsFake(() => Promise.resolve());
        });

        it('should be called once with GET method', () => {
            httpTransport.get('');
            expect(request.calledOnceWith('', 'GET')).to.equal(true);
        });

        it('should be called once with POST method', () => {
            httpTransport.post('');
            expect(request.calledOnceWith('', 'POST')).to.equal(true);
        });

        it('should be called once with PUT method', () => {
            httpTransport.put('');
            expect(request.calledOnceWith('', 'PUT')).to.equal(true);
        });

        it('should be called once with DELETE method', () => {
            httpTransport.delete('');
            expect(request.calledOnceWith('', 'DELETE')).to.equal(true);
        });
    });

    describe('Verify XHR request data', () => {
        let xhr: SinonFakeXMLHttpRequestStatic;
        let request: SinonFakeXMLHttpRequest;

        beforeEach(() => {
            xhr = Sinon.useFakeXMLHttpRequest();
            // @ts-expect-error: Not all signatures exist in fake object
            global.XMLHttpRequest = xhr;
            xhr.onCreate = (req) => {
                request = req;
            };
        });

        afterEach(() => {
            xhr.restore();
        });

        it('should send credentials', () => {
            httpTransport.get('');
            expect(request.withCredentials).to.equal(true);
        });

        it('should not send data in GET request', () => {
            httpTransport.get('', { data: { value: 'test' } });
            expect(request.requestBody).to.equal(undefined);
        });

        it('should send data in POST request', () => {
            const data = { value: 'test' };
            httpTransport.post('', { data });
            expect(request.requestBody).to.equal(JSON.stringify(data));
        });

        it('should stringify query object', () => {
            httpTransport.get('', {
                query: { firstParam: '1', secondParam: '2' },
            });
            expect(request.url).satisfy((val: string) =>
                val.endsWith('?firstParam=1&secondParam=2')
            );
        });

        it('should set correct heades for JSON data', () => {
            httpTransport.post('', { data: { value: 'test' } });
            expect(request.requestHeaders).to.have.property(
                'Content-Type',
                'application/json;charset=utf-8'
            );
        });
    });
});
