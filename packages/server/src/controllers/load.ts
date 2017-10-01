import * as fs from 'fs';
import * as path from 'path';
import Controller, * as ControllerExtra from './Controller';

export default function load(dir): Array<ControllerExtra.ControllerClassType> {
    const files = fs.readdirSync(dir);
    const Controllers = [];
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile) {
            const m = require(filePath);
            if (!m || !m.default) {
                return;
            }

            const Class = m.default as ControllerExtra.ControllerClassType;
            const proto = Object.getPrototypeOf(Class);
            if (Class === Controller || proto instanceof Controller) {
                Controllers.push(Class);
            }
        } else if (stat.isDirectory) {
            Controllers.push(...load(filePath));
        }
    });
    return Controllers;
}
