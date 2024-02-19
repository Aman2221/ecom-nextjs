import { ProductContext } from "@/context/ProductContext";
import { type_products } from "@/interfaces/product";
import React, { useContext } from "react";

const Product = ({ product }: { product: type_products }) => {
  const { setSelectedProducts }: any = useContext(ProductContext);
  const handleAddToCart = () => {
    setSelectedProducts((prev: string[]) => [...prev, product._id]);
  };

  const deletedProduct = async (id: string) => {
    try {
      const res = await fetch("/api/delete-product", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log("res :", res);
    } catch (error) {
      console.log(error);
    }
  };
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
        {/* <button
          onClick={() => deletedProduct(product._id)}
          className="bg-emerald-400 text-white py-1 px-3 rounded-xl"
        >
          D
        </button> */}
      </div>
    </div>
  );
};

export default Product;
