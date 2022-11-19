import { LANGUAGE } from '../actions';
import * as RNLocalize from 'react-native-localize'

const language = (lang = RNLocalize.getLocales()[0].languageCode, action) => {
    switch (action.type) {
        case LANGUAGE:
            return action.lang;
        default:
            return lang;
    }
};

export default language;
