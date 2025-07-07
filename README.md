# 🎨 Artistic

**Artistic** is a full-stack web application developed for the Kalakriti Club to showcase and sell its artworks.  
It provides a seamless platform for customers to browse, buy, review artworks, and for the club admins to manage artwork listings.

---

## 🚀 Features

✅ **User Side**
- 🏠 Home page with featured artworks
- 🎨 Category pages: Charcoal, Digital, Acrylic, Handmade
- 🔍 View detailed artwork info on click
- 🛒 Add & remove items from cart (stored in user schema)
- 💖 Add & remove items from wishlist (stored in separate collection)
- ✍️ Leave reviews for artworks (only after purchase)
- 🔐 Authentication using JWT (login & local auth)

✅ **Admin Side**
- 🛠 Admin dashboard to add artworks, upload images & enter details
- 📂 Image upload handled via Multer

---

## 🛠 Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React.js   |
| Backend  | Node.js + Express |
| Database | MongoDB    |
| Auth     | JWT (JSON Web Tokens) |
| Image    | Multer for image storage |

---

## 🗂 Database Schema

- **Users** collection
  - `name`, `email`, `password`, `cart: {}` (initially empty)
  - linked with wishlist by reference or logic

- **Wishlist** collection
  - Stores user-specific wishlist items

---

## 🔑 Core Pages & Functionality

- **Home Page** — display featured artworks
- **Art Pages** — filter by type: charcoal, digital, acrylic, handmade
- **Artwork Detail Page** — view full info, add to cart or wishlist
- **Cart Page** — view & manage cart (authenticated users only)
- **Wishlist Page** — view & manage wishlist (authenticated users only)
- **Reviews** — authenticated users who purchased can leave reviews
- **Admin Dashboard** — manage artworks, upload images with Multer.

---

## 🚀 Getting Started

### Clone & Install
```bash
git clone https://github.com/your-username/artistic.git
cd artistic
npm install
cd client
npm install
npm start
cd server
npm install
node index.js
