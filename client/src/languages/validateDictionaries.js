const fs = require('fs');

/*
If we use 'require()' to get the JSON, the file content will cache and
the variable will still refer to the cached version instead of the current,
potentially updated version.
*/
const readDictionary = (path) => {
    fs.readFile(require.resolve(path), (err, data) => {
        if (err) {
            return err;
        } else {
            return JSON.parse(data);
        }
    });
};

const hu = readDictionary('./hu.json');
const en = readDictionary('./hu.json');

const getKeyMap = () => {
    const keyMap = [];
    for (const dictionary in hu) {
        keyMap.push(dictionary, Object.keys(hu[dictionary]));
    }

    return JSON.stringify(keyMap);
};

console.log(en);

if (getKeyMap(hu) === getKeyMap(en)) {
    console.log('The dictionaries are consistent');
} else {
    console.log('The dictionaries are inconsistent.');
}
