/**
 * @file index
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import Vue from 'vue';

declare module 'vue/types/vue' {
    interface IConstant {
        [key: string]: string;
    }

    interface IConstantsMap {
        [key: string]: IConstant;
    }

    interface Vue {
        getConstants: (namespace: string) => IConstant;
        setConstants: (namespace: string, constants: IConstant) => void;
        $namespace?: string;
        $constants: IConstant;
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        namespace?: string;
    }
}

export { default } from './common/store';
export { default as pageMixin } from './common/pageMixin';
export { default as BaseModule } from './common/BaseModule';
export { default as NetworkModule } from './common/NetworkModule';
export { default as action } from './common/decorators/action';
