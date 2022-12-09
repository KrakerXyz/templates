import { Filter, TypedEntity } from '@krakerxyz/typed-base';
import { Thing, Id, Writeable } from '@krakerxyz/template-core';

export class ThingDb {

    private readonly entity = new TypedEntity<Thing>();

    public all(): AsyncGenerator<Thing> {
        return this.entity.find({});
    }

    public byId(id: Id): Promise<Thing | null> {
        const filter: Filter<Writeable<Thing>> = { id };

        const cur = this.entity.findOneAsync(filter);

        return cur;
    }

    public add(thing: Thing): Promise<void> {
        return this.entity.insertAsync(thing);
    }

    public replace(thing: Thing): Promise<void> {
        return this.entity.replaceOneAsync(thing);
    }

    public deleteById(thingId: Id): Promise<void> {
        return this.entity.deleteAsync({ id: thingId });
    }

}