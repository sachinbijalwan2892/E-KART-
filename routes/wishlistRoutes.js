import express from 'express';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from '../controllers/wishlistController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';
//import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add product to wishlist (productId as URL param)
router.post('/add/:productId',requireSignIn, addToWishlist);

// Remove product from wishlist (productId as URL param)
router.post('/remove/:productId',requireSignIn,  removeFromWishlist);

// Get user's wishlist
router.get('/',requireSignIn,  getWishlist);

export default router;
