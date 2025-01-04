import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

// Dummy products data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.',
    price: 99.99,
    images: [
      {
        id: '1-1',
        url: 'https://via.placeholder.com/800x600?text=Wireless+Headphones+Main',
        isFeatured: true
      },
      {
        id: '1-2',
        url: 'https://via.placeholder.com/800x600?text=Wireless+Headphones+Side',
        isFeatured: false
      },
      {
        id: '1-3',
        url: 'https://via.placeholder.com/800x600?text=Wireless+Headphones+Back',
        isFeatured: false
      }
    ],
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
    images: [
      {
        id: '2-1',
        url: 'https://via.placeholder.com/800x600?text=Leather+Backpack+Front',
        isFeatured: true
      },
      {
        id: '2-2',
        url: 'https://via.placeholder.com/800x600?text=Leather+Backpack+Inside',
        isFeatured: false
      }
    ],
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
    images: [
      {
        id: '3-1',
        url: 'https://via.placeholder.com/800x600?text=Smart+Watch+Front',
        isFeatured: true
      },
      {
        id: '3-2',
        url: 'https://via.placeholder.com/800x600?text=Smart+Watch+Side',
        isFeatured: false
      }
    ],
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
    images: [
      {
        id: '4-1',
        url: 'https://via.placeholder.com/800x600?text=Coffee+Maker+Front',
        isFeatured: true
      },
      {
        id: '4-2',
        url: 'https://via.placeholder.com/800x600?text=Coffee+Maker+Side',
        isFeatured: false
      }
    ],
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
    images: [
      {
        id: '5-1',
        url: 'https://via.placeholder.com/800x600?text=Yoga+Mat+Top',
        isFeatured: true
      },
      {
        id: '5-2',
        url: 'https://via.placeholder.com/800x600?text=Yoga+Mat+Rolled',
        isFeatured: false
      }
    ],
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
    images: [
      {
        id: '6-1',
        url: 'https://via.placeholder.com/800x600?text=Desk+Lamp+Front',
        isFeatured: true
      },
      {
        id: '6-2',
        url: 'https://via.placeholder.com/800x600?text=Desk+Lamp+Side',
        isFeatured: false
      }
    ],
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
    images: [
      {
        id: '7-1',
        url: 'https://via.placeholder.com/800x600?text=Water+Bottle+Front',
        isFeatured: true
      },
      {
        id: '7-2',
        url: 'https://via.placeholder.com/800x600?text=Water+Bottle+Open',
        isFeatured: false
      }
    ],
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
    images: [
      {
        id: '8-1',
        url: 'https://via.placeholder.com/800x600?text=Bluetooth+Speaker+Front',
        isFeatured: true
      },
      {
        id: '8-2',
        url: 'https://via.placeholder.com/800x600?text=Bluetooth+Speaker+Back',
        isFeatured: false
      }
    ],
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