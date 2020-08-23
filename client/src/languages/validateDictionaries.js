const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const getKeyMap = async (path) => {
    try {
        let languageDict = await readFile(path);
        languageDict = JSON.parse(languageDict);

        const map = [];
        for (const dictionary in languageDict) {
            map.push(dictionary, Object.keys(languageDict[dictionary]));
        }

        return JSON.stringify(map);
    } catch (err) {
        console.log(err);
    }
};

const matchKeyMaps = () => {
    const keyMaps = [];
    const dictionariesToGet = ['./en.json', './hu.json'];

    (function assembleKeyMaps () {
        if (dictionariesToGet.length) { // --------- run recursive function
            getKeyMap(dictionariesToGet[0])
                .then((keymap) => {
                    keyMaps.push(keymap);
                    dictionariesToGet.shift();
                    assembleKeyMaps(dictionariesToGet);
                })
                .catch((err) => {
                    throw new Error(`There was a problem with getting the keymap of ${dictionariesToGet[0]}`);
                });
        } else { // -------------------------------- check for consistency
            let consistent = true;
            for (let i = 1; i < keyMaps.length; i++) {
                if (keyMaps[i] !== keyMaps[0]) {
                    consistent = false;
                    break;
                }
            }

            console.log(`The dictionaries are ${consistent ? 'consistent' : 'INCONSISTENT. Please fix it.'}`);
        }
    })();
};

matchKeyMaps();
