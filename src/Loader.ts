export class Loader {
    private textureId: number = 0;
    private textureMap: Map<string, WebGLTexture> = new Map();

    loadTexture(gl: WebGLRenderingContext, url: string): Promise<WebGLTexture> {
        if (this.textureMap.has(url)) {
            return Promise.resolve(this.textureMap.get(url));
        } else {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => {
                    const texture = gl.createTexture();
                    gl.activeTexture(gl.TEXTURE0 + this.textureId++);
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    this.updateTexture(gl, image);
                    this.textureMap.set(url, texture);
                    resolve(texture);
                }
                image.onerror = reject;
                image.src = url;
            })
        }
    }


    updateTexture(gl: WebGLRenderingContext, image: HTMLImageElement) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        if (this.isPowerOf2(image.width) && this.isPowerOf2(image.height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    }

    async loadShader(url: string): Promise<string> {
        const response = await fetch(url);
        return await response.text();
    }

    isPowerOf2(value: number): boolean {
        return (value & (value - 1)) == 0;
    }
}