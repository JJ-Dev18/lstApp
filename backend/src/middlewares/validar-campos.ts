const { validationResult } = require("express-validator");
import { Request, Response, NextFunction } from 'express';

const validarCampos = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { validarCampos };