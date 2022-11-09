import { Entity } from './Entity';
import { AppointmentSpecialtyType } from './../../types/AppointmentSpecialtyType';
import { checkValidityDateTime } from './../../utils/date_utils';

export class Appointment extends Entity {
    private _specialty: AppointmentSpecialtyType = 'biópsia';
    private _doctorName: string = '';
    private _dateTime: Date = new Date();
    private _idBeneficiary: number = NaN;

    constructor(specialty: AppointmentSpecialtyType, doctorName: string, dateTime: Date, idBeneficiary: number) {
        super();
        this.specialty = specialty;
        this.doctorName = doctorName;
        this.dateTime = dateTime;
        this.idBeneficiary = idBeneficiary;
    }

    public get specialty(): AppointmentSpecialtyType {
        return this._specialty;
    }

    public set specialty(value: AppointmentSpecialtyType) {
        if (value !== undefined && !['biópsia', 'ultrassom', 'refração', 'radiografia oclusal'].includes(value)) {
            throw new Error('Invalid specialty.');
        }

        this._specialty = value;
    }

    public get doctorName(): string {
        return this._doctorName;
    }

    public set doctorName(value: string) {
        this._doctorName = value;
    }

    public get dateTime(): Date {
        return this._dateTime;
    }
    
    public set dateTime(value: Date) {
        if (value !== undefined && !checkValidityDateTime(value)) {
            throw new Error('Invalid date time.');
        }

        this._dateTime = value;
    }

    public get idBeneficiary(): number {
        return this._idBeneficiary;
    }
    
    public set idBeneficiary(value: number) {
        this._idBeneficiary = value;
    }
}