export class Config {
    static readonly WIDTH = 800;
    static readonly HEIGHT = 800;

    static readonly BASE_VERTEX_SHADER_URL = '../shader/vs/base.vs.glsl';
    static readonly BASE_FRAGMENT_SHADER_URL = '../shader/fs/base.fs.glsl';

    static readonly VERTEX_SHADER_URL = this.BASE_VERTEX_SHADER_URL;
    static readonly FRAGMENT_SHADER_URL = "../shader/fs/test.fs.glsl";
}