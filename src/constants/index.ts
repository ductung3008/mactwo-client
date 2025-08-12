export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export const Role = {
  Admin: 'ROLE_ADMIN',
  User: 'ROLE_USER',
  Guest: 'ROLE_GUEST',
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export type Role = (typeof Role)[keyof typeof Role];
