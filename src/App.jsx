import { createRoot } from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Products from './pages/homepage/Products';
import ShoppingCart from './pages/shoppingcart/ShoppingCart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [promoCode, setPromoCode] = useState(1);

    // Fetchar data från Firebase för produkter
    useEffect(() => {
        async function fetchData() {
            const url = `https://webshop-c580c-default-rtdb.europe-west1.firebasedatabase.app/products.json`
            const response = await fetch(url)
            const data = await response.json()
            setProducts(data);
        }
        fetchData()

    }, [])


    // Skapar en default minneplats i Cart useState 
    useEffect(() => {
        const defaultCard = {}
        products.forEach((product) => {
            defaultCard[product.id] = 0
        })
        setCart(defaultCard)
    }, [products])

    // Sparar produkter i Cart
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