import { createTables, executeQuery } from './../../config/db';
import { GenericDAO } from './GenericDAO';
import { Beneficiary } from './../entities/Beneficiary';
import { Appointment } from './../entities/Appointment';
import { Exam } from './../entities/Exam';
import { AppointmentSpecialtyType } from './../../types/AppointmentSpecialtyType';
import { ExamSpecialtyType } from './../../types/ExamSpecialtyType';

beforeAll(async () => await createTables());
beforeEach(async () => await executeQuery('TRUNCATE "beneficiary", "appointment", "exam"'));

describe(`Tests over beneficiary's table`, () => {
    it('should save a new beneficiary with valid data', async () => {
        const beneficiary = new Beneficiary('Matheus', `Rua Tadao, R. Amelia Arima, 222 - Vila Ycaraí, Aquidauana - MS, 79200-000`, new Date(2001, 10, 27), '+55 (67) 99999-9999');
        beneficiary.email = 'matheus.gomes@estudante.ifms.edu.br';
        const beneficiaryDAO = new GenericDAO(Beneficiary);
        await beneficiaryDAO.save(beneficiary);
        const beneficiaries = await beneficiaryDAO.findAll();
        const lastBeneficiary = beneficiaries.pop() as Beneficiary;
        expect(beneficiary.name).toBe(lastBeneficiary.name);
        expect(beneficiary.address).toBe(lastBeneficiary.address);
        expect(beneficiary.birthDate).toStrictEqual(lastBeneficiary.birthDate);
        expect(beneficiary.phone).toBe(lastBeneficiary.phone);
        expect(beneficiary.email).toBe(lastBeneficiary.email);
    });

    it('should not save a new beneficiary with a date of birth later than the current day', () => {
        expect(() => {
            const beneficiary = new Beneficiary('Matheus', `Rua Tadao, R. Amelia Arima, 222 - Vila Ycaraí, Aquidauana - MS, 79200-000`, new Date(), '+55 (67) 99999-9999');
        }).toThrowError('Invalid birth date.');
    });
});

describe(`Tests over appointment's table`, () => {
    it('should save a new appointment with valid data', async () => {
        const beneficiary = new Beneficiary('Matheus', `Rua Tadao, R. Amelia Arima, 222 - Vila Ycaraí, Aquidauana - MS, 79200-000`, new Date(2001, 10, 27), '+55 (67) 99999-9999');
        const beneficiaryDAO = new GenericDAO(Beneficiary);
        await beneficiaryDAO.save(beneficiary);
        const beneficiaries = await beneficiaryDAO.findAll();
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        const appointment = new Appointment('biópsia', 'Doctor Sidney', nextWeek, beneficiaries[0].id as number);
        const appointmentDAO = new GenericDAO(Appointment);
        await appointmentDAO.save(appointment);
        const appointments = await appointmentDAO.findAll();
        const lastAppointment = appointments.pop() as Appointment;
        expect(appointment.specialty).toBe(lastAppointment.specialty);
        expect(appointment.doctorName).toBe(lastAppointment.doctorName);
        expect(appointment.dateTime).toStrictEqual(lastAppointment.dateTime);
        expect(appointment.idBeneficiary).toBe(lastAppointment.idBeneficiary);
    });

    it('should not save a new appointment with an invalid specialty', () => {
        expect(() => {
            const appointment = new Appointment('none' as AppointmentSpecialtyType, 'Doctor Sidney', new Date(), NaN);
        }).toThrowError('Invalid specialty.');
    });
    
    it('should not save a new appointment with a date and time earlier than the current instant', () => {
        expect(() => {
            const appointment = new Appointment('biópsia', 'Doctor Sidney', new Date(2001, 10, 27), NaN);
        }).toThrowError('Invalid date time.');
    });
});

describe(`Tests over exam's table`, () => {
    it('should save a new exam with valid data', async () => {
        const beneficiary = new Beneficiary('Matheus', `Rua Tadao, R. Amelia Arima, 222 - Vila Ycaraí, Aquidauana - MS, 79200-000`, new Date(2001, 10, 27), '+55 (67) 99999-9999');
        const beneficiaryDAO = new GenericDAO(Beneficiary);
        await beneficiaryDAO.save(beneficiary);
        const beneficiaries = await beneficiaryDAO.findAll();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const exam = new Exam('radiografia oclusa', 'Doctor Inês', tomorrow, beneficiaries[0].id as number);
        exam.urgencyCharacter = true;
        const examDAO = new GenericDAO(Exam);
        await examDAO.save(exam);
        const exams = await examDAO.findAll();
        const lastExam = exams.pop() as Exam;
        expect(exam.specialty).toBe(lastExam.specialty);
        expect(exam.responsibleProfessional).toBe(lastExam.responsibleProfessional);
        expect(exam.dateTime).toStrictEqual(lastExam.dateTime);
        expect(exam.idBeneficiary).toBe(lastExam.idBeneficiary);
        expect(exam.urgencyCharacter).toBe(lastExam.urgencyCharacter);
    });

    it('should not save a new exam with an invalid speciality', () => {
        expect(() => {
            const exam = new Exam('none' as ExamSpecialtyType, 'Doctor Iury', new Date(), NaN);
        }).toThrowError('Invalid specialty.');
    });
    
    it('should not save a new exam with a date and time earlier than the current time', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
    
        expect(() => {
            const exam = new Exam('radiografia oclusa', 'Doctor Inês', yesterday, NaN);
        }).toThrowError('Invalid date time.');
    });
});