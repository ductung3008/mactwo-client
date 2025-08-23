import { Gender, Role } from '@/constants';

export interface User {
  id: number;
  email: string;
  fullName: string;
  gender: Gender;
  dateOfBirth: string;
  active: boolean;
  roleName: Role;
  createdDate: Date;
  lastModifiedDate: Date;
  //   addresses?: Address[];
}
