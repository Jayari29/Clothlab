import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserRole, BaseUser, DesignerUser, ManufacturerUser, AdminUser } from '../types/database';

// Sign up with email and password
export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string,
  role: UserRole
): Promise<FirebaseUser> => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile
    await updateProfile(user, { displayName });

    // Create user document in Firestore
    await createUserDocument(user.uid, email, displayName, role);

    return user;
  } catch (error: any) {
    console.error('Error signing up:', error);
    throw new Error(error.message);
  }
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing in:', error);
    throw new Error(error.message);
  }
};

// Sign in with Google
export const signInWithGoogle = async (role: UserRole): Promise<FirebaseUser> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    // If new user, create document
    if (!userDoc.exists()) {
      await createUserDocument(
        user.uid,
        user.email!,
        user.displayName || 'User',
        role
      );
    }

    return user;
  } catch (error: any) {
    console.error('Error signing in with Google:', error);
    throw new Error(error.message);
  }
};

// Sign in with GitHub
export const signInWithGithub = async (role: UserRole): Promise<FirebaseUser> => {
  try {
    const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    // If new user, create document
    if (!userDoc.exists()) {
      await createUserDocument(
        user.uid,
        user.email!,
        user.displayName || 'User',
        role
      );
    }

    return user;
  } catch (error: any) {
    console.error('Error signing in with GitHub:', error);
    throw new Error(error.message);
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw new Error(error.message);
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Error resetting password:', error);
    throw new Error(error.message);
  }
};

// Create user document in Firestore
const createUserDocument = async (
  uid: string,
  email: string,
  displayName: string,
  role: UserRole
): Promise<void> => {
  const now = new Date();

  const baseUser: Omit<BaseUser, 'uid'> = {
    email,
    displayName,
    role,
    createdAt: now,
    updatedAt: now,
    isActive: true,
  };

  let userData: Omit<AdminUser | DesignerUser | ManufacturerUser, 'uid'>;

  switch (role) {
    case 'admin':
      userData = {
        ...baseUser,
        role: 'admin',
        permissions: ['manage_users', 'manage_designs', 'manage_orders'],
      } as Omit<AdminUser, 'uid'>;
      break;

    case 'designer':
      userData = {
        ...baseUser,
        role: 'designer',
        totalDesigns: 0,
        totalOrders: 0,
        favoriteDesigns: [],
      } as Omit<DesignerUser, 'uid'>;
      break;

    case 'manufacturer':
      userData = {
        ...baseUser,
        role: 'manufacturer',
        companyName: '',
        address: '',
        phone: '',
        specialties: [],
        totalOrdersCompleted: 0,
        rating: 0,
        isVerified: false,
        availableCapacity: 10,
      } as Omit<ManufacturerUser, 'uid'>;
      break;

    default:
      throw new Error('Invalid role');
  }

  await setDoc(doc(db, 'users', uid), userData);
};

// Get current user data from Firestore
export const getUserData = async (
  uid: string
): Promise<AdminUser | DesignerUser | ManufacturerUser | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));

    if (!userDoc.exists()) {
      return null;
    }

    return { uid, ...userDoc.data() } as AdminUser | DesignerUser | ManufacturerUser;
  } catch (error: any) {
    console.error('Error getting user data:', error);
    throw new Error(error.message);
  }
};
