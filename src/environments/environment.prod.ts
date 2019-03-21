export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyAQWBZQlqaR8_G1W2L2iIHXYjzJvDwdUxE",
    authDomain: "jamboxproduction-327c8.firebaseapp.com",
    databaseURL: "https://jamboxproduction-327c8.firebaseio.com",
    projectId: "jamboxproduction-327c8",
    storageBucket: "jamboxproduction-327c8.appspot.com",
    messagingSenderId: "93284455017"
  },
  spotifyConfig: {
    clientId: "6e9fbfb6b8994a4ab553758dc5e38b13",
    redirectUrl: "jamboxapp://callback",
    scopes: ["streaming", "playlist-read-private", "user-read-email", "user-read-private", "user-read-currently-playing", "user-read-birthdate"],
    tokenExchangeUrl: "https://jambox-app.herokuapp.com/exchange",
    tokenRefreshUrl: "https://jambox-app.herokuapp.com/refresh"
  },
  spotifyClientID: {
    clientId: "6e9fbfb6b8994a4ab553758dc5e38b13"
  },
  youTubeAPIKey: 'AIzaSyBwTqh7G-xV4WWZg_-QFB04K4vCPjLXzAY'
};
