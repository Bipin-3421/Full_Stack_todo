import { Request } from 'express';
import User from '../models/user.ts';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    
  }
}
