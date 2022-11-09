import { Entity } from './Entity';
import { ExamSpecialtyType } from './../../types/ExamSpecialtyType';
import { checkValidityDateTime } from '../../utils/date_utils';

export class Exam extends Entity {
    private _specialty: ExamSpecialtyType = 'biópsia';
    private _responsibleProfessional: string = '';
    private _dateTime: Date = new Date();
    private _idBeneficiary: number = NaN;
    private _urgencyCharacter?: boolean | undefined = false;

    constructor(specialty: ExamSpecialtyType, responsibleProfessional: string, dateTime: Date, idBeneficiary: number) {
        super();
        this.specialty = specialty;
        this.responsibleProfessional = responsibleProfessional;
        this.dateTime = dateTime;
        this.idBeneficiary = idBeneficiary;
    }

    public get specialty(): ExamSpecialtyType {
        return this._specialty;
    }
    
    public set specialty(value: ExamSpecialtyType) {
        if (value !== undefined && !['biópsia', 'ultrassom', 'refração', 'radiografia oclusa'].includes(value)) {
            throw new Error('Invalid specialty.');    
        }

        this._specialty = value;
    }

    public get responsibleProfessional(): string {
        return this._responsibleProfessional;
    }
    
    public set responsibleProfessional(value: string) {
        this._responsibleProfessional = value;
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

    public get urgencyCharacter(): boolean | undefined {
        return this._urgencyCharacter;
    }
    
    public set urgencyCharacter(value: boolean | undefined) {
        this._urgencyCharacter = value;
    }
}