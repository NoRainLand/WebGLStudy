precision mediump float;

uniform sampler2D u_texture;
uniform sampler2D u_outlineTexture;
uniform vec2 u_resolution;

uniform vec4 u_color;
uniform float u_time;

void main() {
    vec4 color = texture2D(u_texture, gl_FragCoord.xy * vec2(1.0, -1.0) / u_resolution + vec2(0.0, 1.0));
    vec2 texCoord = gl_FragCoord.xy / u_resolution;
    // 将纹理坐标转换为以中心为原点的坐标
    texCoord = texCoord - 0.5;

    // 旋转纹理坐标
    float cosRot = cos(u_time/5000.);
    float sinRot = sin(u_time/5000.);
    vec2 rotatedTexCoord;
    rotatedTexCoord.x = texCoord.x * cosRot - texCoord.y * sinRot;
    rotatedTexCoord.y = texCoord.x * sinRot + texCoord.y * cosRot;

    // 将纹理坐标转换回以左下角为原点的坐标
    rotatedTexCoord = rotatedTexCoord + 0.5;
    vec4 outlineColor = texture2D(u_outlineTexture, rotatedTexCoord);

    // 检查周围的像素是否与当前像素颜色不同
    for(int i = -3; i <= 3; i++) {
        for(int j = -3; j <= 3; j++) {
            vec4 sample = texture2D(u_texture, (gl_FragCoord.xy + vec2(float(i), float(j))) * vec2(1.0, -1.0) / u_resolution + vec2(0.0, 1.0));
            if(sample.a < 0.1 && color.a > 0.1) {
                gl_FragColor = mix(color, outlineColor, 0.7);
                return;
            }
        }
    }
    // gl_FragColor = color;

}