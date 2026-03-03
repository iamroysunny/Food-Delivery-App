import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

import { placeOrder, placeOrdersStripe, allOrder, userOrder, updateStatus, verifyStripe } 
from "../controller/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post('/list', adminAuth, allOrder);
orderRouter.post('/status', adminAuth, updateStatus);

orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrdersStripe);

orderRouter.post('/userorders', authUser, userOrder);
orderRouter.post('/verifyStripe', authUser, verifyStripe);

export default orderRouter;