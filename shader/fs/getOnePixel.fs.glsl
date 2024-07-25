
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;

uniform vec2 u_textureSize;

uniform sampler2D u_copyright;
uniform sampler2D u_outlineTexture;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_deltaTime;
uniform vec2 u_mouse;

varying vec2 v_texCoord;
void main() {
	 // 计算1像素对应的纹理坐标
	vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
	gl_FragColor = texture2D(u_texture, v_texCoord + onePixel);
}