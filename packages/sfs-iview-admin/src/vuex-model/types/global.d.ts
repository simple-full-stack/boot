import Vue from 'vue';

declare global {
    const process: { env: { NODE_ENV: string } };
}

declare module 'vue/types/vue' {
    interface VueConstructor {
        getConstants: (namespace: string) => { [key: string]: string };
    }
}
