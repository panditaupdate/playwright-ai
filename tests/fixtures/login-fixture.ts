import { test as base, expect as baseExpect } from '@playwright/test';
import { loginData } from './login-data';

type LoginData = typeof loginData;

export const test = base.extend<{
  loginData: LoginData;
}>({
  loginData: async ({}, use) => {
    await use(loginData);
  },
});

export const expect = baseExpect;
