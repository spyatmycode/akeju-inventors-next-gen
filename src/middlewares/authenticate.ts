
import express from 'express';
import httpStatusCodes from 'http-status-codes';
import application from '../config/application';

import { extractTokenFromRequest, verifyToken } from '../utilities/apiUtilities';
import ApiResponse from '../utilities/apiResponse';




/**
 * Route authentication middleware to verify a token
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */

export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (
    application.authorizationIgnorePath.indexOf(
      `${req.originalUrl}`,
    ) === -1
  ) {

    const authorizationHeader = extractTokenFromRequest(
      req,
     
    );

    if (authorizationHeader) {
      const decoded = await verifyToken(authorizationHeader);


      if (decoded) {
        next();
        return;

      } else {
        ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED, `Invalid missing Bearer Token`);
        return;
      }
    } else {
      ApiResponse.error(res, httpStatusCodes.FORBIDDEN, `Missing Bearer Token`);
      return;
    }
  }

  next();
};
