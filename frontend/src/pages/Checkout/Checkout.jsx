import React, { useContext, useState } from "react";
import stripe from "../../assets/Stripe_logo.png";
import "./Checkout.css";
import CartTotal from "../../components/CartTotal/CartTotal";
import { FoodContext } from "../../context/FoodContext";
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";

const Checkout = () => {

  const [method, setMethod] = useState("cod");

  const {
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    token,
    navigate,
    products
  } = useContext(FoodContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    state: "",
    phone: "",
    location: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({
      ...data,
      [name]: value
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("Login to place order");
      navigate("/login");
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === items)
          );

          if (itemInfo) {
            itemInfo.quantity = cartItems[items];
            orderItems.push(itemInfo);
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {

        case "cod": {

          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;
        }

        case "stripe": {

          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }

          break;
        }

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <form className="from-container" onSubmit={onSubmitHandler}>
        <div className="form-left">

          <fieldset className="Payment-method">
            <legend>Payment Options</legend>
            <div className="payment-options">

              <div
                onClick={() => setMethod("stripe")}
                className={`payment-option ${method === "stripe" ? "selected" : ""}`}
              >
                <img src={stripe} alt="" className="Payment-logo" />
              </div>

              <div
                onClick={() => setMethod("cod")}
                className={`payment-option ${method === "cod" ? "selected" : ""}`}
              >
                <span className="payment-text">CASH ON DELIVERY</span>
              </div>

            </div>
          </fieldset>

          <div className="form-title">
            <h2>Shipping Address</h2>
          </div>

          <div className="form-row">
            <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} className="form-input" placeholder="First Name" />
            <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} className="form-input" placeholder="Last Name" />
          </div>

          <input type="email" name="email" value={formData.email} onChange={onChangeHandler} className="form-input" placeholder="Email Address" />
          <input type="text" name="phone" value={formData.phone} onChange={onChangeHandler} className="form-input" placeholder="Phone Number" />
          <input type="text" name="street" value={formData.street} onChange={onChangeHandler} className="form-input" placeholder="Street Address" />

          <div className="form-row">
            <input type="text" name="city" value={formData.city} onChange={onChangeHandler} className="form-input" placeholder="City" />
            <input type="text" name="state" value={formData.state} onChange={onChangeHandler} className="form-input" placeholder="State" />
          </div>

          <div className="form-row">
            <input type="text" name="zipcode" value={formData.zipcode} onChange={onChangeHandler} className="form-input" placeholder="Zipcode" />
            <input type="text" name="location" value={formData.location} onChange={onChangeHandler} className="form-input" placeholder="Location" />
          </div>

        </div>

        <div className="form-right">
          <CartTotal />
          <div className="form-submit">
            <button type="submit">Place Order</button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Checkout;