// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBxAE8PZKJaXqAiN2VILINzb5vdsaa4xHU",
    authDomain: "day26-38142.firebaseapp.com",
    databaseURL: "https://day26-38142.firebaseio.com",
    projectId: "day26-38142",
    storageBucket: "day26-38142.appspot.com",
    messagingSenderId: "342114766842"
  },
  uploadUrl: "http://localhost:3000/api/upload"
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
