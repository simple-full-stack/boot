declare module '*.vue' {
    import Vue, {ComponentOptions} from 'vue';

    const m: ComponentOptions<Vue, {}, {}, {}, {}>;
    export default m;
}
