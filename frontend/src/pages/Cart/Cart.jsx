import React, { useContext, useMemo } from "react";
import { FoodContext } from "../../context/FoodContext";
import { MdDelete } from "react-icons/md";
import CartTotal from "../../components/CartTotal/CartTotal";
import "./Cart.css";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate
  } = useContext(FoodContext);

  const cartData = useMemo(() => {
    return Object.entries(cartItems)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => ({ _id: id, quantity: qty }));
  }, [cartItems]);

  return (
    <>
      <h2>Cart Items</h2>

      <div className="cart-content-cotainer">
        {cartData.map((item) => {
          const productData = products.find(
            (p) => String(p._id) === String(item._id)
          );
          if (!productData) return null;

          return (
            <div className="cart-item" key={item._id}>
              <div className="cart-product">
                <img
                  src={productData.image}
                  alt={productData.name}
                  className="product-cart-image"
                />
                <p className="cart-product-name">
                  {productData.name}
                </p>
              </div>

              <p className="cart-product-price">
                {currency}{productData.price}
              </p>

              <input
                type="number"
                min={1}
                value={item.quantity}
                className="quantity-input"
                onChange={(e) =>
                  updateQuantity(
                    item._id,
                    Number(e.target.value)
                  )
                }
              />

              <MdDelete
                className="delete-icon"
                onClick={() => updateQuantity(item._id, 0)}
              />
            </div>
          );
        })}
      </div>

      <div className="checkout-container">
        <div className="checkout-box">
          <CartTotal />
          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
