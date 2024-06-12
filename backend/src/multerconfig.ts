import multer, { Multer, StorageEngine } from 'multer';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';


// interface FileFilterCallback {
//   (error: Error | null, acceptFile: boolean): void;
// }

// interface FileFilter {
//   (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void;
// }

// interface StorageEngine {
//   _handleFile(req: Request, file: Express.Multer.File, callback: (error?: any, info?: any) => void): void;
//   _removeFile(req: Request, file: Express.Multer.File, callback: (error: Error | null) => void): void;
// }

interface MulterConfig extends Multer {
  storage: StorageEngine;
  fileFilter: any;
  limits: {
    fileSize: number;
  };
}
const destination = async (req: any, file:any, cb:any) => {
    let destFolder = 'uploads';
    // Determinar si es para jugadores o equipos
    if (req.path.includes('/equipo')) {
      destFolder = path.join(destFolder, 'jugadores');
    } else if (req.path.includes('/torneo')) {
      destFolder = path.join(destFolder, 'equipos');
    }

    cb(null, destFolder);
  };
const storage: StorageEngine = multer.diskStorage({
  destination: destination,
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req :any, file:any , cb:any ) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('No es un archivo de imagen!'), false);
  }
};
// fileFilter: function (req, file, cb) {
//     if (file.mimetype !== 'image/png') {
//      req.fileValidationError = 'goes wrong on the mimetype';
//      return cb(null, false, new Error('goes wrong on the mimetype'));
//     }
//     cb(null, true);
//    }
// export const fileFilter = (
//     request: Request,
//     file: Express.Multer.File,
//     callback: FileFilterCallback
// ): void => {
//     if (
//         file.mimetype === 'image/png' ||
//         file.mimetype === 'image/jpg' ||
//         file.mimetype === 'image/jpeg'
//     ) {
//         callback(null, true)
//     } else {
//         callback(null, false)
//     }
// }
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

const upload: MulterConfig = multer({ storage,fileFilter, limits }) as MulterConfig;

export default upload;
