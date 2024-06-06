export class Shader {
    constructor() {

    }

    createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }

    createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        return program;
    }

    checkProgram(gl: WebGLRenderingContext, program: WebGLProgram): boolean {
        let pass = true;
        // 检查程序是否已经被正确链接
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.warn('Program failed to link: ' + gl.getProgramInfoLog(program));
            pass = false;
        }

        // 检查顶点着色器和片段着色器是否已经被正确编译
        let shaders = gl.getAttachedShaders(program);
        for (let shader of shaders) {
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.warn('着色器报错：' + gl.getShaderInfoLog(shader));
                pass = false;
            }
        }
        return pass;
    }
}