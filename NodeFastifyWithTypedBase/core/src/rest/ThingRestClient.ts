import { Id, RestClient, Thing } from '.';

export class DeviceRestClient {

    constructor(private readonly restClient: RestClient) { }

    /** Get a Thing by it's id */
    public byId(thingId: Id): Promise<Thing> {
        return this.restClient.get(`/api/things/${thingId}`);
    }
}
