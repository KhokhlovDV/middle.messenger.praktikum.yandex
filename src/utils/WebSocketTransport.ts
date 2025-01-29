import { EventBus } from '../framework/eventbus';

export enum WebSocketEvents {
    OPEN = 'open',
    CLOSE = 'close',
    MESSAGE = 'message',
    ERROR = 'error',
}

const PING_TIME = 10000;

export class WebSocketTransport extends EventBus {
    private socket?: WebSocket;

    private pingInterval?: ReturnType<typeof setInterval>;

    constructor(private url: string) {
        super();
    }

    public send(data: string | number | object) {
        if (!this.socket) {
            throw new Error('Socket is not connected');
        }
        this.socket.send(JSON.stringify(data));
    }

    public connect(): Promise<void> {
        if (this.socket) {
            throw new Error('The socket is already connected');
        }

        this.socket = new WebSocket(this.url);

        this.socket.addEventListener(WebSocketEvents.OPEN, () => {
            this.emit(WebSocketEvents.OPEN);
            this.pingInterval = setInterval(() => {
                this.send({ type: 'ping' });
            }, PING_TIME);
        });

        this.socket.addEventListener(WebSocketEvents.CLOSE, (event) => {
            clearInterval(this.pingInterval);
            this.pingInterval = undefined;
            this.socket = undefined;
            this.emit(WebSocketEvents.CLOSE, event);
        });

        this.socket.addEventListener(
            WebSocketEvents.MESSAGE,
            (message: MessageEvent<unknown>) => {
                const { data } = message;
                if (typeof data === 'string') {
                    const parsedResult = JSON.parse(data) as object;
                    if (
                        'type' in parsedResult &&
                        typeof parsedResult.type === 'string' &&
                        ['pong', 'user connected'].includes(parsedResult.type)
                    ) {
                        return;
                    }
                    this.emit(WebSocketEvents.MESSAGE, parsedResult);
                }
            }
        );

        this.socket.addEventListener(WebSocketEvents.ERROR, (event) => {
            this.emit(WebSocketEvents.ERROR, event);
        });

        return new Promise((resolve, reject) => {
            this.on(WebSocketEvents.ERROR, reject);
            this.on(WebSocketEvents.OPEN, () => {
                this.off(WebSocketEvents.ERROR, reject);
                resolve();
            });
        });
    }

    public close() {
        this.socket?.close();
    }
}
