#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform vec2 u_resolution;

uniform float u_time;
uniform vec2 u_mouse;

void main() {
    float u_time = u_time / 10000.;
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 mouse = u_mouse / u_resolution;
    float dis = pow((uv.x - mouse.x), 2.) + pow((uv.y - mouse.y), 2.);
    float r = 0.2;
    float a = smoothstep(r * 1.01, r, dis);
    vec4 texColor = vec4(vec3(dis), a);

    gl_FragColor = texColor;
}