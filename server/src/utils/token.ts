import jwt from 'jsonwebtoken';
import IUser from '@/resources/interfaces/user.interface';
import IToken from './interfaces/token.interface';

export const createToken = (user: IUser): string => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '30d',
  });
};

export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | IToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
      if (err) return reject(err);

      resolve(payload as IToken);
    });
  });
};

export default { createToken, verifyToken };
