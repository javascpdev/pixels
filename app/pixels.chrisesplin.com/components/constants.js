const LOCALFORAGE_PREFIX = 'pixels';

export default {
  COLORS: {
    MDC_THEME_PRIMARY: 'black',
    MDC_THEME_SECONDARY_TEXT: 'white',
    MDC_THEME_SECONDARY: 'steelblue',
    STATE_ACTIVE: 'black',
    STATE_PROCESSING: 'orangered',
    STATE_INACTIVE: 'mediumvioletred',
    STATE_DISABLED: 'gainsboro',
  },
  FIREBASE: {
    SDK: '7.14.4',
    apiKey: 'AIzaSyAMz8y2SRKAa5b0kX5hDrAoc51QrUoJioM',
    appId: '1:1016700612579:web:ebbc0891bedaeb61957ad6',
    authDomain: 'quiver-pixels-2020.firebaseapp.com',
    databaseURL: 'https://quiver-pixels-2020.firebaseio.com',
    measurementId: 'G-BLMVYW8WRM',
    messagingSenderId: '1016700612579',
    projectId: 'quiver-pixels-2020',
    storageBucket: 'quiver-pixels-2020.appspot.com',
  },
  LOCALFORAGE: {
    BASE64_UPLOAD: `${LOCALFORAGE_PREFIX}-base64-upload`,
    FILE_UPLOAD: `${LOCALFORAGE_PREFIX}-file-upload`,
    LOGIN_REDIRECT: `${LOCALFORAGE_PREFIX}-login-redirect`,
    OAUTH2: `${LOCALFORAGE_PREFIX}-oauth2`,
    IMGUR: {
      ALBUMS: `${LOCALFORAGE_PREFIX}-imgur-albums`,
      IMAGES: `${LOCALFORAGE_PREFIX}-imgur-images`,
    },
    USER: {
      OAUTH2: `${LOCALFORAGE_PREFIX}-user-oauth2`,
      UPLOADS: `${LOCALFORAGE_PREFIX}-user-uploads`,
      SELECTED_WORKSPACE: `${LOCALFORAGE_PREFIX}-selected-workspace`,
      WORKSPACES: `${LOCALFORAGE_PREFIX}-workspaces`,
    },
  },
  META: {
    TITLES: {
      DEFAULT: 'Pixels',
    },
    DESCRIPTION: 'Pixels is a collection of tools for your web development workflow.',
    THEME_COLOR: 'black',
    ICON_URLS: {
      LARGE: '/images/icons/icon-512.png',
    },
  },
  OAUTH2: {
    IMGUR: {
      SERVICE_ID: 'imgur',
      EXPIRED_MILLIS: 1000 * 60 * 60 * 24 * 1,
    },
  },
  ROUTES: {
    ROOT: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    META: {
      REDIRECT: '/meta/redirect',
      SIGN_OUT: '/meta/sign-out',
    },
    TOOLKIT: {
      IMGUR: {
        ROOT: '/toolkit/imgur',
        AUTHORIZE: ({ clientId, uid }) =>
          `https://api.imgur.com/oauth2/authorize?client_id=${clientId}&response_type=token&state=${uid}`,
        ALBUM: 'https://api.imgur.com/3/album',
        ALBUMS: ({ username, page }) =>
          `https://api.imgur.com/3/account/${username}/albums/${page}`,
        IMAGE: 'https://api.imgur.com/3/image',
        IMAGES: ({ username, page }) =>
          `https://api.imgur.com/3/account/${username}/images/${page}`,
        UPLOAD: '/toolkit/imgur/upload',
      },
      FILES: {
        ROOT: '/toolkit/files',
        UPLOAD: '/toolkit/files/upload',
      },
      GUIDELINES: {
        ROOT: '/toolkit/guidelines',
      },
    },
  },
};
