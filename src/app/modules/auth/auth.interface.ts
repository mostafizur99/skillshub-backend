export type IUserCreate = {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUseResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IUserExist = {
  email: string;
  password: string;
  _id: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
