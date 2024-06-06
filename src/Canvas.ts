export class Canvas {
    private _canvas: HTMLCanvasElement;
    private _gl: WebGLRenderingContext;
    private _canvasName: string = "";
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
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas || null;
    }

    get gl(): WebGLRenderingContext {
        return this._gl || null;
    }

}