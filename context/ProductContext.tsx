"use client";
import { createContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductContext = createContext({});

export const ProductContextProvider = ({ child }: { child: JSX.Element }) => {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    defaultValue: [],
  });
  return (
    <ProductContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {child}
    </ProductContext.Provider>
  );
};
