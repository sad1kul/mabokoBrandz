import { Product } from '../types/product';

export interface Invoice {
  id: string;
  orderNumber: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  orderDate: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export const dataService = {
  // Product Operations
  saveProduct: async (product: Product): Promise<void> => {
    const products = await dataService.getAllProducts();
    const existingIndex = products.findIndex(p => p.id === product.id);
    
    if (existingIndex >= 0) {
      products[existingIndex] = product;
    } else {
      products.push(product);
    }
    
    localStorage.setItem('products', JSON.stringify(products));
  },

  getProduct: async (id: string): Promise<Product | null> => {
    const products = await dataService.getAllProducts();
    return products.find(p => p.id === id) || null;
  },

  getAllProducts: async (): Promise<Product[]> => {
    const productsJson = localStorage.getItem('products');
    return productsJson ? JSON.parse(productsJson) : [];
  },

  deleteProduct: async (id: string): Promise<void> => {
    const products = await dataService.getAllProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
  },

  // Invoice Operations
  saveInvoice: async (invoice: Invoice): Promise<void> => {
    const invoices = await dataService.getAllInvoices();
    const existingIndex = invoices.findIndex(i => i.id === invoice.id);
    
    if (existingIndex >= 0) {
      invoices[existingIndex] = invoice;
    } else {
      invoices.push(invoice);
    }
    
    localStorage.setItem('invoices', JSON.stringify(invoices));
  },

  getInvoice: async (id: string): Promise<Invoice | null> => {
    const invoices = await dataService.getAllInvoices();
    return invoices.find(i => i.id === id) || null;
  },

  getAllInvoices: async (): Promise<Invoice[]> => {
    const invoicesJson = localStorage.getItem('invoices');
    return invoicesJson ? JSON.parse(invoicesJson) : [];
  },

  // Image Operations
  saveImage: async (imageFile: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.readAsDataURL(imageFile);
    });
  },

  deleteImage: async (): Promise<void> => {
    // In this browser-based implementation, we don't need to do anything
    // The image URLs are stored as base64 strings in the product data
    return Promise.resolve();
  }
}; 