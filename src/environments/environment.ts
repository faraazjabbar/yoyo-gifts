// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
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
    defaultLocale: 'en-US',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
