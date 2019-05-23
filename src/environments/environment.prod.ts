export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyBj3BDphESdcyViDHaMvFcct8r0uV9FheA',
    authDomain: 'yoyo-gift.firebaseapp.com',
    databaseURL: 'https://yoyo-gift.firebaseio.com',
    projectId: 'yoyo-gift',
    storageBucket: 'yoyo-gift.appspot.com',
    messagingSenderId: '43755244161',
    appId: '1:43755244161:web:38fe94df76cb764d'
  },
  apiUrl: 'https://yoyo-gift.firebaseio.com',
  apiShowFriendlyMessage: false,
  profileUrl: 'https://yoyo-gifts.firebaseapp.com/me',
  logoutUrl: 'https://yoyo-gifts.firebaseapp.com/signout',
  defaultRoute: '/',
  i18nUrl: '../assets/i18n/',
  dataUrl: '../assets/data/',
  mocksUrl: '../assets/mocks/',
  useMocks: false,
  delayApiResponse: 1000, // Milliseconds
  pageSize: 20,
  apiMocks: [],
  // apiMocks = An array of relative paths (from mocks folder to file - with no extension) - i.e.: ['lookup/premium-vendors']
  defaultLanguage: 'en',
  defaultLocale: 'en-US'
};
