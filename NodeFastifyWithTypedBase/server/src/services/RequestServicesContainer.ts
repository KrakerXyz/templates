
import * as db from '../db';

export class RequestServicesContainer {

    public constructor() { }

    private _thingDb: db.ThingDb | null = null;
    public get thingDb() {
        return this._thingDb ?? (this._thingDb = new db.ThingDb());
    }

}