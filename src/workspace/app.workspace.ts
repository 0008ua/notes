// import {UserDataType} from '../auth/dto/userData.dto';

export class SignupDto {
  name!: string;
  password!: string;
}

export class SigninDto extends SignupDto {}

// export class UserDataDto extends UserDataType {}

export enum UserRoles {
  Member = 'member',
  Guest = 'guest',
  Admin = 'admin',
}

export type UID = string;
export type JwtToken = string;

export const errors = [
  'unknownError',
  'authenticationError',
  'applicationError',
] as const;

export type ErrorTypes = (typeof errors)[number];

export interface IErrorType {
  errorType: ErrorTypes;
}
