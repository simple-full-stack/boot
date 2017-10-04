declare module 'ajv-i18n' {
    import * as Ajv from 'ajv';
    export function zh(errors: Ajv.ErrorObject[] | undefined): void;
}
