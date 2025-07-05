import express from "express";
import Cart from "../Models/Cart.js";

const router = express.Router();


router.get("/cart/:email", async (req, res) => {
  try {
    let cart = await Cart.findOne({ userEmail: req.params.email });
    if (!cart) {
     
      cart = new Cart({ userEmail: req.params.email, items: {} });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req, res) => {
  const { email, items } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    let cart = await Cart.findOne({ userEmail: email });
    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = new Cart({ userEmail: email, items });
      await cart.save();
    }
    res.json({ message: "Cart saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
