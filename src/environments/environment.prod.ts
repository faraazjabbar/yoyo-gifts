export const environment = {
    production: true,
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
        templateId: 'yoyo_send_gift_template',
        userId: 'user_uSW3FVSFuXcYR6LDqIlrN'
    },
    apiUrl: 'https://yoyo-gift.firebaseapp.com/home',
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
    languages: [{ key: 'en', name: 'English' }, { key: 'de', name: 'German' }]
};
