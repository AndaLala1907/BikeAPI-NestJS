import { Request } from 'express';
import { User } from '../../users/schemas/user.schema';
// costum express request interface including authenticated user object
export interface RequestWithUser extends Request {
  user: User & { _id: string }; //user object with Mongo ID
}
