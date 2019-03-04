import { Document } from 'mongoose';

export interface User extends Document {
  readonly user: string;
  readonly pwd: string;
  readonly type: string;
  readonly avatar?: string;
  readonly desc?: string;
  readonly position?: string;
  readonly company?: string;
  readonly money?: string;
}