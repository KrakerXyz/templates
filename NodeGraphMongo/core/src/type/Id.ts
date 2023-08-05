
export type Id = `${string}-${string}-${string}-${string}-${string}`;
export type IdRev = `${Id}/${number}`;
export type IdRevLatest = `${Id}/latest`;

export function splitIdRev(idRev: IdRev | IdRevLatest): [Id, number | 'latest'] {
    const split = idRev.split('/');
    if (split.length !== 2) { throw new Error('Invalid IdRev'); }
    return split as [Id, number | 'latest'];
}