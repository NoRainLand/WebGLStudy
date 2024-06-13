#ifdef GL_ES
precision mediump float;
#endif


uniform sampler2D u_texture;
uniform sampler2D u_copyright;
uniform sampler2D u_outlineTexture;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_deltaTime;
uniform vec2 u_mouse;


varying vec2 v_texCoord;

float circle(in vec2 _st, in float _radius) {
    vec2 dist = _st - vec2(0.5);
    return 1. - smoothstep(_radius - (_radius * 0.01), _radius + (_radius * 0.01), dot(dist, dist) * 4.0);
}

float brightness(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

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
    // vec2 st = gl_FragCoord.xy / u_resolution.xy;
    // vec4 color = texture2D(u_texture, st * vec2(1.0, -1.0));

    vec4 color = texture2D(u_texture, v_texCoord);

    vec4 color2 = texture2D(u_copyright, v_texCoord);

    color = lsbEncode(color, color2.x, 1);
        // color = vec4(color.xyz, circle(st, 0.5));
    // color = vec4(vec3(brightness(color.rgb)), color.a);
    // color = lsbDecode(color, 1);

    gl_FragColor = color;
}