import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  isLoading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    inStock: boolean;
  };
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  isLoading: false,
  error: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    inStock: false,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<ProductsState['filters']>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters
      state.filteredItems = state.items.filter((product) => {
        const categoryMatch =
          !state.filters.category || product.category === state.filters.category;
        const priceMatch =
          (!state.filters.minPrice ||
            product.price >= state.filters.minPrice) &&
          (!state.filters.maxPrice || product.price <= state.filters.maxPrice);
        const stockMatch = !state.filters.inStock || product.stock > 0;
        return categoryMatch && priceMatch && stockMatch;
      });
    },
  },
});

export const { setProducts, setLoading, setError, setFilters } =
  productsSlice.actions;
export default productsSlice.reducer;