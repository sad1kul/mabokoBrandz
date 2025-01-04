import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string(),
  stock: z.number().int().min(0),
});

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  try {
    productSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid product data' });
  }
};