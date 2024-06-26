#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    vec2 border1 = step(vec2(0.01), st);
    vec2 border2 = step(vec2(0.01), 1. - st);
    vec2 border = border1 * border2;
    gl_FragColor = vec4(border.x, border.y, 0.0, 1.0);
}
