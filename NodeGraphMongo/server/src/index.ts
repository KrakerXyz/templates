import 'dotenv/config.js';
import mercurius from 'mercurius';
import { GraphQLInt, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { configureDbLocal } from './db/Db.js';
import { ModelDb } from './db/ModelDb.js';
import { newId } from '@krakerxyz/utility';
import fastify from 'fastify';

console.log('Configuring db');
configureDbLocal({
    dbName: 'template-node-graph-mongo',
    uri: process.env.MONGO_URI ?? '',
});

const modelDb = new ModelDb();
modelDb.add({ id: newId() });

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



const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        add: {
            type: GraphQLInt,
            args: {
                x: { type: GraphQLInt },
                y: { type: GraphQLInt }
            },
            resolve: (_: any, { x, y }: any) => x + y
        }
    }
});

// const mutation = new GraphQLObjectType({
//     name: 'Mutations',
//     fields: {
//         add: {
//             type: GraphQLInt,
//             args: {
//                 x: { type: GraphQLInt },
//                 y: { type: GraphQLInt }
//             },
//             resolve: (_: any, { x, y }: any) => x + y
//         }
//     }
// });

const schema = new GraphQLSchema({
    query,
    //mutation
});

server.register(mercurius.default, {
    schema,
    graphiql: true
});

server.get('/', async function (_req, reply) {
    const query = '{ add(x: 2, y: 2) }';
    return reply.graphql(query);
});

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