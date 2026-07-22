# Firebase Listing Backend — Workflow

## Overview

Firebase replaces the Express + MongoDB backend entirely for listings.
Login stays hardcoded in frontend. Only listings (data + images) go to Firebase.

---

## Services Used

| Service | Purpose |
|---|---|
| **Firebase Firestore** | Store listing data (title, price, level, etc.) |
| **Firebase Storage** | Store 50+ images per listing |

---

## Project File Structure

```
src/
├── firebase.js            ← Firebase config & init
├── services/
│   └── listingService.js  ← All Firebase listing functions
├── context/
│   └── StoreContext.jsx   ← Updated to use listingService
└── pages/
    └── AdminPanel.jsx     ← Updated image upload UI
```

---

## Firestore Document Structure

```
Collection: listings
  └── Document ID: auto-generated
      {
        title:       "VVIP Grandmaster Account",
        price:       4999,
        idNo:        "75",
        level:       78,
        primeLevel:  8,
        bundles:     390,
        accountUid:  "1909016280",
        rank:        "Grandmaster",
        skinsCount:  210,
        evoGunsCount: 7,
        diamonds:    450,
        loginMethod: "Facebook",
        verified:    true,
        rareItems:   ["Cobra MP40", "Criminal Bundle"],
        description: "...",
        screenshots: [
          "https://firebasestorage.googleapis.com/.../img1.jpg",
          ... upto 50+ images
        ],
        status:      "approved",
        createdAt:   Timestamp
      }
```

---

## Flow Diagram

```
ADMIN PANEL
    │
    │  1. Admin fills form + selects 50 images
    ▼
FIREBASE STORAGE (upload images)
    │
    │  2. Returns download URLs for each image
    ▼
FIRESTORE (save listing doc)
    │
    │  3. { ...formData, screenshots: [url1, url2, ...] }
    ▼
STORE CONTEXT (real-time listener)
    │
    │  4. onSnapshot() auto-updates listings state
    ▼
FRONTEND (IDListings + IDDetails)
    │
    │  5. Shows all listings + images from Firebase
    ▼
  DONE ✅
```

---

## Implementation Steps

### Step 1 — Firebase Setup
- Create project at firebase.google.com
- Enable Firestore Database (start in test mode)
- Enable Storage (start in test mode)
- Copy web config to .env

### Step 2 — `src/firebase.js`
Initialize Firebase app with config from VITE env vars

### Step 3 — `src/services/listingService.js`
Functions:
- `fetchListings()` — get all approved listings from Firestore
- `uploadImages(files, listingId)` — upload array of files to Storage, return URLs
- `addListing(data, imageFiles)` — upload images → save to Firestore
- `deleteListing(id)` — delete from Firestore + Storage images

### Step 4 — `StoreContext.jsx`
- On mount: `fetchListings()` from Firestore (replaces mock data)
- `addAdminListing()` → calls `addListing()` service
- Real-time updates via `onSnapshot()`

### Step 5 — `AdminPanel.jsx`
- Replace text input for screenshots with file picker
- Show preview thumbnails for selected images
- Progress bar during upload
- Max 50 images allowed

---

## Environment Variables (.env)

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## Firestore Security Rules (Test Mode)

```
allow read: if true;
allow write: if true;
```

## Storage Rules (Test Mode)

```
allow read: if true;
allow write: if true;
```
