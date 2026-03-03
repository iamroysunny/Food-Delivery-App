import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controller/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

/* ======================
   ADMIN ROUTES
   ====================== */

productRouter.post(
  '/add',
  adminAuth,                 // ✅ auth
  upload.single("image"),    // ✅ multer
  addProduct
);

productRouter.post(
  '/remove',
  adminAuth,
  removeProduct
);

/* ======================
   PUBLIC ROUTES
   ====================== */

productRouter.get(
  '/list',
  listProduct                // ✅ auth REMOVED
);

productRouter.post(
  '/single',
  singleProduct
);

export default productRouter;
