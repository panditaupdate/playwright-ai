import { test, expect } from '@playwright/test';

test.describe('Login - Laboratorio de Testing', () => {
  test('debe mostrar un mensaje de error al intentar iniciar sesión con credenciales inválidas', async ({ page }) => {
    // 1. Navegar a la página de login
    await page.goto('https://www.laboratoriodetesting.com/auth/login');

    // Verificar que el formulario esté cargado usando el encabezado principal
    await expect(page.getByRole('heading', { name: 'Inicia Sesión', level: 1 })).toBeVisible();

    // 2. Ingresar credenciales inválidas usando locators semánticos
    await page.getByPlaceholder('Ingresa tu email').fill('usuario_invalido@test.com');
    await page.getByPlaceholder('Ingresa tu contraseña').fill('ClaveInvalida123!');

    // 3. Enviar el formulario
    const submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // 4. Verificar el diálogo de error y su contenido basado en el árbol de accesibilidad
    const errorDialog = page.getByRole('dialog');
    await expect(errorDialog).toBeVisible();

    // Verificar el encabezado del diálogo
    await expect(errorDialog.getByRole('heading', { name: 'Error', level: 2 })).toBeVisible();

    // Verificar el mensaje de error exacto
    await expect(
      errorDialog.getByText('No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.')
    ).toBeVisible();

    // Verificar la presencia del botón de confirmación/cierre en el diálogo
    await expect(errorDialog.getByRole('button', { name: 'Volver' })).toBeVisible();
  });
});
