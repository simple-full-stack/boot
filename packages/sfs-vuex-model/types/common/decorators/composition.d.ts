import BaseModule from '../BaseModule';
export declare type MixType = <T extends BaseModule>(Target: new () => BaseModule) => new () => T;
export declare function composition(Class: new () => BaseModule, fieldName?: string): MixType;
