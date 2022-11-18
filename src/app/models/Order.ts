import { model, Schema } from "mongoose";

export const Order = model(
  "Order",
  new Schema({
    address: {
      required: true,
      type: {
        zipCode:{
          type: String,
          required: true,
        },
        number: {
          type: Number,
          required: true,
        },
        complement: {
          type: String,
          required: false,
        }
      }
    },
    status: {
      type: String,
      enum: ["WAITING", "ON_THE_WAY", "DELIVERED"],
      default: "WAITING",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    products: {
      required: true,
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
  })
);
