import path from "node:path";
import { Router } from "express";
import multer from "multer";

import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategory";
import { deleteCategory } from "./app/useCases/categories/deleteCategory";

import { listProducts } from "./app/useCases/products/listProducts";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { deleteProduct } from "./app/useCases/products/deleteProduct";

import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback){
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  }),
});

//List categories
router.get("/categories", listCategories);
//Create categories
router.post("/categories", createCategories);
//Delete categories
router.delete("/categories/:categoryId", deleteCategory);


//List products
router.get("/products", listProducts);
//Create products
router.post("/products", upload.single("image"), createProduct);
//Get product by category
router.get("/categories/:categoryId/products", listProductsByCategory);
//Delete product
router.delete("/products/:productId", deleteProduct);

//List orders
router.get("/orders", listOrders);
//Create order
router.post("/orders", createOrder);
//Change order status
router.patch("/orders/:orderId", changeOrderStatus);
//Delete/cancel order
router.delete("/orders/:orderId", cancelOrder)