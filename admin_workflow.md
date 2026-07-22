# AXR Gaming Store - Admin Listing Upload Workflow

This guide details the step-by-step process of adding a new Free Fire ID listing to the AXR Marketplace catalog using the moderator panel.

> [!IMPORTANT]
> **Listing Policy Restriction**: Only users with the `admin` role are permitted to list accounts. The "Sell Your ID" link is hidden from standard users, and direct page access at `/sell` is restricted.

---

## 🛠️ Step-by-Step Upload Process

### 1. Toggle Admin Mode
- Navigate to the **AXR Store** homepage.
- Look at the top navigation bar header. Locate the **Admin Mode** switch or role selector and toggle it to **Admin/Moderator**.
- Ensure that the path `/admin` is accessible.

### 2. Open the Direct ID Uploader
- Once in the **Moderator Control Panel** (`/admin`), look at the top right header.
- Click the cyan button labeled **Upload New ID**, or select the **Direct ID Uploader** tab.

### 3. Fill in Listing Fields
Provide all the parameters exactly matching the premium card layouts:

| Field Name | Type | Description / Sample Value |
| :--- | :--- | :--- |
| **ID No** | String | The catalog reference ID number (e.g., `75`). |
| **Account UID** | String | The unique numeric Free Fire in-game UID (e.g., `1909016280`). |
| **Price (₹)** | Number | Listing value in INR currency (e.g., `16999`). |
| **Level** | Number | The character level of the account (e.g., `63`). |
| **Prime Level** | Number | The prime tier ranking/status level (e.g., `8`). |
| **Bundles Count** | Number | Number of active premium apparel bundles (e.g., `390`). |
| **Rank** | Select | Dropdown selection (e.g., `Grandmaster`, `Master`, `Heroic`). |
| **Login Bind** | Select | Bind authentication method (e.g., `Facebook`, `Google`). |
| **Rare Items** | Comma List | Comma-separated rare items tags (e.g., `LEVEL 63, PRIME8, 4 max 1 semi, 10 m18 skins, Op vault`). |
| **Screenshot URLs** | Comma List | Comma-separated public image link addresses. |
| **Description** | Textarea | Listing details notes (e.g., `HONEST OWNS !!`). |
| **Verified Badge** | Toggle | Toggle to enable/disable the "Verified & Secure Transaction" badge on the listing. |

### 4. Publish to Marketplace
- Review the filled details.
- Click **Publish Listing**.
- A success toast will trigger: *"Listing Uploaded Successfully! Redirecting to Approved Queue..."*
- The item is immediately approved and pushed to the live shop directory (`/listings`).

---

## 🎯 Verification Checklist

1. Go to the **Browse Shop** catalog (`/listings`).
2. Search for the **ID No** or **Keywords** of the newly uploaded ID.
3. Click on the listing card.
4. Verify the layout renders the elements correctly:
   - Double-column responsive grid matching the specifications.
   - Price, ID No, stats grid, copyable Account UID, and verified badges.
   - Clickable green **BUY NOW** WhatsApp link containing custom checkout message parameters.

1. Get All Listings
bash
curl http://localhost:5000/api/listings
2. Create a Listing (POST)
bash
curl -X POST http://localhost:5000/api/listings \
-H "Content-Type: application/json" \
-d '{
  "title": "VVIP Grandmaster Account - Evo Level Max",
  "price": 4999,
  "level": 78,
  "rank": "Grandmaster",
  "loginMethod": "Facebook",
  "sellerName": "GamerPro_FF",
  "description": "Insane account with all major Evo Guns maxed out.",
  "rareItems": ["Red Criminal Bundle", "Yellow Criminal Bundle"],
  "featured": true
}'
3. Get Listing by ID (replace <listing_id> with the _id returned from creating/getting listings)
bash
curl http://localhost:5000/api/listings/<listing_id>
4. Update a Listing (PATCH)
bash
curl -X PATCH http://localhost:5000/api/listings/<listing_id> \
-H "Content-Type: application/json" \
-d '{
  "price": 4500,
  "featured": false
}'
5. Delete a Listing (DELETE)
bash
curl -X DELETE http://localhost:5000/api/listings/<listing_id>