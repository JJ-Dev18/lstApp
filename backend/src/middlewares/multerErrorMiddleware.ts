import { Request, Response, NextFunction } from 'express';
import upload from './multerconfig';

export const multerDynamicMiddleware = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err: any) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({message : 'La imagen es muy pesada. Max 5mb'});
        }
        return next(err);
      }
      next();
    });
  };
};
