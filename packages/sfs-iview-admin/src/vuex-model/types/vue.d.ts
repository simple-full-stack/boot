import Vue from 'vue'

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
