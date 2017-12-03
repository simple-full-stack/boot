export interface IGetterModule extends Record<string, {}> {
    $$getter: string[];
}
export declare function getter(target: {}, key: string): void;
