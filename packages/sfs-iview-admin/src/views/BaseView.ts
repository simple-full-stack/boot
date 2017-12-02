/**
 * @file BaseView
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import Vue from 'vue';
import { ComponentOptions } from 'vue/types/options';
import { DispatchOptions } from 'vuex';
import Component from 'vue-class-component';
import { RawLocation } from 'vue-router';

interface IBaseView {
    getters: { [key: string]: {} };
}

const baseMixin: {} & ComponentOptions<Vue> & ThisType<Vue> = {
    created(): void {
        if (this.$constants) {
            this.$store.dispatch(this.$constants.ENTER);
        }
    },
    beforeDestroy(): void {
        if (this.$constants) {
            this.$store.dispatch(this.$constants.LEAVE);
        }
    },
    computed: {
        getters(): {} {
            return this.$store.getters;
        },
    },
};

// interface IToastOptions {
//     typ?: 'loading' | 'success' | 'fail';
//     message?: string;
// }

@Component({
    mixins: [baseMixin],
})
export default class BaseView extends Vue implements IBaseView {
    public getters: { [key: string]: {} };

    protected dispatch(typ: string, payload?: {}, options?: DispatchOptions): Promise<{}> {
        return this.$store.dispatch(typ, payload, options);
    }

    protected getRouteQuery(dft?: Record<string, {}>): Record<string, {}> {
        return this.$store.state.route.query || dft;
    }

    protected getRouteFullPath(): string {
        return this.$store.state.route.fullPath;
    }

    protected getRoutePath(): string {
        return this.$store.state.route.path;
    }

    protected routePush(location: RawLocation, onComplete?: () => void, onAbort?: () => void): void {
        this.$router.push(location, onComplete, onAbort);
    }

    protected routeReplace(location: RawLocation, onComplete?: () => void, onAbort?: () => void): void {
        this.$router.replace(location, onComplete, onAbort);
    }

    protected routeGo(n: number): void {
        this.$router.go(n);
    }

    // protected showToast(options: IToastOptions): Vue {
    //     return Toast(options);
    // }
}
