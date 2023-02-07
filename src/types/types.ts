
import { Request } from 'express';
import mongoose from 'mongoose';
// import { JwtPayload } from 'jsonwebtoken';

export interface RequestCustom extends Request {
  user?: {
    _id: mongoose.Schema.Types.ObjectId;

  };
}
