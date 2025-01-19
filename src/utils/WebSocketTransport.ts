import { EventBus } from '../framework/eventbus';

export enum WebSocketEvents {
    OPEN = 'open',
    CLOSE = 'close',
    MESSAGE = 'message',
    ERROR = 'error',
}

const PING_TIME = 10000;

class WebSocketTransport extends EventBus {
    private webSocket?: WebSocket;

    private pingInterval: number = 0;

    public connect(url: string) {
        this.close();
        this.webSocket = new WebSocket(url);

        this.webSocket.addEventListener(WebSocketEvents.OPEN, () => {
            this.emit(WebSocketEvents.OPEN);
            this.pingInterval = setInterval(() => {
                this.send({ type: 'ping' });
            }, PING_TIME);
        });

        this.webSocket.addEventListener(WebSocketEvents.CLOSE, (event) => {
            clearInterval(this.pingInterval);
            this.pingInterval = 0;
            this.webSocket = undefined;
            this.emit(WebSocketEvents.CLOSE, event);
        });

        this.webSocket.addEventListener(WebSocketEvents.MESSAGE, (event) => {
            this.emit(WebSocketEvents.MESSAGE, event);
        });

        this.webSocket.addEventListener(WebSocketEvents.ERROR, (event) => {
            this.emit(WebSocketEvents.ERROR, event);
        });
    }

    public close() {
        if (!this.webSocket) {
            return;
        }
        this.webSocket.close();
        this.webSocket = undefined;
    }

    public send(data: unknown) {
        if (!this.webSocket) {
            throw new Error('No connection');
        }
        this.webSocket.send(JSON.stringify(data));
    }
}

export const webSocketTransport = new WebSocketTransport();
