import { IRentForm, ILoginForm, IRegisterForm } from '../types/types'

export const handleValidationRent = (
  rentForm: IRentForm,
  error: (value: string) => void
) => {
  if (!rentForm.name) {
    error('Wymagane Imię');
  } else if (!/^[A-Za-z]+/.test(rentForm.name.trim())) {
    error('Nieprawidłowe imię');
  } else if (!rentForm.surname) {
    error('Wymagane nazwisko');
  } else if (!/^[A-Za-z]+/.test(rentForm.surname.trim())) {
    error('Nieprawidłowe Nazwisko');
  } else if (!rentForm.email) {
    error('Wymagany email');
  } else if (!/\S+@\S+\.\S+/.test(rentForm.email)) {
    error('Nieprawidłowy email');
  } else if (!rentForm.adress) {
    error('Wymagany adress');
  } else if (rentForm.adress.length < 3) {
    error('Adres jest zbyt krótki');
  } else if (!rentForm.date) {
    error('Wymagana data oddania');
  } else if (!rentForm.age) {
    error('Wymagany wiek');
  } else if (rentForm.age < 16) {
    error('Jesteś zbyt młody');
  } else if (rentForm.age > 80) {
    error('Jesteś zbyt stary na gry');
  } else {
    error('');
  }
};

export const handleValidationRegister = (
  error: (value: string) => void,
  registerForm: IRegisterForm,
  registerError: string,
  confirmation: boolean
) => {
  if (!registerForm.email) {
    error('Wymagany email');
  } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
    error('Hmm… to nie wygląda jak adres e-mail');
  } else if (registerError === 'auth/email-already-in-use') {
    error('Ten email jest już zajęty');
  } else if (!registerForm.password) {
    error('Wymagane hasło');
  } else if (registerForm.password.length < 6) {
    error('Hasło jest zbyt krótkie');
  } else if (!registerForm.confirmPassword) {
    error('Wymagane powtórzenie hasła');
  } else if (registerForm.confirmPassword.length < 6) {
    error('Hasło jest zbyt krótkie');
  } else if (registerForm.confirmPassword !== registerForm.password) {
    error('Hasła do siebie nie pasują');
  } else if (confirmation === false) {
    error('Wymagana zgoda');
  } else {
    error('');
  }
};

export const handleValidationLogin = (
  error: (value: string) => void,
  loginForm: ILoginForm,
  loginError: string
) => {
  if (!loginForm.email) {
    error('Wymagany email');
  } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
    error('Hmm… to nie wygląda jak adres e-mail');
  } else if (loginError === 'auth/internal-error') {
    error('Niepoprawny email lub hasło');
  } else if (loginError === 'auth/user-not-found') {
    error('Nie znaleziono takiego użytkownika');
  } else if (!loginForm.password) {
    error('Wymagane hasło');
  } else if (loginForm.password.length < 6) {
    error('Hasło jest zbyt krótkie');
  } else if (loginError === 'auth/wrong-password') {
    error('Nieprawidłowe hasło');
  } else if (loginError === 'auth/too-many-requests') {
    error('Podjąłes zbyt dużo prób spróbuj ponownie później');
  } else {
    error('');
  }
};
