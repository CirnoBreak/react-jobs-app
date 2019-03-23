import { createParamDecorator } from '@nestjs/common';
import { SECRET } from '../config';
import * as jwt from 'jsonwebtoken';

// 把header带过来的jwt token进行decode
export const User = createParamDecorator((data, req) => {
  // 由于header的格式为 Bearer token，所以token在split后的数组index为1的位置
  const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
  if (token && token[1]) {
    const decoded: any = jwt.verify(token[1], SECRET);
    return decoded._id;
  }
});