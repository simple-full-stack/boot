import { StyleSheet } from 'react-native';
import { assign, reduce, mapValues, keys, uniq, clone } from 'lodash';

interface ObjectStyle {
    [name: string]: any;
}

type Style = number | ObjectStyle;

interface Sheet {
    [name: string]: Style;
}

export function extendStyle(style: Style, ...otherStyles: ObjectStyle[]) {
    return reduce(otherStyles, (prev, cur) => {
        const normalizedStyle = StyleSheet.flatten(cur);
        return assign(prev, normalizedStyle);
    }, StyleSheet.flatten(clone(style) as any));
}

export function normalizeSheet(sheet: Sheet) {
    return mapValues(sheet, (style) => StyleSheet.flatten(style as any)) as Sheet;
}

export function extendStyleSheet(sheet: Sheet, ...otherSheets: Sheet[]): Sheet {
    return reduce(otherSheets, (prev, cur) => {
        uniq([...keys(prev), ...keys(cur)]).forEach(key => {
            if (!prev[key]) {
                prev[key] = cur[key];
            }

            prev[key] = extendStyle(prev[key], cur[key] as ObjectStyle);
        });
        return prev;
    }, normalizeSheet(sheet));
}
