export class Shader {
    constructor() {

    }

    /**创建着色器 */
    createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
        const shader = gl.createShader(type);//创建着色器，
        gl.shaderSource(shader, source);//提供数据源
        gl.compileShader(shader);//编译着色器
        return shader;
    }

    /**创建着色器程序 */
    createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
        const program = gl.createProgram();//创建着色器程序
        gl.attachShader(program, vertexShader);//将着色器添加到着色器程序
        gl.attachShader(program, fragmentShader);//将着色器添加到着色器程序
        gl.linkProgram(program);//链接着色器程序
        return program;
    }

    /**检查着色器程序 */
    checkProgram(gl: WebGLRenderingContext, program: WebGLProgram): boolean {
        let pass = true;
        // 检查程序是否已经被正确链接
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.warn('着色器程序连接失败：' + gl.getProgramInfoLog(program));
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