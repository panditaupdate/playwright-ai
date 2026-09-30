# Plan de pruebas - Login Laboratorio de Testing

## Application Overview

Plan de pruebas para el flujo de login del sitio Laboratorio de Testing. Cubre el caso principal de autenticación con email y contraseña válidos, así como la validación de credenciales inválidas con mensaje de error claro y experiencia reutilizable para reintentos.

## Test Scenarios

### 1. Login - Autenticación de usuarios registrados

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login exitoso con credenciales válidas

**File:** `tests/login/login-success.spec.ts`

**Steps:**
  1. Abrir la página de inicio de sesión en https://www.laboratoriodetesting.com/auth/login desde un estado inicial limpio.
    - expect: La página muestra el formulario con los campos Email, Contraseña y el botón Iniciar Sesión.
  2. Ingresar el email válido: pruebas@gmail.com y la contraseña válida: pruebas12345*.
    - expect: Los campos se rellenan correctamente.
    - expect: El formulario queda listo para enviar la solicitud de login.
  3. Hacer clic en el botón Iniciar Sesión.
    - expect: El sistema autentica al usuario correctamente.
    - expect: La aplicación redirige al usuario a la home o a una vista autenticada.
    - expect: No se muestra ningún mensaje de error.
  4. Verificar el estado final de la sesión.
    - expect: El usuario queda autenticado.
    - expect: La navegación o la interfaz refleja una sesión activa.
    - expect: La URL o elementos de la aplicación confirman que ya no está en la pantalla de login.

#### 1.2. Login falla con contraseña inválida

**File:** `tests/login/login-invalid-password.spec.ts`

**Steps:**
  1. Abrir la página de inicio de sesión desde un estado limpio.
    - expect: El formulario de login está visible y listo para ingresar datos.
  2. Ingresar un email válido: pruebas@gmail.com y una contraseña incorrecta, por ejemplo: pruebas1234.
    - expect: Los campos reciben los valores sin errores de formato.
    - expect: El usuario puede intentar enviar el formulario.
  3. Hacer clic en Iniciar Sesión.
    - expect: El sistema intenta autenticar las credenciales.
    - expect: Se muestra un mensaje de error claro y visible indicando que las credenciales son inválidas o incorrectas.
  4. Comprobar la respuesta del sistema.
    - expect: La página permanece en la vista de login.
    - expect: El usuario no queda autenticado.
    - expect: El usuario puede corregir sus datos y volver a intentar.

#### 1.3. Login falla con email no registrado

**File:** `tests/login/login-email-not-found.spec.ts`

**Steps:**
  1. Abrir la página de login desde un estado inicial limpio.
    - expect: El formulario de inicio de sesión está disponible.
  2. Ingresar un email no registrado, por ejemplo: usuario@noexiste.com, y una contraseña válida con formato correcto.
    - expect: Los datos se ingresan en los campos del formulario sin errores.
    - expect: El usuario puede confirmar el intento de login.
  3. Enviar la solicitud haciendo clic en Iniciar Sesión.
    - expect: El sistema valida la combinación de credenciales.
    - expect: Se muestra un mensaje de error claro indicando que el email o la contraseña son incorrectos.
    - expect: El usuario no queda autenticado.
  4. Validar la experiencia tras el error.
    - expect: La pantalla de login permanece activa.
    - expect: No se redirige a una vista privada.
    - expect: El usuario puede corregir los datos e intentar nuevamente.

#### 1.4. Validación de campos vacíos y prevención de envío

**File:** `tests/login/login-empty-fields.spec.ts`

**Steps:**
  1. Abrir la página de login desde un estado fresco.
    - expect: La página muestra el formulario con los campos Email y Contraseña vacíos.
    - expect: El botón Iniciar Sesión está visible y no debe permitir la autenticación con datos incompletos.
  2. Intentar enviar el formulario dejando ambos campos vacíos.
    - expect: El sistema no inicia sesión.
    - expect: Se bloquea el envío y/o se muestra validación de campo requerido.
    - expect: No se visualiza un inicio de sesión exitoso.
  3. Repetir la prueba dejando solo el email o solo la contraseña sin completar.
    - expect: El formulario no procesa la solicitud con información incompleta.
    - expect: Se mantiene la validación de campos obligatorios.
    - expect: El usuario no queda autenticado.
  4. Completar ambos campos con información válida y continuar con el flujo normal.
    - expect: La autenticación solo se ejecuta cuando los campos cumplen la validación requerida.
    - expect: El flujo principal continúa sin errores de formulario.
