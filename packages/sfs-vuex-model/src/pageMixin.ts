/**
 * @file pageMixin
 * @author yibuyisheng(yibuyisheng@163.com)
 */

import { default as Vue, ComponentOptions } from 'vue';

const mixin: ComponentOptions<Vue>  = {
    created(): void {
        const vm: Vue = this as Vue;
        if (vm.$constants) {
            vm.$store.dispatch(vm.$constants.ENTER);
        }
    },
    beforeDestroy(): void {
        const vm: Vue = this as Vue;
        if (vm.$constants) {
            vm.$store.dispatch(vm.$constants.LEAVE);
        }
    },
};

export default mixin;
