#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_texture;

uniform vec2 u_textureSize;

uniform sampler2D u_copyright;
uniform sampler2D u_outlineTexture;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_deltaTime;
uniform vec2 u_mouse;

varying vec2 v_texCoord;

uniform float u_kernel[9];

uniform float u_kernelWeight;

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
   // 计算1像素对应的纹理坐标
	vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;

	vec4 colorSum = texture2D(u_texture, v_texCoord + onePixel * vec2(-1., -1.)) * u_kernel[0] +
		texture2D(u_texture, v_texCoord + onePixel * vec2(0., -1.)) * u_kernel[1] +
		texture2D(u_texture, v_texCoord + onePixel * vec2(1., -1.)) * u_kernel[2] +
		texture2D(u_texture, v_texCoord + onePixel * vec2(-1., 0.)) * u_kernel[3] +
		texture2D(u_texture, v_texCoord) * u_kernel[4] +
		texture2D(u_texture, v_texCoord + onePixel * vec2(1., 0.)) * u_kernel[5] +
		texture2D(u_texture, v_texCoord + onePixel * vec2(-1., 1.)) * u_kernel[6] +
		texture2D(u_texture, v_texCoord + onePixel * vec2(0., 1.)) * u_kernel[7] +
		texture2D(u_texture, v_texCoord + onePixel * vec2(1., 1.)) * u_kernel[8];

   // 对左中右像素求均值
	gl_FragColor = vec4((colorSum / u_kernelWeight).rgb, 1.0);
}