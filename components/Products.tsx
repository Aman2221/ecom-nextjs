"use client";
import React, { useEffect, useState } from "react";
import { type_products } from "../interfaces/product";

const Products = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productInfo, setProductsInto] = useState<type_products[]>([]);
  const [categories, setCaregories] = useState([]);
  const handleProduct = async () => {
    await fetch("/api")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setProductsInto(json);
        const temp: any = new Set(
          json.map((item: type_products) => item.category)
        );
        setCaregories([...temp] as any);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleProduct();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="p-5">
          <div>
            <h2
              className="text-2xl"
              onClick={() =>
                console.log("productInfo :", productInfo, categories)
              }
            >
              Mobiles
            </h2>
            <div className="py-4"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
