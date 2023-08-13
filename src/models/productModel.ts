import mongoose from "mongoose";
import { brands, categories, colors } from "@/utils/productConfig";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      capitalize: true,
      required: [true, "Please enter product name"],
    },
    price: {
      type: Number,
      set: (v: any) => Math.round(v),
      required: [true, "Please enter price"],
    },
    color: {
      type: String,
      enum: colors,
      required: [true, "Please select color"],
    },
    brand: {
      type: String,
      enum: brands,
      required: [true, "Please select brand"],
    },
    category: {
      type: String,
      enum: categories,
      required: [true, "Please select category"],
    },
    image: {
      type: Buffer,
      required: [true, "Please upload the imgae"],
    },
    size: {
      type: Object,
      required: [true, "Please select size"],
      validate: {
        validator: function (v: any) {
          return Object.values(v).some((val: any) => val > 0);
        },
        message: "Please select size",
      },
    },
  },
  {
    timestamps: true,
  }
);

const productModel =
  mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;
