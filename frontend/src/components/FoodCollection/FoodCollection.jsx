import React, { useContext, useState, useMemo } from "react";
import "./FoodCollection.css";
import { categoryItem } from "../../assets/assets";
import { FoodContext } from "../../context/FoodContext";

const FoodCollection = () => {

  const { products, addToCart, loading } = useContext(FoodContext);
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {

    if (!Array.isArray(products)) return [];

    if (category === "All") return products;

    return products.filter(item =>
      item.category
        ?.toLowerCase()
        .replace(/\s+/g, "")
        .includes(
          category.toLowerCase().replace(/\s+/g, "")
        )
    );

  }, [products, category]);

  return (
    <div className="food_container">

      <div className="header_section">
        <h1>Discover Our Menu</h1>
        <hr className="divider" />
      </div>

      <div className="display_container">

        <div className="category_section">
          <h1>Explore Our Categories</h1>

          <ul className="category_list">
            {categoryItem.map((item, index) => (
              <li
                key={index}
                onClick={() => setCategory(item.category_title)}
                className={category === item.category_title ? "active" : ""}
              >
                {item.category_title}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid_display">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length ? (
            filteredProducts.map(product => (
              <div key={product._id} className="product_card">

                {/* ✅ শুধু এই wrapper add করেছি */}
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <h3>{product.name}</h3>

                <div className="price-add">
                  <p>₹{product.price}</p>
                  <button onClick={() => addToCart(product._id)}>
                    Add To Cart
                  </button>
                </div>

              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default FoodCollection;
