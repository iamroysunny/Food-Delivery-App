// Food Images
import biryani from "./images/biryani.png";
import butterChicken from "./images/butter_chicken.jpg";
import dosa from "./images/dosa.jpg";
import idli from "./images/idli.jpg";
import samosa from "./images/samosa.jpg";
import paneerTikka from "./images/paneer_tikka.jpg";
import gulabJamun from "./images/gulab_jamun.jpg";
import rasgulla from "./images/rasgulla.jpg";

// Payment Logos
import stripe_logo from "./Stripe_logo.png";

// ✅ Category List
export const categoryItem = [
  { category_title: "All" },
  { category_title: "Biryani" },
  { category_title: "Butter Chicken" },
  { category_title: "Dosa" },
  { category_title: "Idli" },
  { category_title: "Samosa" },
  { category_title: "Paneer Tikka" },
  { category_title: "Gulab Jamun" },
  { category_title: "Rasgulla" },
];

// ✅ Assets Object (ONLY this will be used everywhere)
export const assets = {
  stripe_logo,
};

// ✅ Product List
export const product = [
  {
    _id: 1,
    name: "Chicken Biryani",
    price: 180,
    image: biryani,
    category: "Biryani",
    description:
      "Aromatic basmati rice cooked with tender chicken, rich spices, and traditional Indian flavors.",
  },
  {
    _id: 2,
    name: "Butter Chicken",
    price: 220,
    image: butterChicken,
    category: "Butter Chicken",
    description:
      "Creamy tomato-based curry with soft, juicy chicken pieces and buttery taste.",
  },
  {
    _id: 3,
    name: "Masala Dosa",
    price: 90,
    image: dosa,
    category: "Dosa",
    description:
      "Crispy South Indian dosa filled with spicy mashed potato and served with chutney & sambhar.",
  },
  {
    _id: 4,
    name: "Idli Sambhar",
    price: 60,
    image: idli,
    category: "Idli",
    description:
      "Soft steamed rice cakes served with hot sambhar and coconut chutney.",
  },
  {
    _id: 5,
    name: "Samosa",
    price: 20,
    image: samosa,
    category: "Samosa",
    description:
      "Deep-fried crispy pastry stuffed with spicy potato and peas filling.",
  },
  {
    _id: 6,
    name: "Paneer Tikka",
    price: 160,
    image: paneerTikka,
    category: "Paneer Tikka",
    description:
      "Grilled cottage cheese cubes marinated in yogurt and traditional spices.",
  },
  {
    _id: 7,
    name: "Gulab Jamun",
    price: 50,
    image: gulabJamun,
    category: "Gulab Jamun",
    description:
      "Soft milk-solid dumplings soaked in warm sugar syrup with cardamom flavor.",
  },
  {
    _id: 8,
    name: "Rasgulla",
    price: 50,
    image: rasgulla,
    category: "Rasgulla",
    description:
      "Spongy white cheese balls dipped in light sugar syrup, famous Bengali sweet.",
  },
];
