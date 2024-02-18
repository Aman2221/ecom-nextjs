"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/context/ProductContext";
import { type_products } from "@/interfaces/product";

const CartPage = () => {
  const { selectedProducts, setSelectedProducts }: any =
    useContext(ProductContext);
  const [productsInfo, setProductsInfo] = useState<type_products[]>([]);
  const [orderSumary, setOrderSummary] = useState({
    subtotal: 0,
    delivery: 0,
  });
  const [userData, setUserData] = useState({
    street: "",
    city: "",
    email: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let key = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [key]: value });
  };
  const increaseProdQuan = (id: string) => {
    setSelectedProducts((prev: string[]) => [...prev, id]);
  };

  const decreaseProdQuan = (id: string) => {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev: string[]) => {
        return prev.filter((value: string, index: number) => index !== pos);
      });
    }
  };

  const getCartProducts = () => {
    try {
      const product_ids: unknown = new Set(selectedProducts);
      const uniqe_ids = [...(product_ids as string[])];
      fetch("/api?ids=" + uniqe_ids.join(","))
        .then((response) => response.json())
        .then((json: type_products[]) => {
          const arr_of_price: number[] = json.map((object: type_products) =>
            parseInt(object.price)
          );
          const sum = arr_of_price.reduce(
            (accumulator: number, currentValue: number) =>
              accumulator + currentValue,
            0
          );
          setOrderSummary({
            subtotal: sum,
            delivery: arr_of_price.filter((p) => p > 500).length * 40,
          });
          setProductsInfo(json);
        });
    } catch (e) {
      console.log("message", e);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, [selectedProducts]);

  return (
    <div className="p-5">
      {productsInfo.length ? (
        <div>
          {productsInfo.map((product: type_products) => {
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
                      <button
                        onClick={() => decreaseProdQuan(product._id)}
                        className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                      >
                        -
                      </button>
                      <span className="px-2">
                        {
                          selectedProducts.filter(
                            (id: string) => id === product._id
                          ).length
                        }
                      </span>

                      <button
                        onClick={() => increaseProdQuan(product._id)}
                        className="bg-emerald-500 px-2 rounded-lg text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <form action="/api/checkout" method="POST">
            <div>
              <input
                className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 outline-none"
                type="text"
                placeholder="Your name"
                onChange={handleChange}
                name="name"
                required
              />
              <input
                className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 outline-none"
                type="text"
                placeholder="Email address"
                onChange={handleChange}
                name="email"
                required
              />
              <input
                className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 outline-none"
                type="text"
                placeholder="Street address, number"
                onChange={handleChange}
                name="street"
                required
              />
              <input
                className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 outline-none"
                type="text"
                placeholder="City and postal code"
                onChange={handleChange}
                name="city"
                required
              />
              <div className="mt-4">
                <div className="flex my-3">
                  <h3 className="grow font-bold text-gray-400">Subtotal :</h3>
                  <h3>{orderSumary.subtotal}</h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex my-3">
                  <h3 className="grow font-bold text-gray-400">Delivery :</h3>
                  <h3>{orderSumary.delivery}</h3>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex my-3 border-t pt-3  border-dashed border-emerald-500">
                  <h3 className="grow font-bold text-gray-400">Total :</h3>
                  <h3>{orderSumary.delivery + orderSumary.subtotal}</h3>
                </div>
              </div>
            </div>
            <input
            className="hidden"
              type="hidden"
              name="product"
              value={selectedProducts.join(",")}
            />
            <button className="bg-emerald-500 px-5 py-2 text-white w-full rounded-xl font-bold my-4 shadow-emerald-200 shadow-lg">
              Pay
            </button>
          </form>
        </div>
      ) : (
        <div>No products in your shopping cart</div>
      )}
    </div>
  );
};

export default CartPage;
