import multer from 'multer';
import { fileUploadConfig } from '../config';

const fileUploadMiddleware = multer(fileUploadConfig);

export default fileUploadMiddleware;
