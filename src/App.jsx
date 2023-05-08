import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';


function App() {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [promoCode, setPromoCode] = useState(1);

    useEffect(() => {
        // Fetcha information om produkter från Firebase
        async function fetchData() {
          const url = `https://webshop-c580c-default-rtdb.europe-west1.firebasedatabase.app/products.json`
          const response = await fetch(url)
          const data = await response.json()
          setProducts(data)
      
          // Initialisera objektet baserat på hämtade produkter
          const defaultCart = {}
          data.forEach((product) => {
            defaultCart[product.id] = 0
          })
          setCart(defaultCart)
        }
        fetchData()
      }, [])
      

    // Sparar produkter i Cart vid klick "add to cart"
    function addItemInCart(id) {
        setCart((prevCart) => ({
            ...prevCart,
            [id]: prevCart[id] + 1
        }));
    }

    return (
        <div className='App'>
            <Router>
                <Navbar cart={cart} />
                <Routes>
                    <Route path="/" element={<Products cart={cart} addItemInCart={addItemInCart} database={products} promoCode={promoCode} />} />
                    <Route path="/cart" element={<ShoppingCart promoCode={promoCode} setPromoCode={setPromoCode} products={products} cart={cart} setCart={setCart} />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);