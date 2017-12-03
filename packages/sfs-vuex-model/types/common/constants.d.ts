export interface IConstant {
    [key: string]: string;
}
export declare function getConstants(namespace: string): IConstant;
export declare function setConstants(namespace: string, constants: IConstant): void;
