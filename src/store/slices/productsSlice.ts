import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

// Dummy products data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.',
    price: 99.99,
    image: 'https://via.placeholder.com/300?text=Wireless+Headphones',
    category: 'Electronics',
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Leather Backpack',
    description: 'Handcrafted genuine leather backpack with padded laptop compartment, multiple pockets, and water-resistant design. Perfect for daily commute and travel.',
    price: 79.99,
    image: 'https://via.placeholder.com/300?text=Leather+Backpack',
    category: 'Accessories',
    stock: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Water-resistant up to 50m.',
    price: 199.99,
    image: 'https://via.placeholder.com/300?text=Smart+Watch',
    category: 'Electronics',
    stock: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with 12-cup thermal carafe, auto-shutoff, and brew strength control. Perfect for home and office use.',
    price: 149.99,
    image: 'https://via.placeholder.com/300?text=Coffee+Maker',
    category: 'Home & Kitchen',
    stock: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Yoga Mat',
    description: 'Premium non-slip yoga mat with alignment lines, extra thick padding, and carrying strap. Perfect for yoga, pilates, and floor exercises.',
    price: 29.99,
    image: 'https://via.placeholder.com/300?text=Yoga+Mat',
    category: 'Sports & Fitness',
    stock: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness, color temperature, and USB charging port. Perfect for study and work.',
    price: 49.99,
    image: 'https://via.placeholder.com/300?text=Desk+Lamp',
    category: 'Home & Kitchen',
    stock: 40,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof and durable.',
    price: 24.99,
    image: 'https://via.placeholder.com/300?text=Water+Bottle',
    category: 'Sports & Fitness',
    stock: 75,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360° sound, 20-hour battery life, and waterproof design. Perfect for outdoor activities.',
    price: 89.99,
    image: 'https://via.placeholder.com/300?text=Bluetooth+Speaker',
    category: 'Electronics',
    stock: 35,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: initialProducts,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addProduct,
  updateProduct,
  removeProduct,
  setLoading,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer;