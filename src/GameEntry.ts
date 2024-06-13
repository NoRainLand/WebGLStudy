import { Canvas } from "./Canvas.js";
import { Config } from "./Config.js";
import { Loader } from "./Loader.js";
import { Shader } from "./Shader.js";


export class GameEntry {
    static canvas: Canvas;
    static outScreenCanvas: Canvas;
    static loader: Loader;
    static shader: Shader;

    static init() {
        this.canvas = new Canvas(Config.canvasSize, Config.canvasSize, "maincanvas", true);
        this.outScreenCanvas = new Canvas(Config.canvasSize, Config.canvasSize, "outscreencanvas", false);
        document.body.appendChild(this.canvas.canvas);
        this.canvas.canvas.style.border = "1px solid black";
        this.loader = new Loader();
        this.shader = new Shader();
        window["GameEntry"] = this;
    }
}