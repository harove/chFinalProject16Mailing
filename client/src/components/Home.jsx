import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Cart from "./Cart";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  useEffect(() => {
    fetch("/api/products?page=1")
      .then((stream) => {
        return stream.json();
      })
      .then((data) => {
        setProducts(data.payload);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 xl:grid xl:grid-cols-auto-fit">
          <ProductList products={products} addToCart={addToCart} />
        </div>
        <div className="md:col-span-4">
          <Cart cart={cart} removeFromCart={removeFromCart} />
        </div>
      </div>
    </div>
  );
}

export default Home;
