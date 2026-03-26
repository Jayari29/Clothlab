import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Design, Order, Material, DesignerUser, ManufacturerUser } from '../types/database';

// ==================== DESIGNS ====================

// Create a new design
export const createDesign = async (designData: Omit<Design, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'views'>): Promise<string> => {
  try {
    const designRef = await addDoc(collection(db, 'designs'), {
      ...designData,
      likes: 0,
      views: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return designRef.id;
  } catch (error: any) {
    console.error('Error creating design:', error);
    throw new Error(error.message);
  }
};

// Get design by ID
export const getDesignById = async (designId: string): Promise<Design | null> => {
  try {
    const designDoc = await getDoc(doc(db, 'designs', designId));
    if (!designDoc.exists()) return null;
    return { id: designDoc.id, ...designDoc.data() } as Design;
  } catch (error: any) {
    console.error('Error getting design:', error);
    throw new Error(error.message);
  }
};

// Get all public designs
export const getPublicDesigns = async (limitCount: number = 20): Promise<Design[]> => {
  try {
    const q = query(
      collection(db, 'designs'),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Design));
  } catch (error: any) {
    console.error('Error getting public designs:', error);
    throw new Error(error.message);
  }
};

// Get designs by designer
export const getDesignsByDesigner = async (designerId: string): Promise<Design[]> => {
  try {
    const q = query(
      collection(db, 'designs'),
      where('designerId', '==', designerId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Design));
  } catch (error: any) {
    console.error('Error getting designer designs:', error);
    throw new Error(error.message);
  }
};

// Update design
export const updateDesign = async (designId: string, updates: Partial<Design>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'designs', designId), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error: any) {
    console.error('Error updating design:', error);
    throw new Error(error.message);
  }
};

// Delete design
export const deleteDesign = async (designId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'designs', designId));
  } catch (error: any) {
    console.error('Error deleting design:', error);
    throw new Error(error.message);
  }
};

// ==================== ORDERS ====================

// Create a new order
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return orderRef.id;
  } catch (error: any) {
    console.error('Error creating order:', error);
    throw new Error(error.message);
  }
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    if (!orderDoc.exists()) return null;
    return { id: orderDoc.id, ...orderDoc.data() } as Order;
  } catch (error: any) {
    console.error('Error getting order:', error);
    throw new Error(error.message);
  }
};

// Get orders by customer
export const getOrdersByCustomer = async (customerId: string): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('customerId', '==', customerId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  } catch (error: any) {
    console.error('Error getting customer orders:', error);
    throw new Error(error.message);
  }
};

// Get orders by manufacturer
export const getOrdersByManufacturer = async (manufacturerId: string): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('manufacturerId', '==', manufacturerId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  } catch (error: any) {
    console.error('Error getting manufacturer orders:', error);
    throw new Error(error.message);
  }
};

// Get pending orders (available for manufacturers)
export const getPendingOrders = async (): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  } catch (error: any) {
    console.error('Error getting pending orders:', error);
    throw new Error(error.message);
  }
};

// Update order
export const updateOrder = async (orderId: string, updates: Partial<Order>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error: any) {
    console.error('Error updating order:', error);
    throw new Error(error.message);
  }
};

// Accept order (manufacturer)
export const acceptOrder = async (orderId: string, manufacturerId: string, manufacturerName: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      manufacturerId,
      manufacturerName,
      status: 'accepted',
      updatedAt: Timestamp.now(),
    });
  } catch (error: any) {
    console.error('Error accepting order:', error);
    throw new Error(error.message);
  }
};

// ==================== USERS ====================

// Get all manufacturers
export const getManufacturers = async (): Promise<ManufacturerUser[]> => {
  try {
    const q = query(
      collection(db, 'users'),
      where('role', '==', 'manufacturer'),
      where('isActive', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as ManufacturerUser));
  } catch (error: any) {
    console.error('Error getting manufacturers:', error);
    throw new Error(error.message);
  }
};

// Get all designers
export const getDesigners = async (): Promise<DesignerUser[]> => {
  try {
    const q = query(
      collection(db, 'users'),
      where('role', '==', 'designer'),
      where('isActive', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as DesignerUser));
  } catch (error: any) {
    console.error('Error getting designers:', error);
    throw new Error(error.message);
  }
};

// Update user profile
export const updateUserProfile = async (
  uid: string,
  updates: Partial<DesignerUser | ManufacturerUser>
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    throw new Error(error.message);
  }
};

// ==================== MATERIALS ====================

// Get all materials
export const getMaterials = async (): Promise<Material[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'materials'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Material));
  } catch (error: any) {
    console.error('Error getting materials:', error);
    throw new Error(error.message);
  }
};

// Add material (admin only)
export const addMaterial = async (materialData: Omit<Material, 'id'>): Promise<string> => {
  try {
    const materialRef = await addDoc(collection(db, 'materials'), materialData);
    return materialRef.id;
  } catch (error: any) {
    console.error('Error adding material:', error);
    throw new Error(error.message);
  }
};
