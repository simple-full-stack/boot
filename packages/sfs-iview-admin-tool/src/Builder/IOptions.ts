import {Configuration} from 'webpack';

export default interface IOptions {
    babel?: {};
    babelPresets?: {};
    babelPlugins?: {};

    env?: 'production' | 'development' | 'distServer';
    envVars?: {
        production?: Record<string, string>;
        development?: Record<string, string>;
        rd?: Record<string, string>;
        off?: Record<string, string>;
        distServer?: Record<string, string>;
    };

    entries?: string[];
    entriesTitle?: Record<string, string>;

    alias?: Record<string, string>;

    projectDir?: string;

    loaders?: {}[];
    plugins?: {}[];

    productionGzip?: boolean;
    productionGzipExtensions?: string[];
    bundleAnalyzerReport?: boolean;

    proxyTable?: Record<string, {}>;
    port?: number;
    defaultEntry?: string;

    postcss?: {}[];

    extend?: (config: Configuration, options: IOptions) => Configuration;
}
