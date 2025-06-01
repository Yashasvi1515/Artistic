// routes/wishlist.js
const router = express.Router();
import express from "express";
import Wishlist from '../Models/Wishlist';

// Add or remove product from wishlist
router.post('/toggle', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const existing = await Wishlist.findOne({ userId, productId });

    if (existing) {
      await Wishlist.deleteOne({ _id: existing._id });
      return res.json({ message: 'Removed from wishlist', isWished: false });
    } else {
      await Wishlist.create({ userId, productId });
      return res.json({ message: 'Added to wishlist', isWished: true });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get all wishlist items for a user
router.get('/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.params.userId }).populate('productId');
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
