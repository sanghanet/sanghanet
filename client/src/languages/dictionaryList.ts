import hu from './hu.json';
import en from './en.json';

type DictionaryListType = {
    'hu': DictionaryType;
    'en': DictionaryType;
};

export const dictionaryList: DictionaryListType = { hu, en };
