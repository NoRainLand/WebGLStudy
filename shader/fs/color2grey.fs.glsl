
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_texture;

varying vec4 v_color;

float brightness(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

void main() {
    vec4 color = texture2D(u_texture, gl_FragCoord.xy);
    float brightness = brightness(color.xyz);
    gl_FragColor = vec4(vec3(brightness), color.a);
}