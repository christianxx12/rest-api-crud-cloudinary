import { Router } from "express";
import fileUpload from "express-fileupload";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} from "../controllers/products.controllers.js";

const router = Router();

router
  .get("/products", getProducts)
  .post(
    "/products",
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./uploads",
    }),
    createProduct
  )
  .put("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct)
  .get("/products/:id", getProduct);

export default router;
