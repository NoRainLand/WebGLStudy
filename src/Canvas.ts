export class Canvas {
    private _canvas: HTMLCanvasElement;
    private _gl: WebGLRenderingContext;
    private _canvasName: string = "";

    private _mouse: { x: number, y: number } = { x: 0, y: 0 };
    constructor(width: number, height: number, canvasName?: string) {
        this._canvasName = canvasName;
        this.init(width, height);
    }
    private init(width: number, height: number) {
        this._canvas = document.createElement('canvas') as HTMLCanvasElement;
        this._canvas.id = this._canvasName || 'canvas' + Math.random();
        this.canvas.width = width;
        this.canvas.height = height;
        this._gl = this.canvas.getContext('webgl') as WebGLRenderingContext;

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

    //注意，这里反转了y轴
    get mouse(): { x: number, y: number } {
        if (this._canvas.parentNode) {
            return this._mouse;
        }
        return { x: 0, y: 0 };
    }
}