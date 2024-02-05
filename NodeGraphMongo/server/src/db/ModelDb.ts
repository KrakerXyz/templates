
import { Db, type UpdateResult } from './Db.js';
import { jsonSchema } from '../services/jsonSchema.js';
import { type Model } from '../../../core/src/type/model.js';
import { type Writeable, type Id } from '@krakerxyz/utility';

export class ModelDb {
    private static _entity: Db<Model>;

    public constructor() {
        const schema = jsonSchema('core/src/type/model.ts');
        ModelDb._entity ??= new Db<Model>('models', schema);
    }

    public byId(id: Id): Promise<Writeable<Model> | null> {
        return ModelDb._entity.findOneAsync({ id });
    }

    public async add(x: Model): Promise<void> {
        await ModelDb._entity.insertAsync(x);
    }

    public async replace(run: Model): Promise<UpdateResult> {
        const result = await ModelDb._entity.replaceOneAsync(run);
        return result;
    }

    public async upsert(x: Model): Promise<UpdateResult> {
        const result = await ModelDb._entity.replaceOneAsync(x, { upsert: true });
        return result;
    }

    public async deleteById(id: Id): Promise<void> {
        const run = await this.byId(id);
        if (!run) { return; }
        await ModelDb._entity.deleteOneAsync(id);
    }

}