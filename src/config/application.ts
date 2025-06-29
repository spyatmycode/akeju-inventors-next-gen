const base: string = '/';

export default {
port:process.env.PORT,

  url: {
    base,
  },
  timers: {
    userTokenExpiry: '1h',
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || 'test',
  },
  authorizationIgnorePath: [
    "/"
   ],
};
