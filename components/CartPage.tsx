"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/context/ProductContext";
import { type_products } from "@/interfaces/product";

const CartPage = () => {
  const { selectedProducts }: any = useContext(ProductContext);
  const [productsInfo, setProductsInfo] = useState([]);

  const getCartProducts = () => {
    try {
    } catch (e) {
      console.log("message", e);
    }
  };
  useEffect(() => {
    const product_ids: unknown = new Set(selectedProducts);
    const uniqe_ids = [...(product_ids as string[])];
    fetch("/api?ids=" + uniqe_ids.join(","))
      .then((response) => response.json())
      .then((json) => setProductsInfo(json));
    console.log("uniqe_ids :", uniqe_ids);
  }, [selectedProducts]);
  return (
    <div>
      {productsInfo.length ? (
        productsInfo.map((product: type_products) => {
          return (
            <div className="flex mb-5" key={product._id}>
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img className="w-24" src={product.url} alt="" />
              </div>
              <div className="pl-4">
                <h4 className="font-bold text-lg">{product.name}</h4>
                <p className="text-sm leading-4 text-gray-500">
                  {product.description}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div>No products in your shopping cart</div>
      )}
    </div>
  );
};

export default CartPage;
