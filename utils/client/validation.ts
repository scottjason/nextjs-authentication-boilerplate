export const isValidEmail = (email: string): boolean => {
  const atSymbol = email.indexOf('@');
  const dotSymbol = email.lastIndexOf('.');
  const spaceSymbol = email.indexOf(' ');

  if (
    atSymbol != -1 &&
    atSymbol != 0 &&
    dotSymbol != -1 &&
    dotSymbol != 0 &&
    dotSymbol > atSymbol + 1 &&
    email.length > dotSymbol + 1 &&
    spaceSymbol == -1
  ) {
    return true;
  } else {
    return false;
  }
};

export const isValidPassword = (password: string): boolean => {
  if (password.length < 8 || password.length > 127) {
    return false;
  }

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  if (
    !uppercaseRegex.test(password) ||
    !lowercaseRegex.test(password) ||
    !numberRegex.test(password)
  ) {
    return false;
  }

  return true;
};
