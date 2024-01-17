import { InjectionToken } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const JWT_DECODE = new InjectionToken<JwtDecode>('JWT_DECODE');

export const JwtDecodeFactory = () => {
  return jwtDecode;
};

export type JwtDecode = typeof jwtDecode;

