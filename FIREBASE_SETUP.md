# ClothLab Firebase Setup Guide

## 🎉 What Has Been Installed

Your ClothLab application now has a complete Firebase integration with:

1. **Firebase SDK** installed
2. **3 User Types** configured:
   - **Admin** - Platform administrator
   - **Designer (Créateur)** - Creates designs and places orders
   - **Manufacturer (Fabricant)** - Accepts and fabricates orders

3. **Authentication** ready with:
   - Email/Password login
   - Google OAuth
   - GitHub OAuth

4. **Database Schema** designed for:
   - Users management
   - Designs catalog
   - Orders processing
   - Materials inventory

---

## 🚀 Quick Start (5 Steps)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it **"ClothLab"** (or any name you prefer)
4. Enable/disable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Enable Authentication Methods

1. In Firebase Console, click **Authentication** in left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable these providers:
   - **Email/Password** - Click, toggle Enable, Save
   - **Google** - Click, toggle Enable, Save
   - **GitHub** - Click, toggle Enable, add OAuth credentials, Save
     - For GitHub: Go to GitHub Settings > Developer settings > OAuth Apps > New OAuth App
     - Authorization callback URL: Your Firebase auth domain (shown in Firebase)

### Step 3: Create Firestore Database

1. In Firebase Console, click **Firestore Database** in left sidebar
2. Click **"Create database"**
3. Choose **production mode** or **test mode** (start with test mode for development)
4. Select your preferred region (choose closest to your users)
5. Click **"Enable"**

### Step 4: Add Security Rules

1. In Firestore Database, go to **"Rules"** tab
2. Replace the existing rules with these (copy from `FIREBASE_DATABASE_SCHEMA.md`):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isAdmin() || isOwner(userId);
      allow delete: if isAdmin();
    }

    match /designs/{designId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update: if isAdmin() || isOwner(resource.data.designerId);
      allow delete: if isAdmin() || isOwner(resource.data.designerId);
    }

    match /orders/{orderId} {
      allow read: if isAuthenticated() && (
        isAdmin() ||
        isOwner(resource.data.customerId) ||
        isOwner(resource.data.manufacturerId)
      );
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && (
        isAdmin() ||
        isOwner(resource.data.customerId) ||
        isOwner(resource.data.manufacturerId)
      );
      allow delete: if isAdmin();
    }

    match /materials/{materialId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

3. Click **"Publish"**

### Step 5: Configure Your App

1. In Firebase Console, click the **gear icon** (Settings) > **Project settings**
2. Scroll down to **"Your apps"** section
3. Click the **web icon** `</>` to add a web app
4. Register app with nickname: **"ClothLab Web"**
5. Copy the firebaseConfig values
6. Create a `.env` file in your project root (next to `package.json`)
7. Paste this into `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Important**: Replace the placeholder values with your actual Firebase config values!

---

## 📂 Files Created

### Configuration
- `src/config/firebase.ts` - Firebase initialization
- `.env.example` - Environment variables template

### TypeScript Types
- `src/types/database.ts` - All database types and interfaces

### Services
- `src/services/authService.ts` - Authentication functions
- `src/services/dbService.ts` - Database operations (CRUD)

### Contexts
- `src/contexts/AuthContext.tsx` - Auth state management

### Updated Files
- `src/pages/Auth.tsx` - Updated with Firebase integration

### Documentation
- `FIREBASE_DATABASE_SCHEMA.md` - Complete database schema reference
- `FIREBASE_SETUP.md` - This file

---

## 🔥 How to Use Firebase in Your App

### 1. Wrap your app with AuthProvider

Update `src/main.tsx`:

```typescript
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
```

### 2. Use the auth hook in any component

```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { currentUser, userData, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) {
    return <div>Please log in</div>;
  }

  // Check user role
  if (userData?.role === 'admin') {
    return <AdminDashboard />;
  }

  if (userData?.role === 'manufacturer') {
    return <ManufacturerDashboard />;
  }

  return <DesignerDashboard />;
}
```

### 3. Create a design

```typescript
import { createDesign } from '../services/dbService';
import { useAuth } from '../contexts/AuthContext';

function CreateDesignForm() {
  const { currentUser, userData } = useAuth();

  const handleSubmit = async () => {
    const designId = await createDesign({
      designerId: currentUser!.uid,
      designerName: userData!.displayName,
      title: 'Summer T-Shirt',
      description: 'Cool summer design',
      category: 'shirt',
      images: [],
      materials: ['cotton'],
      colors: ['blue', 'white'],
      sizes: ['S', 'M', 'L', 'XL'],
      basePrice: 29.99,
      isPublic: true,
    });

    console.log('Design created:', designId);
  };

  // ... rest of component
}
```

### 4. Place an order

```typescript
import { createOrder } from '../services/dbService';

const orderId = await createOrder({
  designId: 'design123',
  designerId: 'designer_uid',
  customerId: currentUser.uid,
  customerName: currentUser.displayName,
  status: 'pending',
  items: [{
    designId: 'design123',
    designName: 'Summer T-Shirt',
    size: 'M',
    color: 'blue',
    material: 'cotton',
    quantity: 2,
    price: 29.99
  }],
  totalAmount: 59.98,
  shippingAddress: {
    street: '123 Main St',
    city: 'Paris',
    postalCode: '75001',
    country: 'France'
  }
});
```

### 5. Accept order (manufacturer)

```typescript
import { acceptOrder } from '../services/dbService';

await acceptOrder(orderId, currentUser.uid, currentUser.displayName);
```

---

## 🛡️ Creating Your First Admin User

After setting up Firebase and creating your first user:

1. Register through your app (this creates a designer by default)
2. Go to Firebase Console > Firestore Database
3. Click on the `users` collection
4. Find your user document (by email)
5. Click to edit
6. Change `role` field from `"designer"` to `"admin"`
7. Add a `permissions` array field: `["manage_users", "manage_designs", "manage_orders"]`
8. Click **Update**

Now you have admin access!

---

## 🧪 Testing Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the auth page
3. Try signing up with email/password
4. Check Firebase Console > Authentication to see the new user
5. Check Firebase Console > Firestore Database > users collection to see the user document

---

## 🎨 User Roles Explained

### Admin
- Full platform access
- Can manage all users, designs, and orders
- Can add/remove materials
- Has permissions array in database

### Designer (Créateur)
- Creates custom designs
- Places orders
- Views their own designs and orders
- Can make designs public/private

### Manufacturer (Fabricant)
- Views pending orders
- Accepts orders
- Updates order status
- Tracks completed orders
- Has company info and specialties

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Data Modeling](https://firebase.google.com/docs/firestore/data-model)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- Complete database schema: See `FIREBASE_DATABASE_SCHEMA.md`

---

## ⚠️ Important Notes

1. **Never commit `.env` file** - It contains sensitive credentials
2. **The `.env.example` file is safe** - It shows structure without real values
3. **Use test mode for development** - Switch to production rules when deploying
4. **Secure your rules** - The provided rules are a good start but review for your needs
5. **Backup your data** - Export Firestore data regularly

---

## 🐛 Troubleshooting

### "Firebase not initialized" error
- Make sure you created the `.env` file with correct values
- Restart your dev server after creating `.env`

### "Permission denied" error
- Check your Firestore security rules
- Verify user is authenticated
- Check user role matches required permissions

### Social login not working
- Verify OAuth credentials are configured
- Check redirect URLs match Firebase settings
- Enable the sign-in method in Firebase Console

---

## ✅ Next Steps

1. Complete the 5-step setup above
2. Test authentication with email/password
3. Create your first admin user
4. Test creating a design
5. Test placing an order
6. Customize the database schema for your needs

---

## 🎯 You're All Set!

Your ClothLab application now has a complete authentication and database system ready for your 3 user types. Start building your features!

For questions or issues, refer to `FIREBASE_DATABASE_SCHEMA.md` for detailed API documentation.
