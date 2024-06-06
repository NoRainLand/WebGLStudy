#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform vec2 u_resolution;

uniform float u_time;

void main() {
    float u_time = u_time / 10000.;
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec4 texColor = vec4(sin(u_time), cos(u_time), cos(u_time), 1.);
    gl_FragColor = texColor;
}