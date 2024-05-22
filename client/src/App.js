import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import UploadPicture from "./components/UploadPicture";
import Navbar from "./components/NavBar";
import axios from "axios";

const About = () => <div>About</div>;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);


  const handleLogout = () => {}

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/sesiones/current');
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUserData(response.data);
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCurrentUser();
  

  }, [])
  

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/upload" element={<UploadPicture />} />
      {/* Add other routes here */}
    </Routes>
  </div>
  );
}

export default App;
