import React from "react";
import { useWishlist } from "../context/wishlistContext";
import { useNavigate } from "react-router-dom";
//import Layout from "../components/Layout/Layout";
import "./wishlist.css";


const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="wishlist-container">
    <h1 className="wishlist-title">Your Wishlist</h1>
    <div className="row">
      {wishlist?.length === 0 ? (
        <p className="empty-message">Your wishlist is empty. Add some items!</p>
      ) : (
        wishlist.map((product) => (
          <div className="col-md-3" key={product._id}>
            <div className="wishlist-card">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
              <div className="wishlist-card-body">
                <h5 className="wishlist-card-title">{product.name}</h5>
                <p className="wishlist-card-price">₹ {product.price}</p>
                <button
                  className="btn-view"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  View Details
                </button>
                <button
                  className="btn-remove"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  
  );
};

export default WishlistPage;
