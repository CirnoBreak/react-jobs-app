import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly pwd: string;
  readonly type: string;
  readonly salt?: string;
  readonly avatar?: string;
  readonly desc?: string;
  readonly position?: string;
  readonly company?: string;
  readonly money?: string;
}