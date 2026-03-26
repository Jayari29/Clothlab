// User roles in the system
export type UserRole = 'admin' | 'designer' | 'manufacturer';

// Base user interface - common fields for all users
export interface BaseUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Admin user - manages the platform
export interface AdminUser extends BaseUser {
  role: 'admin';
  permissions: string[];
}

// Designer user - creates and orders designs
export interface DesignerUser extends BaseUser {
  role: 'designer';
  bio?: string;
  portfolio?: string[];
  totalDesigns: number;
  totalOrders: number;
  favoriteDesigns: string[]; // Design IDs
}

// Manufacturer user - accepts and fabricates orders
export interface ManufacturerUser extends BaseUser {
  role: 'manufacturer';
  companyName: string;
  address: string;
  phone: string;
  specialties: string[]; // Types of clothing they manufacture
  totalOrdersCompleted: number;
  rating: number;
  isVerified: boolean;
  availableCapacity: number; // Number of orders they can handle
}

// Union type for all users
export type User = AdminUser | DesignerUser | ManufacturerUser;

// Design interface
export interface Design {
  id: string;
  designerId: string;
  designerName: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  modelData?: any; // 3D model data
  materials: string[];
  colors: string[];
  sizes: string[];
  basePrice: number;
  isPublic: boolean;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

// Order interface
export interface Order {
  id: string;
  designId: string;
  designerId: string;
  customerId: string;
  customerName: string;
  manufacturerId?: string;
  manufacturerName?: string;
  status: 'pending' | 'accepted' | 'in_production' | 'completed' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface OrderItem {
  designId: string;
  designName: string;
  size: string;
  color: string;
  material: string;
  quantity: number;
  price: number;
}

// Material interface
export interface Material {
  id: string;
  name: string;
  type: string;
  supplier: string;
  pricePerUnit: number;
  unit: string;
  available: boolean;
  imageUrl?: string;
}
