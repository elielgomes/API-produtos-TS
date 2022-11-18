import path from "node:path";
import express from "express";
import mongoose from "mongoose";
import { router } from "./router";
require("dotenv").config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.tayeddq.mongodb.net/API-Typescript?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    const app = express();

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );

    app.use(express.json());
    app.use(router);

    app.listen(3001, () => {
      console.log("Server is running on http://localhost:3001");
    });
  })
  .catch(() => console.log("Error connecting to mongodb!"));
