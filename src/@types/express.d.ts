import { Request } from 'express';

declare module 'express' {
  interface Request extends Express.Request {
    session: {
      loggedIn: boolean;
      isAdmin: boolean;
      user: any;
    } & Express.Session;
  }
}
