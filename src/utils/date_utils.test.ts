import { checkValidityBirthDate, checkValidityDateTime } from './date_utils';

describe(`Tests over the birth date's validator`, () => {
    it('should accept any date except today or earlier', () => {
        const birthDate = new Date(2001, 10, 27);
        const isBirthDateValid = checkValidityBirthDate(birthDate);
        expect(isBirthDateValid).toBe(true);
    });
    
    it('should decline when the given date is today or earlier', () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const isBirthDateValid = checkValidityBirthDate(today) || checkValidityBirthDate(tomorrow);
        expect(isBirthDateValid).toBe(false);
    });
});

describe(`Tests over the date time's validator`, () => {
    it('should accept any date time except old dates', () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const isDateTimeValid = checkValidityDateTime(today) && checkValidityDateTime(tomorrow);
        expect(isDateTimeValid).toBe(true);
    });
    
    it('should decline when the given date is later', () => {
        const birthDate = new Date(2001, 10, 27);
        const isDateTimeValid = checkValidityDateTime(birthDate);
        expect(isDateTimeValid).toBe(false);
    });
});