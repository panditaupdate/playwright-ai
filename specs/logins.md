# Plan de pruebas de login

## Fuente
- Historia de usuario: `docs/historia-login.md`
- Seed base: `tests/seed.spec.ts`
- URL objetivo: `https://laboratoriodetesting.com/auth/login`

## Objetivo
Validar el flujo de autenticación del usuario registrado en Laboratorio de Testing para garantizar que:
- el login exitoso redirige a una vista autenticada,
- las credenciales incorrectas muestran un mensaje claro,
- los emails inválidos se detectan con validación,
- los campos vacíos bloquean el envío del formulario.

## Alcance
Este plan cubre la autenticación del usuario desde la pantalla de login, incluyendo validaciones del formulario y manejo de errores de credenciales.

## Estrategia de prueba
Se utilizará Playwright para automatizar pruebas end-to-end sobre la página de login, con foco en:
- navegación inicial,
- llenado de formulario,
- validación de campos,
- envío del formulario,
- mensajes de error,
- redirección o permanencia en la pantalla según el resultado.

## Datos de prueba
- Email válido: se debe usar un usuario real registrado en el entorno de pruebas.
- Email inválido: `usuario@dominio` (sin extensión)
- Contraseña incorrecta: cualquier valor distinto a la real
- Campos vacíos: enviar el formulario sin completar ningún campo

## Casos de prueba

### 1. Login exitoso con credenciales válidas
**ID:** LG-01  
**Seed:** `tests/seed.spec.ts`

**Precondición:**
- El usuario registrado existe en el sistema.
- La URL de login está disponible.

**Pasos:**
1. Abrir `https://laboratoriodetesting.com/auth/login`.
2. Verificar que el formulario de login es visible.
3. Completar email válido.
4. Completar contraseña válida.
5. Hacer clic en el botón `Iniciar Sesión`.

**Resultado esperado:**
- El usuario inicia sesión correctamente.
- La aplicación redirige al inicio autenticado o a la pantalla principal del usuario.
- No se muestra un mensaje de error.
- La sesión queda activa.

---

### 2. Login con credenciales incorrectas
**ID:** LG-02

**Precondición:**
- El usuario intenta autenticarse con una contraseña incorrecta.

**Pasos:**
1. Abrir la pantalla de login.
2. Ingresar un email válido.
3. Ingresar una contraseña distinta a la real.
4. Hacer clic en `Iniciar Sesión`.

**Resultado esperado:**
- El sistema rechaza la autenticación.
- Se muestra un mensaje claro de error (por ejemplo: credenciales inválidas).
- El usuario no queda autenticado.
- Se mantiene en la pantalla de login.

---

### 3. Login con email inválido
**ID:** LG-03

**Precondición:**
- El email ingresado no tiene formato válido.

**Pasos:**
1. Abrir la página de login.
2. Ingresar `usuario@dominio` en el campo de email.
3. Ingresar una contraseña válida o cualquiera que permita evaluar la validación del campo.
4. Intentar enviar el formulario.

**Resultado esperado:**
- El sistema valida el formato del email.
- Se muestra una alerta o mensaje de validación en el campo.
- El formulario no se envía.
- No se inicia sesión.

---

### 4. Login con campos vacíos
**ID:** LG-04

**Precondición:**
- El formulario se encuentra vacío.

**Pasos:**
1. Abrir la pantalla de login.
2. Dejar ambos campos vacíos.
3. Hacer clic en `Iniciar Sesión`.

**Resultado esperado:**
- El sistema no envía el formulario.
- Se muestran validaciones de campos requeridos.
- No se autentica al usuario.
- El usuario permanece en la vista de login.

---

### 5. Validación de campo requerido: email vacío
**ID:** LG-05

**Pasos:**
1. Abrir la pantalla de login.
2. Completar solo el campo de contraseña.
3. Dejar el email vacío.
4. Enviar el formulario.

**Resultado esperado:**
- Se bloquea la operación.
- Se muestra validación del campo email obligatorio.
- No se realiza login.

---

### 6. Validación de campo requerido: contraseña vacía
**ID:** LG-06

**Pasos:**
1. Abrir la pantalla de login.
2. Completar solo el email.
3. Dejar la contraseña vacía.
4. Enviar el formulario.

**Resultado esperado:**
- Se bloquea la operación.
- Se muestra validación del campo contraseña obligatorio.
- No se realiza login.

## Criterios de aceptación
- La pantalla de login carga correctamente.
- El formulario valida email y contraseña.
- La autenticación exitosa redirige a una vista autenticada.
- Los errores se muestran de forma clara y visible.
- Los campos vacíos o inválidos impiden el envío del formulario.

## Cobertura esperada
Este plan cubre:
- flujo de login exitoso,
- credenciales inválidas,
- email con formato incorrecto,
- validación de campos obligatorios,
- estado final del usuario autenticado vs no autenticado.

## Nota de automatización
El seed base `tests/seed.spec.ts` puede utilizarse como punto de partida para crear los tests end-to-end de login usando Playwright, estructurando casos por validación y por flujo principal.
