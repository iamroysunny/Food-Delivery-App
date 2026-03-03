import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const currency = "inr";
const deliveryCharge = 50;

// ===============================
// PLACE ORDER (COD)
// ===============================
const placeOrder = async (req, res) => {
    try {
        const { amount, address } = req.body;
        const userId = req.userId;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const items = Object.entries(userData.cartData).map(([itemId, quantity]) => ({
            itemId,
            quantity
        }));

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// ===============================
// PLACE ORDER STRIPE
// ===============================
const placeOrdersStripe = async (req, res) => {
    try {
        const { amount, address } = req.body;
        const userId = req.userId;
        const { origin } = req.headers;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const items = await Promise.all(
            Object.entries(userData.cartData).map(async ([itemId, quantity]) => {
                const product = await productModel.findById(itemId);
                if (!product) throw new Error("Product not found");

                return {
                    name: product.name,
                    price: product.price,
                    quantity
                };
            })
        );

        if (items.length === 0) {
            return res.json({ success: false, message: "Cart is empty" });
        }

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: { name: "Delivery Charge" },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment"
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// ===============================
// VERIFY STRIPE
// ===============================
const verifyStripe = async (req, res) => {
    try {
        const { success, orderId } = req.body;

        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// ===============================
// ALL ORDERS (ADMIN)
// ===============================
const allOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};


// ===============================
// USER ORDERS
// ===============================
const userOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};


// ===============================
// UPDATE STATUS (ADMIN)
// ===============================
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
};


export {
    placeOrder,
    placeOrdersStripe,
    verifyStripe,
    allOrder,
    userOrder,
    updateStatus
};