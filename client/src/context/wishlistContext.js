import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const authData = JSON.parse(localStorage.getItem("auth"));
const token = authData?.token || null;


  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token]);

  // Base URL for API
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

  const fetchWishlist = async () => {
    if (!token) {
      setError("Authentication token is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/api/v1/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(data?.wishlist?.products || []);
    } catch (error) {
      setError("Failed to fetch wishlist. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v1/wishlist/add/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(data?.wishlist?.products || []);
    } catch (error) {
      setError("Failed to add item to wishlist.");
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/v1/wishlist/remove/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(data?.wishlist?.products || []);
    } catch (error) {
      setError("Failed to remove item from wishlist.");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        error,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
