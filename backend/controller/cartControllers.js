import userModel from "../models/userModels.js";

// ================= ADD TO CART =================
const addToCart = async (req, res) => {
    try {

        const userId = req.userId;      // ✅ FIXED
        const { itemId } = req.body;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Product added to cart' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ================= UPDATE CART =================
const updateCart = async (req, res) => {
    try {

        const userId = req.userId;   // ✅ FIXED
        const { itemId, quantity } = req.body;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        let cartData = userData.cartData || {};

        cartData[itemId] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: 'Cart Updated' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ================= GET USER CART =================
const getUserCart = async (req, res) => {
    try {

        const userId = req.userId;   // ✅ FIXED

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        const cartData = userData.cartData || {};

        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };