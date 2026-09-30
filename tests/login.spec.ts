import { test, expect } from './fixtures/login-fixture';

test.describe('Login - Laboratorio de Testing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.laboratoriodetesting.com/auth/login');
    await expect(page.getByRole('heading', { name: 'Inicia Sesión', level: 1 })).toBeVisible();
  });

  test('permite iniciar sesión con credenciales válidas', async ({ page, loginData }) => {
    const { email, password } = loginData.validUser;

    await page.getByPlaceholder('Ingresa tu email').fill(email);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(password);

    const loginButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    await expect(page).toHaveTitle(/Laboratorio de Testing/);
    await expect(page.getByRole('heading', { name: 'Déjate llevar por el camino', level: 1 })).toBeVisible();
  });

  test('muestra un error claro cuando la contraseña es inválida', async ({ page, loginData }) => {
    const { email, password, expectedMessage } = loginData.invalidPassword;

    await page.getByPlaceholder('Ingresa tu email').fill(email);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(password);

    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    const errorDialog = page.getByRole('dialog');
    await expect(errorDialog).toBeVisible();
    await expect(errorDialog.getByRole('heading', { name: 'Error', level: 2 })).toBeVisible();
    await expect(errorDialog.getByText(expectedMessage)).toBeVisible();
  });

  test('muestra un error claro cuando el email no está registrado', async ({ page, loginData }) => {
    const { email, password, expectedMessage } = loginData.invalidEmail;

    await page.getByPlaceholder('Ingresa tu email').fill(email);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(password);

    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();

    const errorDialog = page.getByRole('dialog');
    await expect(errorDialog).toBeVisible();
    await expect(errorDialog.getByRole('heading', { name: 'Error', level: 2 })).toBeVisible();
    await expect(errorDialog.getByText(expectedMessage)).toBeVisible();
  });
});
// npx playwright test login.spec.ts --headed
//npx playwright test login.spec.ts --project=chromium --headed