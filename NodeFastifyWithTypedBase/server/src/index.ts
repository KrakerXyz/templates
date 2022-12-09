
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { configureDb } from '@krakerxyz/typed-base';
import Ajv from 'ajv';
import fastify from 'fastify';
import { apiRoutes } from './rest';
import { EnvKey, getRequiredConfig } from './services';

console.log('Configuring db');
configureDb({
    dbName: 'template-node-fastify-typed-base',
    uri: getRequiredConfig(EnvKey.DbConnectionString)
});

console.log('Initializing Fastify');

const server = fastify({
    logger: {
        level: 'trace',
        transport: process.env.NODE_ENV === 'development' ? {
            target: 'pino-pretty',
            options: {
                translateTime: 'SYS:h:MM:ss TT Z o',
                colorize: true,
                ignore: 'pid,hostname'
            }
        } : undefined
    }
});

const schemaCompilers: Record<string, Ajv> = {
    'body': new Ajv({
        removeAdditional: false,
        coerceTypes: false,
        allErrors: true,
        strictTuples: false // without this we get warning about the json schema generated from [string, ...string[]]
    }),
    'params': new Ajv({
        removeAdditional: false,
        coerceTypes: true,
        allErrors: true
    }),
    'querystring': new Ajv({
        removeAdditional: false,
        coerceTypes: true,
        allErrors: true,
    })
};

server.setValidatorCompiler(req => {
    if (!req.httpPart) {
        throw new Error('Missing httpPart');
    }
    const compiler = schemaCompilers[req.httpPart];
    if (!compiler) {
        throw new Error(`Missing compiler for ${req.httpPart}`);
    }

    return compiler.compile(req.schema);
});

apiRoutes.forEach(r => server.route(r));


server.ready(() => {
    server.log.info('Fastify ready');
});

const start = async () => {
    try {
        await server.listen({ port: 3001, host: '0.0.0.0' });
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();