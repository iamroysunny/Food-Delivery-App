import React, { useContext } from 'react';
import { FoodContext } from '../../context/FoodContext';
import './CartTotal.css';

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useContext(FoodContext); // ✅ fixed

  const subtotal = getCartAmount() || 0;
  const delivery = delivery_fee || 0;   // ✅ fixed
  const total = subtotal + delivery;

  return (
    <div>
      <div className="cart-total-container">
        <div className="cart-title">
          <h2>Cart Totals</h2>
        </div>

        <div className="cart_details">
          <div className="cart-row">
            <p>Subtotal</p>
            <p>{currency}{subtotal}</p>
          </div>

          <hr className="cart-divider" />

          <div className="cart-row">
            <p>Delivery Fee</p> {/* spelling fixed */}
            <p>{currency}{delivery}</p>
          </div>

          <div className="cart-row cart-total">
            <b>Total</b>
            <b>{currency}{total}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;