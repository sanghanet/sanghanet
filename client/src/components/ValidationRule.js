const namePattern = '^[A-ZÁÉÚŐÓÜÖÍ][A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí.\\s-]*$';
const nameValidationRule = {
    required: true,
    minLength: 2,
    maxLength: 32,
    pattern: namePattern
};
const addressPattern = '^[0-9]{4} [A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí0-9.,/\\s-]*$';
const mobilePattern = '[0-9]{2}/[0-9]{2}-[0-9]{2}-[0-9]{3}';

// emailPattern does not include '@gmail.com'
// eslint-disable-next-line no-control-regex
const emailPattern = String(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")/);
const emailValidationRule = {
    required: true,
    minLength: 3,
    pattern: emailPattern.substring(1, emailPattern.length-1)
}

const validationError = (input) => {
    if (input.validity.valid) {
        return '';
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
    emailValidationRule,
    addressPattern,
    mobilePattern,
    validationError,
};
