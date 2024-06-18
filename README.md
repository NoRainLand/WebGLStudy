# WebGLStudy

## *by NoRain*

## 2024/6/13

![Lena](./res/lena.png)

Leua女神在上，在您的目光注视下，我将沿着前辈的足迹，攀登图形学的高峰。

---

1，某个shader属性，JS侧无法获取（获取值为-1）,有三个可能，

- 没有定义（或者定义位置不对，比如属性（attribute）在片元着色器定义了）
- 大小写
- 属性没有使用，所以在webgl的编译阶段被优化掉了。

2，调用```gl.viewport```的时候使用画布尺寸可能会报错，因为假设画布尺寸过大，超过了webgl的限制，就会报错。可以使用```gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);```代替，或者用```gl.getParameter(gl.MAX_VIEWPORT_DIMS);```判断一下。

3，画布有两个尺寸，一个是实际像素尺寸，这个可以由JS，HTML控制，另一个是显示尺寸，可以（推荐）使用CSS控制。

4，获取上下文的时候，一个画布只能获取一个上下文，"gl"或者"2d"。

5，获取上下文的时候，webgl会做隐私限制，所以可以通过入参```canvas.getContext('webgl', { preserveDrawingBuffer: true })```解除限制，从而实现下载功能。

6，在非http下载画布的图片使用会打印警告。（使用toDataURL或者使用toBlob都行，用toBlob报错短一些）

7，画布坐标是左上角为00点，webgl坐标为齐次坐标，属于右手坐标系统，裁剪空间坐标为二维坐标，屏幕中间为00，向上向右，范围-1到1

8，a_position通常是顶点的模型空间坐标，这些坐标是相对于模型本身的。在顶点着色器中，会使用模型视图投影矩阵将其转换到裁剪空间。

9，v_texCoord通常是顶点的纹理坐标。这些坐标用于在纹理上查找颜色。纹理坐标通常是0到1，这样不需要处理，直接传递到片元着色器即可。

10，glsl支持调和：比如v4 color.x = color.r = color.s，比如color.rgb = v3 color2[color.r,color.g,color.b]

11，所有支持webgl的环境，片段着色器至少有8个纹理单元。顶点着色器可以是0个，实际超过99%的机器至少4个纹理单元。可以通过调用API查看最大支持```gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)或者gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)```

12,
