declare module "tcp-port-used" {
    export function waitUntilFree(port: number, retryTimeMs?: number, timeOutMs?: number): Promise<undefined>;
}
