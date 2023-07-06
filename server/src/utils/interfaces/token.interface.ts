import { ObjectId } from 'mongoose';

export default interface IToken {
  id: ObjectId;
  expiresIn: number;
}
