const namePattern = '^[A-ZÁÉÚŐÓÜÖÍ][A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí.\\s-]*$';
const nameValidationRule = {
    required: true,
    minLength: 2,
    maxLength: 32,
    pattern: namePattern
};
const addressPattern = '^[0-9]{4} [A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí0-9.,/\\s-]*$';
const mobilePattern = '[0-9]{2}/[0-9]{2}-[0-9]{2}-[0-9]{3}';

export {
    nameValidationRule,
    addressPattern,
    mobilePattern
};
