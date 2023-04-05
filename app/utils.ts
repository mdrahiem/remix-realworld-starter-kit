export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function validatePassword(password: unknown): password is string {
  const regex = /^(?=.*[a-z])(?=.*\d){4,30}$/
  // return typeof password === "string" && password.length > 3 && regex.test(password);
  return typeof password === "string" && password.length > 3;
}