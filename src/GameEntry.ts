import { Canvas } from "./Canvas.js";
import { Loader } from "./Loader.js";
import { Shader } from "./Shader.js";


export class GameEntry {
    static canvas: Canvas;
    static outScreenCanvas: Canvas;
    static loader: Loader;
    static shader: Shader;

    static init() {
        this.canvas = new Canvas(800, 800, "maincanvas");
        this.outScreenCanvas = new Canvas(800, 800, "outscreencanvas");
        document.body.appendChild(this.canvas.canvas);
        this.loader = new Loader();
        this.shader = new Shader();
    }
}