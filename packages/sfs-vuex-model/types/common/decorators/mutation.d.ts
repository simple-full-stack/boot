export interface IMutationModule extends Record<string, {}> {
    $$mutation: string[];
}
export default function mutation(target: {}, key: string): void;
