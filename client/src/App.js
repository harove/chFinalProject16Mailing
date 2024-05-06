import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";

const About = () => <div>About</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
