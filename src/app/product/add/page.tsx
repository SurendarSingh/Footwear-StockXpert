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
    price: "",
    brand: "",
    category: "",
    size: {},
    color: "",
    image: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(product);
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
