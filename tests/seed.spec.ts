import { test, expect } from '@playwright/test';

test.describe('Login - Laboratorio de Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.laboratoriodetesting.com/auth/login');
    await expect(page.getByRole('heading', { name: 'Inicia Sesión', level: 1 })).toBeVisible();
  });

  test('LG-01: inicia sesión con credenciales válidas', async ({ page }) => {
    await page.getByPlaceholder('Ingresa tu email').fill('pruebas@gmail.com');
    await page.getByPlaceholder('Ingresa tu contraseña').fill('pruebas12345*');

    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    await expect(page).toHaveURL(/\/auth\//);
    await expect(page.getByText('Déjate llevar por el camino')).toBeVisible();
  });

  test('LG-02: muestra error claro cuando la contraseña es inválida', async ({ page }) => {
    await page.getByPlaceholder('Ingresa tu email').fill('pruebas@gmail.com');
    await page.getByPlaceholder('Ingresa tu contraseña').fill('ClaveInvalida123!');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    const errorDialog = page.getByRole('dialog');
    await expect(errorDialog).toBeVisible();
    await expect(errorDialog.getByRole('heading', { name: 'Error', level: 2 })).toBeVisible();
    await expect(errorDialog.getByText('No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.')).toBeVisible();
  });

  test('LG-03: valida email con formato inválido', async ({ page }) => {
    const emailInput = page.getByPlaceholder('Ingresa tu email');
    await emailInput.fill('usuario@dominio');
    await page.getByPlaceholder('Ingresa tu contraseña').fill('pruebas12345*');

    await expect(emailInput).toHaveValue('usuario@dominio');
    await expect(page.getByText('Email inválido')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('LG-04: bloquea el envío cuando ambos campos están vacíos', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    const emailInput = page.getByPlaceholder('Ingresa tu email');
    const passwordInput = page.getByPlaceholder('Ingresa tu contraseña');

    await expect(submitButton).toBeDisabled();
    await expect(emailInput).toHaveValue('');
    await expect(passwordInput).toHaveValue('');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test.fixme('LG-05: el formulario actual no bloquea el envío con email vacío', async ({ page }) => {
    // El browser valida el campo email vacío como un valor HTML5 válido si no tiene `required`.
    // La aplicación actual permite continuar y no muestra una validación consistente para este caso.
    await page.getByPlaceholder('Ingresa tu contraseña').fill('pruebas12345*');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    const errorDialog = page.getByRole('dialog');
    await expect(errorDialog).toBeVisible();
    await expect(errorDialog.getByRole('heading', { name: 'Error', level: 2 })).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('LG-06: bloquea el envío cuando la contraseña está vacía', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    const passwordInput = page.getByPlaceholder('Ingresa tu contraseña');

    await page.getByPlaceholder('Ingresa tu email').fill('pruebas@gmail.com');

    await expect(passwordInput).toHaveValue('');
    await expect(submitButton).toBeDisabled();
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
//npx playwright test seed.spec.ts --project=chromium --headed


