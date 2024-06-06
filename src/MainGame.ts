import { Config } from "./Config.js";
import { GameEntry } from "./GameEntry.js";

export class MainGame {

    private startTime: number = 0;
    private lastTime: number = 0;
    private _runTime: number = 0;
    private get runTime(): number {
        return this._runTime;
    }
    private frameCount: number = 0;
    private _FPS: number = 60;
    get FPS(): number {
        return this._FPS;
    }


    private _isPlaying: boolean = false;
    get isPlaying(): boolean {
        return this._isPlaying;
    }

    private program: WebGLProgram;

    private mainGl: WebGLRenderingContext;



    private positionLocation: number;
    private texCoordLocation: number;
    private textureLocation: WebGLTexture;
    private textureLight: WebGLUniformLocation;
    private resolution: WebGLUniformLocation;
    private outlineWidth: WebGLUniformLocation;
    private outlineColor: WebGLUniformLocation;
    private time: WebGLUniformLocation;
    private dt: WebGLUniformLocation;


    constructor() {
        this.init();
    }

    private _onUpdate = () => {
        let dt = Date.now() - this.lastTime;
        this.lastTime = Date.now();
        this.onUpdate(dt);
        ++this.frameCount;
        requestAnimationFrame(this._onUpdate);
    }


    private init() {
        this.startTime = Date.now();
        this._onUpdate();
        setInterval(() => {
            this._FPS = this.frameCount;
            this.frameCount = 0;
        }, 1000)
        this.initWebGl();
    }

    async initWebGl() {
        this.mainGl = this.mainGl = GameEntry.canvas.gl;
        let vertexShaderSource = await GameEntry.loader.loadShader(Config.VERTEX_SHADER_URL);
        let fragmentShaderSource = await GameEntry.loader.loadShader(Config.FRAGMENT_SHADER_URL);
        let vertexShader = GameEntry.shader.createShader(this.mainGl, this.mainGl.VERTEX_SHADER, vertexShaderSource);
        let fragmentShader = GameEntry.shader.createShader(this.mainGl, this.mainGl.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = GameEntry.shader.createProgram(this.mainGl, vertexShader, fragmentShader);

        if (GameEntry.shader.checkProgram(this.mainGl, this.program)) {
            await this.loadTexture();
            this.initRender();
        }
    }

    async loadTexture() {
        await GameEntry.loader.loadTexture(this.mainGl, '../res/image2.png')
        await GameEntry.loader.loadTexture(this.mainGl, '../res/light.png')
    }

    onUpdate(dt: number) {
        if (this._isPlaying) {
            this._runTime += dt;
            this.onRender(dt);
        }
    }



    initRender() {
        const gl = this.mainGl;
        gl.useProgram(this.program);


        this.positionLocation = gl.getAttribLocation(this.program, "a_position");
        this.texCoordLocation = gl.getAttribLocation(this.program, "a_texCoord");
        this.textureLocation = gl.getUniformLocation(this.program, "u_texture");
        this.textureLight = gl.getUniformLocation(this.program, "u_outlineTexture");
        this.resolution = gl.getUniformLocation(this.program, "u_resolution");
        this.outlineWidth = gl.getUniformLocation(this.program, "u_outlineWidth");
        this.outlineColor = gl.getUniformLocation(this.program, "u_outlineColor");
        this.time = gl.getUniformLocation(this.program, "u_time");
        this.dt = gl.getUniformLocation(this.program, "u_deltaTime");



        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            -1.0, 1.0,
            1.0, -1.0,
            1.0, 1.0
        ]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.positionLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0.0, 1.0,
            1.0, 1.0,
            0.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            1.0, 0.0
        ]), gl.STATIC_DRAW);


        this.startTime = Date.now();
        this._isPlaying = true;

    }




    onRender(dt: number) {

        const gl = this.mainGl;
        gl.useProgram(this.program);
        gl.enableVertexAttribArray(this.texCoordLocation);
        gl.vertexAttribPointer(this.texCoordLocation, 2, gl.FLOAT, false, 0, 0);
        gl.activeTexture(gl.TEXTURE0);



        gl.uniform1i(this.textureLocation, 0);
        gl.uniform1i(this.textureLight, 1);
        gl.uniform2f(this.resolution, gl.canvas.width, gl.canvas.height);
        gl.uniform1i(this.outlineWidth, 3);
        gl.uniform4fv(this.outlineColor, new Float32Array([1.0, 0.5, 0.0, 1.0]));
        gl.uniform1f(this.time, this.runTime);
        gl.uniform1f(this.dt, dt);



        gl.drawArrays(gl.TRIANGLES, 0, 6);

    }

    play() {
        if (this._isPlaying == false) {
            this._isPlaying = true;
        }
    }

    pause() {
        this._isPlaying = false;
    }


}