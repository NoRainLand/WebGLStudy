#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform vec2 u_resolution;

uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    // vec4 texColor = texture2D(u_texture, uv);
    // gl_FragColor = vec4(abs(sin(u_time / 1000.)), texColor.g, texColor.b, 1.0);
    // gl_FragColor = vec4(uv.x, uv.y, texColor.b, 1.0);

    vec2 dd = (uv - vec2(0.5)) * 2. * 2.;
    float tt = abs(sin(u_time / 1000.));
    dd = cos(dd);
    // if(dd.x > 0. && dd.y > 0. && dd.x * dd.y > 0.01) {
    gl_FragColor = vec4(vec3(1.-dd.x * dd.y * tt), 1.);
    // }
}