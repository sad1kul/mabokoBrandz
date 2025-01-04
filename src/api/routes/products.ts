import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { validateProduct } from '../middleware/validation';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/assets/products');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

router.post('/', upload.array('images', 5), validateProduct, async (req, res) => {
  try {
    const productData = req.body;
    const imageFiles = req.files as Express.Multer.File[];
    
    const images = imageFiles.map(file => `/assets/products/${file.filename}`);
    
    // Save product data to database with image paths
    // Implementation will depend on your database choice

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});