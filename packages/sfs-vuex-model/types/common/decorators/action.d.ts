export interface IActionModule extends Record<string, {}> {
    $$action: string[];
}
export default function action(target: {}, key: string): void;
