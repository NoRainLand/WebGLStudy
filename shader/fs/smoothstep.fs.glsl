#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform vec2 u_resolution;

uniform float u_time;

#define PI 3.14159265359

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float r = 0.4;

    float border = r * 0.01;

    // float dis = sqrt(pow(abs(uv.x - 0.5), 2.) + pow(abs(uv.y - 0.5), 2.));
    float dis = distance(uv, vec2(0.5));
    float alpha = smoothstep(r, r - border, dis); // 使用smoothstep函数来实现平滑过渡

    vec3 disColor = vec3(dis);
    gl_FragColor = vec4(disColor, alpha);

}

float circle(in vec2 _st, in float _radius) {
    vec2 dist = _st - vec2(0.5);
    return 1. - smoothstep(_radius - (_radius * 0.01), _radius + (_radius * 0.01), dot(dist, dist) * 4.0);
}

// void main(){
// 	vec2 st = gl_FragCoord.xy/u_resolution.xy;

// 	vec3 color = vec3(circle(st,0.9));

// 	gl_FragColor = vec4( color, 1.0 );
// }