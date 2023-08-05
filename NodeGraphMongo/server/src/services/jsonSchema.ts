
import tsj, { Config } from 'ts-json-schema-generator';
import { existsSync } from 'fs';
import { join } from 'path';
import * as url from 'url';
import { JSONSchema7 } from 'json-schema';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const cache = new Map<string, JSONSchema7>();

export function jsonSchema(dtsPath: string): JSONSchema7 {

    let schema = cache.get(dtsPath);
    if (schema) { return schema; }

    const dtsFullPath = join(__dirname, '../../../../../', dtsPath);
    // check if path exists
    if (!existsSync(dtsFullPath)) {
        throw new Error(`dtsPath does not exist: ${dtsPath}`);
    }


    const tsConfigFullPath = join(__dirname, '../../../../', 'tsconfig.json');

    const config: Config = {
        path: dtsFullPath,
        tsconfig: tsConfigFullPath,
        type: 'Model',
        topRef: false,
        jsDoc: 'none',
        expose: 'none',
    };

    console.log(`Generating JSON Schema for ${dtsPath}`);
    schema = tsj.createGenerator(config).createSchema();
    cache.set(dtsPath, schema);
    return schema;
}