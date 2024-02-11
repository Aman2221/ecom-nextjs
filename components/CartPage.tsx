"use client";
import React, { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import { ProductContext } from "@/context/ProductContext";

const CartPage = () => {
  const { selectedProducts }: any = useContext(ProductContext);
  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    const product_ids: unknown = new Set(selectedProducts);
    const uniqe_ids = [...(product_ids as string[])];

    console.log("uniqe_ids :", uniqe_ids);
  }, []);
  return <div></div>;
};

export default CartPage;
