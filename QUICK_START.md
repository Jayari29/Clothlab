# 🚀 Quick Start - Complete Your Firebase Setup

Your Firebase integration is **95% complete**! Just follow these 3 simple steps to finish:

---

## Step 1: Create Your Firebase Project (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it **"ClothLab"**
4. Click through the setup (Google Analytics is optional)
5. Wait for project creation

---

## Step 2: Enable Authentication (3 minutes)

1. In your Firebase project, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable these methods:
   - ✅ **Email/Password** → Toggle Enable → Save
   - ✅ **Google** → Toggle Enable → Save
   - ✅ **GitHub** (optional) → Toggle Enable → Add OAuth App credentials → Save

---

## Step 3: Create Firestore Database (2 minutes)

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (we'll add security rules next)
4. Choose your region (closest to your users)
5. Click **"Enable"**

---

## Step 4: Add Security Rules (2 minutes)

1. In Firestore Database, go to the **"Rules"** tab
2. Replace everything with these rules:

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

---

## Step 5: Get Your Firebase Config (3 minutes)

1. In Firebase Console, click the **⚙️ gear icon** → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click the **`</>`** icon to add a web app
4. Name it **"ClothLab Web"** → Register app
5. **Copy the config values** (you'll see something like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "clothlab-xxxxx.firebaseapp.com",
  projectId: "clothlab-xxxxx",
  storageBucket: "clothlab-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

---

## Step 6: Update Your .env File (1 minute)

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Firebase config:

```env
VITE_FIREBASE_API_KEY=AIzaSyAbc123...
VITE_FIREBASE_AUTH_DOMAIN=clothlab-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=clothlab-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=clothlab-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
```

⚠️ **Important**: Make sure to replace ALL the placeholder values!

---

## Step 7: Start Your App! 🎉

```bash
npm run dev
```

Then open your browser to the local URL (usually `http://localhost:5173`)

---

## ✅ Test Your Setup

1. Click **"Se connecter"** in the navbar
2. Click **"Inscription"** tab
3. Fill in the form:
   - Name: Your name
   - Email: your@email.com
   - Password: At least 6 characters
   - Role: Choose one (Designer/Manufacturer/Admin)
4. Click **"Créer mon compte"**
5. Check Firebase Console → Authentication to see your new user!

---

## 🎯 What Works Now

✅ **User Authentication**
- Email/Password signup & login
- Google OAuth login
- GitHub OAuth login
- Automatic user profile creation

✅ **Protected Routes**
- `/consumer` - Designers only
- `/manufacturer` - Manufacturers only
- `/profile` - All authenticated users
- `/editor` - Designers only
- `/order` - All authenticated users

✅ **Navbar Updates**
- Shows "Se connecter" when logged out
- Shows profile avatar when logged in
- Logout button in mobile menu
- Dynamic avatar with user initials

✅ **Database Ready**
- Users collection
- Designs collection
- Orders collection
- Materials collection

---

## 🔧 Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Your `.env` file has incorrect values
- Make sure you copied the values correctly from Firebase Console
- Restart your dev server after updating `.env`

### "Permission denied" in Firestore
- Check that you published the security rules in Step 4
- Make sure the user is logged in

### OAuth not working
- Verify you enabled the provider in Firebase Console
- Check that redirect URLs are configured correctly

---

## 📚 Next Steps

Now that Firebase is set up, you can:

1. **Create your first design** - Use the `/editor` page
2. **View the catalog** - Check `/catalog` for public designs
3. **Place an order** - Navigate to `/order`
4. **Manage your profile** - Visit `/profile`

For detailed API documentation, see **`FIREBASE_DATABASE_SCHEMA.md`**

---

## 🎊 You're All Set!

Your ClothLab project now has:
- 🔐 Full authentication system
- 👥 3 user types (Admin, Designer, Manufacturer)
- 🗄️ Cloud database with security rules
- 🛡️ Protected routes
- 🎨 Dynamic UI based on user state

**Happy building!** 🚀
