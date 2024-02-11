import Footer from "@/components/Footer";
import HomePage from "@/components/Home";
import { ProductContextProvider } from "@/context/ProductContext";

export default function Home() {
  return (
    <div className="p-5">
      <HomePage />
    </div>
  );
}
