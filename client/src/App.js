import {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [products, setProducts] = useState([])


  useEffect(() => {
    fetch('/api/products?page=1').then(stream=>{
      return stream.json()
    }).then(data=>{
      console.log(data)
      setProducts(data.payload)
    })
  }, [])
  
  return (
    <div className="App">
      {products.map(product => {
        return <div> 
          {product.title}
        </div>

      })}
    </div>
  );
}

export default App;
