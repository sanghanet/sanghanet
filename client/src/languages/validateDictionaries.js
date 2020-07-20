const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const getKeyMap = async (path) => {
    const keyMap = [];
    try {
        let languageDict = await readFile(path);
        languageDict = JSON.parse(languageDict);

        let keyMap = [];
        for (const dictionary in languageDict) {
            keyMap.push(dictionary, Object.keys(languageDict[dictionary]));
        }

        return JSON.stringify(keyMap);
    } catch (err) {
        console.log(err);
    }
};

getKeyMap('./hu.json')
    .then((hunDict) => { return hunDict; })
    .then((hunDict) => {
        getKeyMap('./en.json')
            .then((enDict) => {
                console.log(`The dictionaries are ${enDict === hunDict ? 'consistent' : 'inconsistent'}`)
            });
    });