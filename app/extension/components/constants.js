const ENVIRONMENT = typeof $ENVIRONMENT == 'string' ? $ENVIRONMENT : process.env.NODE_ENV;

export default {
  ENVIRONMENT,
  CONTENT: {
    COLORS: { RULER_TICK: 'black', GUIDELINE: '#004c8c' },
    EL_ID: '__PIXELS_ROOT__',
    TAB_OFFSET: {
      x: 0,
      y: 0,
    },
  },
  META: {
    IS_DEVELOPMENT: ENVIRONMENT == 'development',
    IS_PRODUCTION: ENVIRONMENT == 'production',
  },
  VIEWS: {
    AUTHENTICATION: 'AUTHENTICATION',
    DASHBOARD: 'DASHBOARD',
    DEFAULT: 'LANDING',
    FILES: { ROOT: 'FILES', UPLOAD: 'FILES_UPLOAD' },
    GUIDELINES: 'GUIDELINES',
    IMGUR: { ROOT: 'IMGUR', UPLOAD: 'IMGUR_UPLOAD' },
    LANDING: 'LANDING',
  },
};
