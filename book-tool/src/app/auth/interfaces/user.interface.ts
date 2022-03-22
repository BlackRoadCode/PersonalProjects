export type Roles = 'USER';
export type AccountType = 'LEVEL_A' | 'LEVEL_B' | 'LEVEL_C' | 'LEVEL_D' | 'ADMIN' | '';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
  password?: string;
  photoURL?: string;
  role?: Roles;
  startDate?:string,
  endDate?:string,
  editUser?:boolean;
  userTU?:string;
  accountType?: AccountType;
}