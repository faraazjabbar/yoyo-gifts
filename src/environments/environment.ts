// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    appName: 'YoYo Gifts [Gr#1]',
    firebaseConfig: {
        apiKey: 'AIzaSyBj3BDphESdcyViDHaMvFcct8r0uV9FheA',
        authDomain: 'yoyo-gift.firebaseapp.com',
        databaseURL: 'https://yoyo-gift.firebaseio.com',
        projectId: 'yoyo-gift',
        storageBucket: 'yoyo-gift.appspot.com',
        messagingSenderId: '43755244161',
        appId: '1:43755244161:web:38fe94df76cb764d'
    },
    // emailJs-com npm library params
    // One needs to register in the followng website
    // to send the email | https://dashboard.emailjs.com/templates/hYcqUzL51F
    email: {
        serviceId: 'gmail',
        templateId: 'template_Cg1kIF0Z',
        userId : 'user_1Vb8OYU8eOTkZpWt24PNf'
    },
    apiUrl: 'https://yoyo-gift.firebaseapp.com/home',
    apiShowFriendlyMessage: false,
    profileUrl: 'https://yoyo-gifts.firebaseapp.com/me',
    logoutUrl: 'https://yoyo-gifts.firebaseapp.com/signout',
    defaultRoute: '/',
    i18nUrl: '../assets/i18n/',
    mocksUrl: '../assets/mocks/',
    useMocks: false,
    delayApiResponse: 1000, // Milliseconds
    pageSize: 20,
    apiMocks: [],
    // apiMocks = An array of relative paths (from mocks folder to file - with no extension) - i.e.: ['lookup/premium-vendors']
    defaultLanguage: 'en',
    defaultLocale: 'en-US',
    languages: [
        { key: 'en', name: 'English' },
        { key: 'es', name: 'Spanish' }
    ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
