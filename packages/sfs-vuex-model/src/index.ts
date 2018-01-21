/**
 * @file index
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import { default as Vue } from 'vue';

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

export { default } from './store';
export { default as pageMixin } from './pageMixin';
export { default as BaseModule } from './BaseModule';
export { default as NetworkModule } from './NetworkModule';
export { default as action } from './decorators/action';
