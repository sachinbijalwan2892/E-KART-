// controllers/wishlistController.js
import Wishlist from '../models/wishlistModel.js';
import Product from '../models/productModel.js';

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

   
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else {
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    
    const wishlist = await Wishlist.findOne({ user: userId }).populate('products');

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist is empty' });
    }

    res.status(200).json({ wishlist });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { addToWishlist, removeFromWishlist, getWishlist };
