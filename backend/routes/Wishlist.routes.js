const { Router } = require('express');
const WishlistModel = require('../model/Wishlist.model');
const { MustBeSigned } = require('../middleware/authenticate');

const wishlistRouter = Router();

// Logger
wishlistRouter.use((req, res, next) => {
  console.log('[WishlistRouter]', req.method, req.path);
  next();
});

// Get user's wishlist
wishlistRouter.get('/', MustBeSigned, async (req, res) => {
  try {
    const userID = req.body.userID || req.user?._id;
    if (!userID) {
      return res.status(400).send({ msg: 'User ID not found' });
    }
    const wishlist = await WishlistModel.findOne({ userID });
    res.send(wishlist?.items || []);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Add item to wishlist
wishlistRouter.post('/add', MustBeSigned, async (req, res) => {
  try {
    const userID = req.body.userID || req.user?._id;
    const item = req.body.item;

    if (!userID) {
      return res.status(400).send({ msg: 'User ID not found' });
    }

    if (!item || !item._id) {
      return res.status(400).send({ msg: 'item with _id is required' });
    }

    // Find or create wishlist for user
    let wishlist = await WishlistModel.findOne({ userID });

    if (!wishlist) {
      wishlist = await WishlistModel.create({ userID, items: [item] });
    } else {
      // Check if item already exists
      const exists = wishlist.items.some((i) => i._id === item._id);
      if (!exists) {
        wishlist.items.push(item);
        await wishlist.save();
      }
    }

    res.send({ msg: 'Item added to wishlist', items: wishlist.items });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Remove item from wishlist
wishlistRouter.delete('/remove/:itemId', MustBeSigned, async (req, res) => {
  try {
    const userID = req.body.userID || req.user?._id;
    const { itemId } = req.params;

    if (!userID) {
      return res.status(400).send({ msg: 'User ID not found' });
    }

    const wishlist = await WishlistModel.findOne({ userID });
    if (!wishlist) {
      return res.status(404).send({ msg: 'Wishlist not found' });
    }

    // Filter out the item
    wishlist.items = wishlist.items.filter((i) => i._id !== itemId);
    await wishlist.save();

    res.send({ msg: 'Item removed from wishlist', items: wishlist.items });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

// Clear entire wishlist
wishlistRouter.delete('/clear', MustBeSigned, async (req, res) => {
  try {
    const userID = req.body.userID || req.user?._id;

    if (!userID) {
      return res.status(400).send({ msg: 'User ID not found' });
    }

    await WishlistModel.findOneAndUpdate(
      { userID },
      { items: [] },
      { new: true }
    );

    res.send({ msg: 'Wishlist cleared' });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = wishlistRouter;
