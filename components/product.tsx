import { type_products } from "@/interfaces/product";
import React from "react";

const Product = ({ product }: { product: type_products }) => {
  const handleAddToCart = () => {};
  return (
    <div className="w-64">
      <div className="bg-blue-100 p-5 rounded-xl">
        <img src={product.url} alt="product img" />
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{product.name}</h3>
      </div>
      <p className="text-sm mt-1 leading-4">{product.description}</p>
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">{product.price}</div>
        <button
          onClick={handleAddToCart}
          className="bg-emerald-400 text-white py-1 px-3 rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Product;