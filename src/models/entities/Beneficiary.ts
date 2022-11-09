import { Entity } from './Entity';
import { checkValidityBirthDate } from './../../utils/date_utils';

export class Beneficiary extends Entity {
    private _name: string = '';
    private _address: string = '';
    private _birthDate: Date = new Date();
    private _email?: string | undefined;
    private _phone: string = '';

    constructor(name: string, address: string, birthDate: Date, phone: string) {
        super();
        this.name = name;
        this.address = address;
        this.birthDate = birthDate;
        this.phone = phone;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get address(): string {
        return this._address;
    }

    public set address(value: string) {
        this._address = value;
    }

    public get birthDate(): Date {
        return this._birthDate;
    }

    public set birthDate(value: Date) {
        if (value !== undefined && !checkValidityBirthDate(value)) {
            throw new Error('Invalid birth date.');
        }

        this._birthDate = value;
    }

    public get email(): string | undefined {
        return this._email;
    }

    public set email(value: string | undefined) {
        this._email = value;
    }

    public get phone(): string {
        return this._phone;
    }

    public set phone(value: string) {
        this._phone = value;
    }
}