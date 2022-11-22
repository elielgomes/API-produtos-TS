import path from "node:path";
import fs from "node:fs";
import { Request, Response } from "express";

export async function productImagePath(req: Request, res: Response) {
  try {
    const pathImage = req.params.path;
    fs.createReadStream(path.resolve("uploads", pathImage)).pipe(res);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
