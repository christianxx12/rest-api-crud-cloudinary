import Product from "../models/product.model.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";
import fs from "fs-extra";

// Obtener todos los productos
export async function getProducts(req, res) {
  try {
    const products = await Product.find();

    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      mensaje: error.message,
    });
  }
}
// Obtener un solo producto
export async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    return res.send(product);
  } catch (error) {
    return res.status(500).json({
      mensaje: error.message,
    });
  }
}

// Crear un producto
export async function createProduct(req, res) {
  try {
    const { name, description, price } = req.body;

    const product = new Product({
      name,
      description,
      price,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      console.log(result);
      product.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };

      await fs.unlink(req.files.image.tempFilePath);
    }

    await product.save();

    res.json(product);
  } catch (error) {
    return res.status(500).json({
      mensaje: error.message,
    });
  }
}

// Actualizar un producto
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const productUpdated = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );

    return res.json(productUpdated);
  } catch (error) {
    return res.status(500).json({
      mensaje: error.message,
    });
  }
}

// Eliminar un producto
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        mensaje: `Producto con id ${id} no existe `,
      });
    }

    if (product.image?.public_id) {
      await deleteImage(product.image.public_id);
    }

    return res.send(product);
  } catch (error) {
    return res.status(500).json({
      mensaje: error.message,
    });
  }
}
