
import 'fastify';
import { RequestServicesContainer } from './services';

declare module 'fastify' {
    interface FastifyRequest {
        services: RequestServicesContainer
    }
}