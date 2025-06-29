
import { Request } from 'express';
import jwt from "jsonwebtoken";
import application from '../config/application';
import {  ITokenExpiryTime } from '../types/IToken';




const extractTokenFromRequest = (req: Request) => {

  if (req.headers.authorization) {

    const token = req.headers.authorization.split(' ')[0];
    
    if (token.length > 0) {
      return token;
    }
  }
  return null;
};


const generateToken = async (key: string, value: string) => {
  const data = { [key]: value };

  const signed = jwt.sign(data, application.env.authSecret as string, {
    expiresIn: application.timers.userTokenExpiry as ITokenExpiryTime
  });

  return signed;
};


const verifyToken = (token: string):any =>{

  if(token.indexOf("Bearer") === -1) return null

  return token
    
}

  



export {
  extractTokenFromRequest,
  verifyToken,
  generateToken
};
