import { Config } from "./Config.js";
import { GameEntry } from "./GameEntry.js";

export class MainGame {
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
    private texcoordLocation: number;

    private positionBuffer: WebGLBuffer;
    private texcoordBuffer: WebGLBuffer;

    private textureLocation: WebGLTexture;
    private textureSize: WebGLUniformLocation;

    private copyright: WebGLTexture;
    private textureLight: WebGLUniformLocation;
    private resolution: WebGLUniformLocation;
    private outlineWidth: WebGLUniformLocation;
    private color: WebGLUniformLocation;
    private time: WebGLUniformLocation;
    private dt: WebGLUniformLocation;
    private mouse: WebGLUniformLocation;

    private imageWH: { width: number, height: number } = { width: 0, height: 0 };

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
        this._onUpdate();
        setInterval(() => {
            this._FPS = this.frameCount;
            this.frameCount = 0;
        }, 1000)
        this.initShaderProgram();
    }

    async initShaderProgram() {
        this.mainGl = this.mainGl = GameEntry.canvas.gl;
        let vertexShaderSource = await GameEntry.loader.loadShader(Config.VERTEX_SHADER_URL);
        let fragmentShaderSource = await GameEntry.loader.loadShader(Config.FRAGMENT_SHADER_URL);
        let vertexShader = GameEntry.shader.createShader(this.mainGl, this.mainGl.VERTEX_SHADER, vertexShaderSource);
        let fragmentShader = GameEntry.shader.createShader(this.mainGl, this.mainGl.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = GameEntry.shader.createProgram(this.mainGl, vertexShader, fragmentShader);

        if (GameEntry.shader.checkProgram(this.mainGl, this.program)) {
            await this.loadTexture();
            this.initRender();
            this.play();//开始渲染
        }
    }

    async loadTexture() {
        await GameEntry.loader.loadTexture(this.mainGl, '../res/image2.png')
        await GameEntry.loader.loadTexture(this.mainGl, '../res/light.png')
        await GameEntry.loader.loadTexture(this.mainGl, Config.Lena)
            .then(value => {
                this.imageWH.width = value[1].width;
                this.imageWH.height = value[1].height;
            });
        await GameEntry.loader.loadTexture(this.mainGl, Config.copyright);
    }

    onUpdate(dt: number) {
        if (this._isPlaying) {
            this._runTime += dt;
            this.onRender(dt);
        }
    }


    //初始化渲染
    initRender() {
        const gl = this.mainGl;
        gl.useProgram(this.program);

        this.positionLocation = gl.getAttribLocation(this.program, "a_position");
        this.texcoordLocation = gl.getAttribLocation(this.program, "a_texCoord");

        this.textureLocation = gl.getUniformLocation(this.program, "u_texture");
        this.textureSize = gl.getUniformLocation(this.program, "u_textureSize");

        this.copyright = gl.getUniformLocation(this.program, "u_copyright");
        this.textureLight = gl.getUniformLocation(this.program, "u_outlineTexture");
        this.resolution = gl.getUniformLocation(this.program, "u_resolution");
        this.outlineWidth = gl.getUniformLocation(this.program, "u_outlineWidth");
        this.color = gl.getUniformLocation(this.program, "u_color");
        this.time = gl.getUniformLocation(this.program, "u_time");
        this.dt = gl.getUniformLocation(this.program, "u_deltaTime");
        this.mouse = gl.getUniformLocation(this.program, "u_mouse");

        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);//绑定缓冲区

        let basePostion = [
            0, 0,
            this.imageWH.width, 0,
            0, this.imageWH.height,
            0, this.imageWH.height,
            this.imageWH.width, 0,
            this.imageWH.width, this.imageWH.height
        ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(basePostion), gl.STATIC_DRAW);//将数据写入缓冲区，并且告诉WebGL这是一个静态缓冲区


        this.texcoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Config.baseTexcoord), gl.STATIC_DRAW);
    }




    onRender(dt: number) {

        const gl = this.mainGl;

        //尽可能使用CSS的方式设置画布大小
        //画布有两个尺寸，一个是显示尺寸，一个是实际像素的个数（drawingbuffer ），CSS设置的是显示尺寸，JS或者HTML里边直接设置的是实际像素的个数
        //这里如果使用别的可能会出问题，比如使用gl.canvas.width，如果画布尺寸过大，就可能出现问题。
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

        gl.clearColor(0, 0, 0, 0);//设置清空画布的颜色
        gl.clearDepth(1.0);//设置清空画布的深度
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);//清空画布

        gl.useProgram(this.program);//使用着色器程序

        gl.enableVertexAttribArray(this.positionLocation);//启用属性
        //设置属性指针 每次迭代运行提取两个单位数据，每个单位的数据类型是32位浮点型，不归一化，0 = 移动单位数量 * 每个单位占用内存（sizeof(type)），从缓冲起始位置开始读取
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);



        gl.enableVertexAttribArray(this.texcoordLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
        gl.vertexAttribPointer(this.texcoordLocation, 2, gl.FLOAT, false, 0, 0);
        // gl.activeTexture(gl.TEXTURE0);



        gl.uniform1i(this.textureLocation, 2);
        gl.uniform1i(this.textureLight, 1);

        gl.uniform2fv(this.textureSize, new Float32Array([this.imageWH.width, this.imageWH.height]));

        gl.uniform1i(this.copyright, 3)

        gl.uniform2f(this.resolution, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.uniform1i(this.outlineWidth, 3);
        gl.uniform4fv(this.color, new Float32Array([1.0, 0.5, 0.0, 1.0]));
        gl.uniform1f(this.time, this.runTime);
        gl.uniform1f(this.dt, dt);
        gl.uniform2f(this.mouse, GameEntry.canvas.mouse.x, GameEntry.canvas.mouse.y);


        gl.drawArrays(gl.TRIANGLES, 0, 6);//绘制 图元类型 为三角形，从0开始，顶点着色器运行6次

    }

    play() {
        if (this._isPlaying == false) {
            this._isPlaying = true;
        }
    }

    pause() {
        this._isPlaying = false;
    }

    download() {
        let gl = GameEntry.canvas.gl;
        let width = gl.drawingBufferWidth;
        let height = gl.drawingBufferHeight;
        let pixels = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        let ctx = GameEntry.outScreenCanvas.ctx;
        let imageData = ctx.createImageData(width, height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = (y * width + x) * 4;
                let reversedIndex = ((height - y - 1) * width + x) * 4;
                imageData.data[reversedIndex] = pixels[index];     // R
                imageData.data[reversedIndex + 1] = pixels[index + 1]; // G
                imageData.data[reversedIndex + 2] = pixels[index + 2]; // B
                imageData.data[reversedIndex + 3] = pixels[index + 3]; // A
            }
        }
        ctx.putImageData(imageData, 0, 0);

        // let dataUrl = GameEntry.outScreenCanvas.canvas.toDataURL('image/png');
        // let a = document.createElement('a');
        // a.href = dataUrl;
        // a.download = 'canvas.png';
        // a.click();

        GameEntry.outScreenCanvas.canvas.toBlob((blob) => {
            let url = URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'canvas.png';
            a.addEventListener("click", () => {
                URL.revokeObjectURL(url);
            })
            a.click();
        }, 'image/png');
    }

}