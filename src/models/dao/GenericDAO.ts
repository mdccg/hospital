import { Entity } from './../entities/Entity';
import { executeQuery } from '../../config/db';

export class GenericDAO<T extends Entity> {
    private _tableName: string;
    private _entity: new (...args: any[]) => T;

    constructor(entity: new (...args: any[]) => T) {    
        this._entity = entity;
        this._tableName = entity.name.toLowerCase();
    }

    async save(object: T): Promise<T | null> {
        const values = this._getObjectValues(object);
        const sqlQuery = `
            INSERT INTO "${this._tableName}"(${this._getAttributes(object)
                .map((attribute) => `"${attribute.slice(1)}"`)
                .join(', ')}) VALUES (${values.map(
                    (_, index) => `$${index + 1}`
                )}) RETURNING *
        `;

        const result = await executeQuery(sqlQuery, values);
        const instance = new this._entity();
        return result.rowCount == 1 ? Object.assign(instance, result.rows[0]) : null;
    }

    async findAll(): Promise<T[]> {
        const sqlQuery = `SELECT * FROM "${this._tableName}" ORDER BY "id"`;
        const result = await executeQuery(sqlQuery);

        const { rows } = result;
        const objects: T[] = rows.map((row) => {
            const instance = new this._entity();
            Object.assign(instance, row);
            return instance;
        });

        return objects;
    }

    async findById(id: number): Promise<T | null> {
        const sqlQuery = `SELECT * FROM "${this._tableName}" WHERE "id" = ${id}`;
        const result = await executeQuery(sqlQuery);

        const { rows } = result;
        const instance = new this._entity();

        return result.rowCount > 0 ? Object.assign(instance, rows[0]) : null;
    }

    private _getAttributes(object: T): string[] {
        return Object.getOwnPropertyNames(object);
    }

    private _getObjectValues(object: T): any[] {
        const attributes = this._getAttributes(object);
        const values = attributes.map((attribute) => Reflect.get(object, attribute));
        return values;
    }
}