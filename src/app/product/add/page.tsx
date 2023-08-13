"use client";

import Navbar from "@/components/Navbar";
import HeadTitle from "@/components/HeadTitle";
import MainBody from "@/components/MainBody";
import AddProduct from "@/components/AddProduct";
import { brands, categories, colors } from "@/utils/productConfig";
import axios from "axios";
import { useState } from "react";

export default function ProfilePage() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    brand: brands[0],
    category: categories[0][0],
    size: categories[0][1],
    color: "",
    image: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(product.size);
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
        />
      </MainBody>
    </div>
  );
}
