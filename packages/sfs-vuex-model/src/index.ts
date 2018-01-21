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

    /* tslint:disable:interface-name */
    interface Vue {
    /* tslint:enable:interface-name */
        getConstants: (namespace: string) => IConstant;
        setConstants: (namespace: string, constants: IConstant) => void;
        $namespace?: string;
        $constants: IConstant;
    }
}

declare module 'vue/types/options' {
    /* tslint:disable:interface-name */
    interface ComponentOptions<V extends Vue> {
    /* tslint:enable:interface-name */
        namespace?: string;
    }
}

export { default } from './store';
export { default as pageMixin } from './pageMixin';
export { default as BaseModule } from './BaseModule';
export { default as NetworkModule } from './NetworkModule';
export { default as action } from './decorators/action';
