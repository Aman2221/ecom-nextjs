"use client";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [productInfo, setProductsInto] = useState([]);

  const handleProduct = async () => {
    // await fetch("/api/product")
    //   .then((response) => {
    //     console.log("res :", response);
    //     return response.json();
    //   })
    //   .then((json) => {
    //     console.log("json:", json);
    //     // setProductsInto(json);
    //   });

    const response = await fetch("/api/product");
    const movies = await response.json();
    console.log(response, movies);
  };
  useEffect(() => {
    handleProduct();
  }, []);

  return (
    <div className="p-5">
      <div>
        <h2
          className="text-2xl"
          // onClick={() => console.log("productInfo :", productInfo)}
        >
          Mobiles
        </h2>
        <div className="py-4"></div>
        <div className="w-64">
          <div className="bg-blue-100 p-5 rounded">
            <img src="/img/iphone.png" alt="" />
          </div>
          <div className="mt-2">
            <h3 className="font-bold text-lg">iPhone 14 pro</h3>
          </div>
          <p className="text-small mt-1 leading-4"> </p>
          <div className="flex mt-1 items-center">
            <div className="text-2xl font-bold grow">$899</div>
            <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
