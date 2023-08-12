"use client";

import Navbar from "@/components/Navbar";
import HeadTitle from "@/components/HeadTitle";
import MainBody from "@/components/MainBody";
import AddProduct from "@/components/AddProduct";
import { brands, categories, colors, sizes } from "@/utils/productConfig";
import axios from "axios";
import { useState } from "react";

export default function ProfilePage() {
  const [product, setProduct] = useState({
    name: "",
    price: null,
    brand: "",
    category: "",
    size: {},
    color: "",
    image: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/product", product);
      console.log(res);
    } catch (error) {
      console.log(error);
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
          sizes={sizes}
        />
      </MainBody>
    </div>
  );
}
