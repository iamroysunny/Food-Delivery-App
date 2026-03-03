import React from 'react';
import './Hero.css';
import hero_img from '../../assets/biryani.png';
import { FaShippingFast } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { MdPayment } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero_top">
        <div className="hero_left">
          <h2 className="subtitle">Enjoy Your Delicious Meal</h2>

          {/* IMPORTANT: use these exact class names */}
          <h2 className="hero_title">
            Fresh, Fast & Flavorful Food for <span className="brand_name">FoodWay</span>
          </h2>

          <p className="hero_desc">
            Experience the perfect blend of taste, quality and lightning-fast food
            delivery with FoodWay.
          </p>

          <button className="hero_btn">Explore Our Menu</button>
        </div>

        <div className="hero_right">
          {/* IMPORTANT: class name matches CSS (.hero_img) */}
          <img src={hero_img} alt="Delicious food" className="hero_img" />
        </div>
      </div>

      <div className="hero_buttom">
        <div className="hero_content">
          <div className="info_icon"><FiSend className="hero_icon" /></div>
          <div className="detail">
            <h3>Free Delivery</h3>
            <p>Free delivery on order</p>
          </div>
        </div>

        <div className="hero_content">
          <div className="info_icon"><BiSupport className="hero_icon" /></div>
          <div className="detail">
            <h3>Free Delivery All over India</h3>
            <p>We deliver to all States</p>
          </div>
        </div>

        <div className="hero_content">
          <div className="info_icon"><MdPayment className="hero_icon" /></div>
          <div className="detail">
            <h3>Secure Payment</h3>
            <p>Your payment is secure</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
