import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'nl',
  lng: 'nl',
  resources: {
    nl: {
      translations: require('./nl/translations.json')
    },
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

i18n.languages = ['nl'];

export default i18n;