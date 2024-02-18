import HomePage from "@/components/Home";
import { ProductContext } from "@/context/ProductContext";
import { useContext, useEffect, useState } from "react";
export default function Home() {
  return (
    <div className="p-5">
      <HomePage />
    </div>
  );
}
