declare module 'tcp-port-used' {
    export function waitUntilFree(port: number, interval: number, timeout: number): Promise<any>;
}
