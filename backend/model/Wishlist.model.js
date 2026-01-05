const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema(
  {
    userID: { type: String, required: true },
    items: [
      {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        size: { type: String },
        color: { type: String },
        rating: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const WishlistModel = mongoose.model('wishlist', wishlistSchema);

module.exports = WishlistModel;
