import IUser from './user.interface';

export default interface IAuthUser {
  user: IUser;
  token: string;
}
