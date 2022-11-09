export const checkValidityBirthDate = (birthDate: Date): boolean => {
    const today = new Date();
    return birthDate < today;
}

export const checkValidityDateTime = (dateTime: Date): boolean => {
    const now = new Date();
    return dateTime >= now;
}