"use client";

import Navbar from "@/components/Navbar";
import HeadTitle from "@/components/HeadTitle";
import MainBody from "@/components/MainBody";
import AddProduct from "@/components/AddProduct";
import { brands, categories, colors } from "@/utils/productConfig";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: brands[0],
    category: categories[0][0] as string,
    size: categories[0][1] as { [key: number]: number },
    color: "",
    image: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!product.name) {
        toast.error("Please enter name");
        return;
      } else if (!product.price) {
        toast.error("Please enter price");
        return;
      } else if (!product.color) {
        toast.error("Please select color");
        return;
      } else if (!product.image) {
        toast.error("Please upload image");
        return;
      }
      const formData = new FormData();
      formData.append("productDetails", JSON.stringify(product));
      formData.append("productImage", product.image);
      const res = await axios.post("/api/product/add", formData);
      console.log(res.data);
    } catch (error) {
      console.log("Error in adding product", error);
    }
  };

  return (
    <div>
      <Navbar />
      <HeadTitle title="Add Product" />
      <MainBody>
        <AddProduct
          handleSubmit={handleSubmit}
          product={product}
          setProduct={setProduct}
          brands={brands}
          categories={categories}
          colors={colors}
        />
      </MainBody>
    </div>
  );
}
