import { RouteOptions } from 'fastify';
import { Id, Thing } from '@krakerxyz/template-core';
import { jsonSchema } from '@krakerxyz/json-schema-transformer';

type Params = { thingId: Id }

export const getById: RouteOptions = {
    method: 'GET',
    url: '/api/things/:thingId',
    schema: {
        querystring: jsonSchema<Params>(),
        response: {
            200: jsonSchema<Thing>()
        }
    },
    handler: async (req, res) => {
        const params = req.params as Params;

        const db = req.services.thingDb;
        const thing = await db.byId(params.thingId);
        if (!thing) {
            await res.status(404).send({ error: 'A thing with that id/version does not exist' });
            return;
        }

        await res.status(200).send(thing);
    }
};