const { response } = require("express")
import { Request, Response, NextFunction } from 'express';


const validarArchivoSubir = (req: Request, res: Response, next: NextFunction) => {
    
    

    if (!req.files || Object.keys(req.files).length  === 0  ) {
         
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir2'
        });
    }

    next();

}


module.exports = {
    validarArchivoSubir
}
