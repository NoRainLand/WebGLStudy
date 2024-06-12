export class Canvas {
    private _canvas: HTMLCanvasElement;
    private _gl: WebGLRenderingContext;
    private _ctx: CanvasRenderingContext2D;
    private _canvasName: string = "";
    private isgl: boolean = true;

    private _mouse: { x: number, y: number } = { x: 0, y: 0 };
    constructor(width: number, height: number, canvasName: string, isgl: boolean = true) {
        this._canvasName = canvasName;
        this.isgl = isgl;
        this.init(width, height);
    }
    private init(width: number, height: number) {
        this._canvas = document.createElement('canvas') as HTMLCanvasElement;
        this._canvas.id = this._canvasName || 'canvas' + Math.random();
        this.canvas.width = width;
        this.canvas.height = height;
        if (this.isgl) {
            //WebGL 的安全性限制：在默认情况下，WebGL 不允许从帧缓冲区读取数据，因为这可能会泄露敏感信息。如果你尝试读取数据，WebGL 可能会返回一个全黑的像素数组。
            this._gl = this.canvas.getContext('webgl', { preserveDrawingBuffer: true }) as WebGLRenderingContext;
        } else {
            //只能获取一个上下文
            this._ctx = this.canvas.getContext('2d');
        }
        this.addEvent();
    }

    private addEvent() {
        this._canvas.addEventListener('mousemove', this.onMouseMove)
    }



    private onMouseMove = (e: MouseEvent) => {
        this._mouse = { x: e.offsetX, y: this._canvas.height - e.offsetY };
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas || null;
    }

    get gl(): WebGLRenderingContext {
        return this._gl || null;
    }

    get ctx(): CanvasRenderingContext2D {
        return this._ctx || null;
    }

    //注意，这里反转了y轴
    get mouse(): { x: number, y: number } {
        if (this._canvas.parentNode) {
            return this._mouse;
        }
        return { x: 0, y: 0 };
    }
}