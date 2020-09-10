interface signinResponse {
  token: string;
  user: Object;
}

interface signupResponse {
  success: string;
}

export const authSignin = () => {
  return new Promise<signinResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        token: '392kdasdpo2321312',
        user: {
          email: 'kelvin.arnolf@guup.com',
        },
      });
    }, 2000);
  });
};

export const authSignup = () => {
  return new Promise<signupResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        success: 'Welcome to guup',
      });
    }, 2000);
  });
};
