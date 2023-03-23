export interface IExtendedRequestWithUser extends Request {
  user: IUserIdAndEmail;
}

export interface IUserIdAndEmail extends Request {
  id: string;
  email: string;
}
