export default interface Model {
    namespace?: string;
    state?: any;
    subscriptions?: {
        [key: string]: any;
    };
    effects?: {
        [key: string]: Function;
    };
    reducers?: {
        [key: string]: Function;
    };
}
