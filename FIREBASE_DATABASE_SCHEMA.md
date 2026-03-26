# ClothLab Firebase Database Schema

## Collections Overview

The ClothLab database consists of 4 main collections:
1. **users** - All user accounts (Admin, Designer, Manufacturer)
2. **designs** - Design creations from designers
3. **orders** - Orders placed by customers and accepted by manufacturers
4. **materials** - Available materials for design creation

---

## 1. Users Collection (`users`)

### User Roles
- **admin**: Platform administrator with full access
- **designer**: Creates designs and places orders (also called "Créateur/Consommateur")
- **manufacturer**: Accepts orders and fabricates clothes (also called "Fabricant")

### Common Fields (All Users)
```typescript
{
  uid: string;                    // Unique user ID (from Firebase Auth)
  email: string;                  // User email
  displayName: string;            // User's full name
  role: 'admin' | 'designer' | 'manufacturer';
  photoURL?: string;              // Profile picture URL
  createdAt: Timestamp;           // Account creation date
  updatedAt: Timestamp;           // Last update date
  isActive: boolean;              // Account status
}
```

### Admin User
```typescript
{
  ...commonFields,
  role: 'admin',
  permissions: string[];          // ['manage_users', 'manage_designs', 'manage_orders']
}
```

### Designer User
```typescript
{
  ...commonFields,
  role: 'designer',
  bio?: string;                   // Designer bio
  portfolio?: string[];           // Array of image URLs
  totalDesigns: number;           // Total designs created
  totalOrders: number;            // Total orders placed
  favoriteDesigns: string[];      // Array of design IDs
}
```

### Manufacturer User
```typescript
{
  ...commonFields,
  role: 'manufacturer',
  companyName: string;            // Manufacturing company name
  address: string;                // Physical address
  phone: string;                  // Contact phone
  specialties: string[];          // Types of clothing (e.g., ['shirts', 'pants'])
  totalOrdersCompleted: number;   // Total orders completed
  rating: number;                 // Average rating (0-5)
  isVerified: boolean;            // Verified manufacturer status
  availableCapacity: number;      // Number of orders they can handle
}
```

---

## 2. Designs Collection (`designs`)

```typescript
{
  id: string;                     // Auto-generated document ID
  designerId: string;             // UID of the designer who created it
  designerName: string;           // Designer's display name
  title: string;                  // Design title
  description: string;            // Design description
  category: string;               // Category (e.g., 'shirt', 'pants', 'dress')
  images: string[];               // Array of image URLs
  modelData?: any;                // 3D model data (optional)
  materials: string[];            // Required materials
  colors: string[];               // Available colors
  sizes: string[];                // Available sizes (e.g., ['S', 'M', 'L', 'XL'])
  basePrice: number;              // Base price in currency
  isPublic: boolean;              // Public visibility
  likes: number;                  // Total likes count
  views: number;                  // Total views count
  createdAt: Timestamp;           // Creation date
  updatedAt: Timestamp;           // Last update date
}
```

---

## 3. Orders Collection (`orders`)

```typescript
{
  id: string;                     // Auto-generated document ID
  designId: string;               // ID of the design being ordered
  designerId: string;             // UID of the designer
  customerId: string;             // UID of the customer placing order
  customerName: string;           // Customer's display name
  manufacturerId?: string;        // UID of manufacturer (assigned when accepted)
  manufacturerName?: string;      // Manufacturer's display name
  status: 'pending' | 'accepted' | 'in_production' | 'completed' | 'cancelled';
  items: OrderItem[];             // Array of order items
  totalAmount: number;            // Total order amount
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  notes?: string;                 // Additional notes
  createdAt: Timestamp;           // Order creation date
  updatedAt: Timestamp;           // Last update date
  completedAt?: Timestamp;        // Completion date (if completed)
}

// OrderItem structure
{
  designId: string;
  designName: string;
  size: string;
  color: string;
  material: string;
  quantity: number;
  price: number;
}
```

### Order Status Flow
1. **pending** → Customer created order, waiting for manufacturer
2. **accepted** → Manufacturer accepted the order
3. **in_production** → Manufacturer is working on it
4. **completed** → Order finished and delivered
5. **cancelled** → Order was cancelled

---

## 4. Materials Collection (`materials`)

```typescript
{
  id: string;                     // Auto-generated document ID
  name: string;                   // Material name (e.g., 'Cotton', 'Silk')
  type: string;                   // Material type (e.g., 'fabric', 'leather')
  supplier: string;               // Supplier name
  pricePerUnit: number;           // Price per unit
  unit: string;                   // Unit of measurement (e.g., 'meter', 'yard')
  available: boolean;             // Availability status
  imageUrl?: string;              // Material image URL
}
```

---

## Security Rules (to be set in Firebase Console)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }

    // Helper function to check if user is admin
    function isAdmin() {
      return isAuthenticated() &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Helper function to check if user owns the document
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isAdmin() || isOwner(userId);
      allow delete: if isAdmin();
    }

    // Designs collection
    match /designs/{designId} {
      allow read: if true;  // Public designs visible to all
      allow create: if isAuthenticated();
      allow update: if isAdmin() || isOwner(resource.data.designerId);
      allow delete: if isAdmin() || isOwner(resource.data.designerId);
    }

    // Orders collection
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

    // Materials collection
    match /materials/{materialId} {
      allow read: if true;  // All users can view materials
      allow write: if isAdmin();  // Only admins can modify materials
    }
  }
}
```

---

## Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: "ClothLab"
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable sign-in methods:
   - Email/Password
   - Google
   - GitHub

### 3. Create Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Start in **test mode** (we'll add security rules later)
4. Choose your region
5. Click "Enable"

### 4. Add Security Rules
1. In Firestore Database, go to **Rules** tab
2. Copy and paste the security rules above
3. Click "Publish"

### 5. Configure Your App
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the web icon (</>) to add a web app
4. Register app with nickname "ClothLab Web"
5. Copy the configuration values
6. Create `.env` file in your project root
7. Paste the values into `.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 6. Create First Admin User
After setting up authentication, manually create the first admin user:
1. Register a user through your app
2. In Firebase Console, go to Firestore Database
3. Find the user in the `users` collection
4. Edit the document and change `role` from 'designer' to 'admin'
5. Add `permissions: ['manage_users', 'manage_designs', 'manage_orders']`

---

## Usage Examples

### Register a new designer
```typescript
import { signUpWithEmail } from './services/authService';

await signUpWithEmail(
  'designer@example.com',
  'password123',
  'John Designer',
  'designer'
);
```

### Create a design
```typescript
import { createDesign } from './services/dbService';

const designId = await createDesign({
  designerId: currentUser.uid,
  designerName: currentUser.displayName,
  title: 'Summer T-Shirt',
  description: 'Casual summer design',
  category: 'shirt',
  images: ['url1', 'url2'],
  materials: ['cotton'],
  colors: ['blue', 'white'],
  sizes: ['S', 'M', 'L', 'XL'],
  basePrice: 29.99,
  isPublic: true,
});
```

### Place an order
```typescript
import { createOrder } from './services/dbService';

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

### Accept order (manufacturer)
```typescript
import { acceptOrder } from './services/dbService';

await acceptOrder(
  orderId,
  currentUser.uid,
  currentUser.displayName
);
```
