import { Request, Response } from "express";
import { Product } from "../../models/Product";

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const {
      name,
      description,
      currentPrice,
      oldPrice,
      quantityStock,
      category,
    } = req.body;

   const product = await Product.create({
      name,
      imagePath,
      description,
      currentPrice: Number(currentPrice),
      oldPrice: Number(oldPrice),
      quantityStock: Number(quantityStock),
      category,
    });

    res.status(201).json(product)
    
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
