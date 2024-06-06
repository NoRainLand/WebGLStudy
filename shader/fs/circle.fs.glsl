#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform vec2 u_resolution;

uniform float u_time;

#define PI 3.14159265359

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec4 color = vec4(0.27, 0.27, 0.61, 1.0);
    vec4 lineColor = vec4(0.16, 1.0, 0.37, 1.0);

    // float dis = sqrt(pow(abs(uv.x - 0.5), 2.) + pow(abs(uv.y - 0.5), 2.));
    float dis = distance(uv, vec2(0.5));
    if(dis < 0.4) {
        vec3 disColor = vec3(dis);
        gl_FragColor = vec4(disColor, 1.);
    }

}