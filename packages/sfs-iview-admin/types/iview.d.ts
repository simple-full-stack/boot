declare module 'iview' {
    import {PluginObject} from 'vue/types/plugin';

    const iView: PluginObject<{}>;
    export default iView;

    export interface LangMap {
        [key: string]: string;
    }
}

declare module 'iview/dist/styles/iview.css' {}

declare module 'iview/src/locale/lang/zh-CN' {
    import {LangMap} from 'iview';

    const m: LangMap;
    export default m;
}

declare module 'iview/src/locale/lang/en-US' {
    import {LangMap} from 'iview';

    const m: LangMap;
    export default m;
}

declare module 'iview/src/locale/lang/zh-TW' {
    import {LangMap} from 'iview';

    const m: LangMap;
    export default m;
}