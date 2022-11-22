import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function editProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const imagePath = req.file?.filename;

    const {
      name,
      description,
      currentPrice,
      oldPrice,
      quantityStock,
      category,
    } = req.body;

    const productEdit = {
      name,
      imagePath,
      description,
      currentPrice: Number(currentPrice),
      oldPrice: Number(oldPrice),
      quantityStock: Number(quantityStock),
      category,
    };

    await Product.findByIdAndUpdate(productId, productEdit);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
