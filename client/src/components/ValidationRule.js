const namePattern = '^[A-ZÁÉÚŐÓÜÖÍ][A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí.\\s-]*$';
const nameValidationRule = {
    required: true,
    minLength: 2,
    maxLength: 32,
    pattern: namePattern
};
const addressPattern = '^[0-9]{4} [A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí0-9.,/\\s-]*$';
const mobilePattern = '[0-9]{2}/[0-9]{2}-[0-9]{2}-[0-9]{3}';

const validationError = (input) => {
    if (input.validity.valid) {
        return null;
    } else if (input.validity.valueMissing) {
        return 'Value is required!';
    } else if (input.validity.typeMismatch) {
        return 'Enter a valid input type!';
    } else if (input.validity.patternMismatch) {
        return 'Invalid pattern!';
    } else if (input.validity.tooLong) {
        return 'Too long input!'; // You will never get this error msg
    } else if (input.validity.tooShort) {
        return 'Too short input!';
    } else if (input.validity.rangeUnderflow) {
        return 'Too low number!';
    } else if (input.validity.rangeOverflow) {
        return 'Too big number!';
    } else if (input.validity.badInput) {
        return 'Please enter a number!';
    }
};

export {
    nameValidationRule,
    addressPattern,
    mobilePattern,
    validationError
};
