import { UID, UserRoles } from '@workspace/app.workspace';

export interface IIsSignin {
  isSignin: boolean;
}

export interface IUser {
  _id?: UID;
  name: string;
  password: string;
  role?: UserRoles;
  createdAt?: string;
  updatedAt?: string;
}
