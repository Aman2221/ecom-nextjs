"use client";
import React, { useEffect, useState } from "react";
import { type_products } from "../interfaces/product";
import Product from "./product";

const Products = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [productInfo, setProductsInto] = useState<type_products[]>([]);
  const [filterdProd, setFilterdProd] = useState<type_products[]>([]);
  const [categories, setCaregories] = useState([]);
  const [searchKey, setSerachKey] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setSerachKey(value);
    if (value.length > 3) {
      const fil_prod = productInfo.filter((prod) =>
        prod.name.toLowerCase().includes(value)
      );
      setFilterdProd(fil_prod);
    } else {
      setFilterdProd([]);
    }
  };
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
          <input
            value={searchKey}
            onChange={handleSearch}
            type="text"
            placeholder="Search for product..."
            className="bg-gray-100 w-full w-100 py-2 px-4 rounded-xl"
          />
          <div className="mt-5">
            {categories.map((category: string) => {
              return (
                <div key={category}>
                  {!filterdProd.length && (
                    <h2 key={category} className="capitalize py-2 text-2xl">
                      {category}
                    </h2>
                  )}
                  <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                    {filterdProd.length
                      ? filterdProd
                          .filter((product) => product.category == category)
                          .map((product) => (
                            <div className="px-5 snap-start" key={product._id}>
                              <Product product={product} />
                            </div>
                          ))
                      : productInfo
                          .filter((product) => product.category == category)
                          .map((product) => (
                            <div className="px-5 snap-start" key={product._id}>
                              <Product product={product} />
                            </div>
                          ))}
                  </div>
                </div>
              );
            })}
            <div className="py-4"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
