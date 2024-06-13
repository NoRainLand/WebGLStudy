#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;
uniform sampler2D u_copyright;
uniform vec2 u_resolution;

vec4 lsbEncode(vec4 color, float data, int channel) {
    float value;
    if(channel == 0) {
        value = floor(color.r * 255.0);
    } else if(channel == 1) {
        value = floor(color.g * 255.0);
    } else {
        value = floor(color.b * 255.0);
    }

    if(value == 255.0) {
        value = 254.0;
    } else {
        if(mod(value, 2.0) != data) {
            value += 1.0;
        }
    }

    if(channel == 0) {
        color.r = value / 255.0;
    } else if(channel == 1) {
        color.g = value / 255.0;
    } else {
        color.b = value / 255.0;
    }

    return color;
}
vec4 lsbDecode(vec4 color, int channel) {
    float value;
    if(channel == 0) {
        value = floor(color.r * 255.0);
    } else if(channel == 1) {
        value = floor(color.g * 255.0);
    } else {
        value = floor(color.b * 255.0);
    }
    value = mod(value, 2.0);
    return vec4(vec3(value), 1.0);
}
void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec4 color = texture2D(u_texture, st * vec2(1.0, -1.0));

    vec4 color2 = texture2D(u_copyright, st);

    color = lsbEncode(color, color2.x, 0);
        // color = vec4(color.xyz, circle(st, 0.5));
    // color = vec4(vec3(brightness(color.rgb)), color.a);
    color = lsbDecode(color, 0);

    gl_FragColor = color;
}