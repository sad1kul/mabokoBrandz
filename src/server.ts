import express from 'express';
import path from 'path';
import productRoutes from './api/routes/products';
import { authenticateToken } from './api/middleware/auth';

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/products', authenticateToken, productRoutes);
app.use('/api/orders', authenticateToken, orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});