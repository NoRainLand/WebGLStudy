#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform vec2 u_texSize;

uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_texSize.xy;
    vec4 texColor = texture2D(u_texture, uv);
    gl_FragColor = vec4(abs(sin(u_time/10.)), texColor.g, texColor.b, 1.0);
    gl_FragColor = vec4(uv.x, uv.y, texColor.b, 1.0);
}