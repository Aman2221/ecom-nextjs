"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/context/ProductContext";
import { type_products } from "@/interfaces/product";

const CartPage = () => {
  const { selectedProducts }: any = useContext(ProductContext);
  const [productsInfo, setProductsInfo] = useState([]);

  const getCartProducts = () => {
    try {
      const product_ids: unknown = new Set(selectedProducts);
      const uniqe_ids = [...(product_ids as string[])];
      console.log("uniqe_ids :", uniqe_ids);
      fetch("/api?ids=" + uniqe_ids.join(","))
        .then((response) => response.json())
        .then((json) => setProductsInfo(json));
    } catch (e) {
      console.log("message", e);
    }
  };

  useEffect(() => {
    getCartProducts();
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
              <div className="pl-4 grow">
                <h4 className="font-bold text-lg">{product.name}</h4>
                <p className="text-sm leading-4 text-gray-500">
                  {product.description}
                </p>
                <div className="flex w-100">
                  <div className="grow">{product.price}</div>
                  <div>
                    <button className="border border-emerald-500 px-2 rounded-lg text-emerald-500">
                      -
                    </button>
                    <span className="px-2">
                      {
                        selectedProducts.filter(
                          (id: string) => id === product._id
                        ).length
                      }
                    </span>

                    <button className="bg-emerald-500 px-2 rounded-lg text-white">
                      +
                    </button>
                  </div>
                </div>
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
