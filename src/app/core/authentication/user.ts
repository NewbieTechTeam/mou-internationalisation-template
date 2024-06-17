import { User } from './interface';

export const admin: User = {
  id: 1,
  name: 'Test User',
  email: 'mmou9@tut.com',
  avatar: './assets/images/tut.png',
};

export const guest: User = {
  name: 'unknown',
  email: 'unknown',
  avatar: './assets/images/tut.png',
};
