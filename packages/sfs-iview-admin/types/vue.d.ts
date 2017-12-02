declare module '*.vue' {
    import Vue, {ComponentOptions} from 'vue';

    const m: ComponentOptions<Vue, {}, {}, {}, {}>;
    export default m;
}

declare module 'vue/types/vue' {
    import {LangMap} from 'iview';

    interface VueConstructor {
        locale: (p1: string, p2: LangMap) => void;
    }
}