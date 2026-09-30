export const loginData = {
  validUser: {
    email: 'pruebas@gmail.com',
    password: 'pruebas12345*',
  },
  invalidPassword: {
    email: 'pruebas@gmail.com',
    password: 'ClaveInvalida123!',
    expectedMessage: 'No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.',
  },
  invalidEmail: {
    email: 'usuario.no.registrado@test.com',
    password: 'Password123!',
    expectedMessage: 'No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.',
  },
};
