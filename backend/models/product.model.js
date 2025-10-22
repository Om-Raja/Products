import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://img.freepik.com/free-vector/gradient-mystery-box-illustration_23-2149532747.jpg?semt=ais_hybrid&w=740&q=80",
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;