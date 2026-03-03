import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";

const FoodContext = createContext();

const FoodContextProvider = ({ children }) => {

  const delivery_fee = 15;
  const currency = "₹";

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= ADD TO CART ================= */
  const addToCart = async (itemId) => {

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setCartItems(prev => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1
        }));
        toast.success("Added to cart");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  /* ================= UPDATE QUANTITY ================= */
  const updateQuantity = async (itemId, quantity) => {

    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setCartItems(prev => ({
          ...prev,
          [itemId]: quantity
        }));
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  /* ================= GET CART COUNT ================= */
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  /* ================= GET CART AMOUNT ================= */
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find(p => String(p._id) === String(id));
      return item ? total + item.price * qty : total;
    }, 0);
  };

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {

    const fetchProducts = async () => {

      setLoading(true);

      try {
        const response = await axios.get(`${backendUrl}/api/product/list`);

        if (response.data.success) {
          setProducts(response.data.products || []);
        }

      } catch (error) {
        toast.error(error.message);
      }

      setLoading(false);
    };

    fetchProducts();

  }, []);

  /* ================= FETCH USER CART ================= */
  useEffect(() => {

    const fetchCart = async () => {

      if (!token) return;

      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          setCartItems(response.data.cartData || {});
        }

      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };

    fetchCart();

  }, [token]);

  return (
    <FoodContext.Provider
      value={{
        products,
        loading,
        cartItems,
        setCartItems,
        currency,
        delivery_fee,
        getCartAmount,
        getCartCount,
        addToCart,
        updateQuantity,
        token,
        setToken,
        navigate
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export { FoodContext };
export default FoodContextProvider;