// Intl objects come from the ECMAScript Internationalization API

export function formatMoney(lang, amount) {
    const isNegative = amount < 0;

    // remove the dash ('-') if negative
    const amountToConvert = isNegative ? String(amount).substring(1) : String(amount);

    // lang can only be 'en' or 'hu', just as it is stored in the 'lang' property of the UIcontext
    const IntlLanguage = lang === 'en' ? 'en-US' : 'hu-HU';
    const moneyFormatter = new Intl.NumberFormat(IntlLanguage, {
        style: 'currency',
        currency: 'HUF',
        minimumFractionDigits: 0
    });

    let resultString = moneyFormatter.format(amountToConvert);

    function formatToNegative(positiveFormat) {
        let negativeFormattedResult = '';

        // if the formatted amount doesn't start with a number (eg. HUF 12 345),
        // we need to insert the dash ('-') to the right place in the case of a negative amount.
        // example: 'HUF 12 345' --> HUF -12 345
        if (Number.isNaN(parseInt(positiveFormat[0]))) {
            const indexOfFirstNum = positiveFormat.split('').findIndex((char) => {
                // it's not enough to find the first char that is not NaN,
                // because parseInt(' ') --> 0, so we need to exclude spaces and empty strings
                return !Number.isNaN(parseInt(char)) && char.trim() !== '';
            });

            // insert '-' before the first number
            negativeFormattedResult = positiveFormat.slice(0, indexOfFirstNum) + '-' + positiveFormat.slice(indexOfFirstNum);
        } else {
            negativeFormattedResult = `-${positiveFormat}`;
        }

        return negativeFormattedResult;
    }

    if (isNegative) {
        resultString = formatToNegative(resultString);
    }

    return resultString;
}

export function formatDate(lang, date) {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    const IntlLanguage = lang === 'en' ? 'en-US' : 'hu-HU';
    const dateFormatter = new Intl.DateTimeFormat(IntlLanguage, options);

    return dateFormatter.format(date);
}
