#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform sampler2D u_outlineTexture;
uniform vec2 u_resolution;
uniform float u_deltaTime;
void main() {
    vec4 color1 = texture2D(u_texture, gl_FragCoord.xy * vec2(1.0, -1.0) / u_resolution + vec2(0.0, 1.0));
    vec4 color2 = texture2D(u_outlineTexture, gl_FragCoord.xy * vec2(1.0, -1.0) / u_resolution + vec2(0.0, 1.0));
    if(color1.a <= 0.1) {
        gl_FragColor = color2;
        return;
    }
    gl_FragColor = mix(color1, color2, 0.5);
}
