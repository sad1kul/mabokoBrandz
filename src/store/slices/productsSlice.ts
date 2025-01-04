import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [
    {
      id: '1',
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with 360° sound, 20-hour battery life, and waterproof design. Perfect for outdoor adventures.',
      price: 899.99,
      category: 'Electronics',
      stock: 35,
      images: [
        {
          id: '1-1',
          url: '/images/products/bluetooth-speaker-1.jpg',
          isFeatured: true
        },
        {
          id: '1-2',
          url: '/images/products/bluetooth-speaker-2.jpg',
          isFeatured: false
        }
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Coffee Maker',
      description: 'Programmable coffee maker with 12-cup thermal carafe, auto-shutoff, and brew strength control. Perfect for coffee enthusiasts.',
      price: 1499.99,
      category: 'Appliances',
      stock: 15,
      images: [
        {
          id: '2-1',
          url: '/images/products/coffee-maker-1.jpg',
          isFeatured: true
        },
        {
          id: '2-2',
          url: '/images/products/coffee-maker-2.jpg',
          isFeatured: false
        }
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '3',
      name: 'Desk Lamp',
      description: 'Modern LED desk lamp with adjustable brightness, color temperature, and USB charging port. Perfect for your workspace.',
      price: 449.99,
      category: 'Lighting',
      stock: 50,
      images: [
        {
          id: '3-1',
          url: '/images/products/desk-lamp-1.jpg',
          isFeatured: true
        },
        {
          id: '3-2',
          url: '/images/products/desk-lamp-2.jpg',
          isFeatured: false
        }
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '4',
      name: 'Leather Backpack',
      description: 'Premium leather backpack with laptop compartment, water-resistant design, and multiple pockets. Perfect for daily commute.',
      price: 1299.99,
      category: 'Accessories',
      stock: 20,
      images: [
        {
          id: '4-1',
          url: '/images/products/backpack-1.jpg',
          isFeatured: true
        },
        {
          id: '4-2',
          url: '/images/products/backpack-2.jpg',
          isFeatured: false
        }
      ],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    }
  ],
  loading: false,
  error: null
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