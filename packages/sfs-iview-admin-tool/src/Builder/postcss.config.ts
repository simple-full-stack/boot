import Builder from '../Builder';
import * as autoprefixer from 'autoprefixer';
import * as cssnano from 'cssnano';

export default function (this: Builder) {
    return {
        sourceMap: true,
        plugins: this.options.postcss ? this.options.postcss : [
            autoprefixer({
                browsers: [
                    'ie >= 9',
                    'last 2 versions'
                ]
            }),
            cssnano({
                autoprefixer: false,
                safe: true
            })
        ]
    };
};
