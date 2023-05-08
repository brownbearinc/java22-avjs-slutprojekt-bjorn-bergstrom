import CartItem from "./CartItem";
import '../../css/ShoppingCart.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart({ promoCode, setPromoCode, products, cart, setCart }) {

	// ändra från state till let samt annan variabelnamn
	const [promoCodeValue, setPromoCodeValue] = useState('');

	const [totalPrice, setTotalPrice] = useState(0)
	const navigate = useNavigate()

	// Fetchar från Firebase och kontrollerar hur mycket rabatt får man från kampanjkoden 
	async function checkPromoCode(userPromoCode) {
		try {
			const url = `https://webshop-c580c-default-rtdb.europe-west1.firebasedatabase.app/promocode.json`;
			const response = await fetch(url);
			const data = await response.json();

			Object.entries(data).forEach(([id, discount]) => {

				console.log(id, userPromoCode);
				if (id === userPromoCode) {
					console.log('Discount:', discount);
					setPromoCode(discount); // Update the state  
				}
			});

		} catch (error) {
			console.log(error);
		}
	}

	// Kontrollerar det totala priset av alla varor i kundvagnen
	useEffect(() => {
		let totalPrice = 0;
		products.forEach((product) => {
			if (cart[product.id] !== 0) {
				totalPrice += cart[product.id] * product.price
			}
		});
		setTotalPrice(totalPrice);
	}, [products, cart]);

	// Tömma kundvagnen
	function handleReset() {
		const defaultCard = {}
		products.forEach((product) => {
			defaultCard[product.id] = 0
		})
		setCart(defaultCard)
	}

	// Köp-knappen 
	async function handleBuy() {

		Object.entries(cart).forEach(([itemID, quantity]) => {
			if (quantity !== 0) {

				// Ta fram varans nya lagersaldo
				const newStockBalance = products[itemID].stock_balance - quantity
				patchDatabase(itemID, newStockBalance)
			}
		})

		alert(`Congratulations, you are now $ ${totalPrice} poorer`)

		// Navigating to the start page
		navigate('/')

		// Tömma kundvagn
		handleReset()

		// Refresha sidan efter 0,5s 
		setTimeout(function () {
			location.reload();
		}, 500);

		// Hur uppdaterar man stock_balance på 
		// Products från firebase när man klickat i köpknappen?

	}

	// Uppdatera varans balance_stock på Firebase
	async function patchDatabase(productID, newStockBalance) {

		//Datan vi vill posta, egenskaperna väljer vi 
		const bodyContent = { stock_balance: newStockBalance };

		//Header-objektet, egenskaperna är bestämda
		const header = {
			"Content-type": "application/json; charset=UTF-8"
		}

		const option = {
			method: "PATCH", //Metoden som ska användas
			body: JSON.stringify(bodyContent), //Gör om datan till json
			headers: header //Header-objektet
		};

		const url = `https://webshop-c580c-default-rtdb.europe-west1.firebasedatabase.app/products/${productID}.json`
		const response = await fetch(url, option)
		const data = await response.json()

	}

	return (
		<div className="ShoppingCart">
			<h1>Your Cart Items</h1>

			{products.map((product) => {
				if (cart[product.id] !== 0) {
					return <CartItem promoCode={promoCode} product={product} quantity={cart[product.id]} />;
				}
				return null;
			})}

			{(totalPrice > 0) ? (
				<div>
					{(promoCode === 1) ? (<>

						<h3>Total amount: ${Number(totalPrice).toFixed(2)}</h3>

					</>) : (<>

						<h3>Total amount: ${Number(totalPrice * promoCode).toFixed(2)}
						</h3>

					</>)}

					<button onClick={handleReset}>Reset Cart</button>
					<button onClick={handleBuy}>Buy!</button>

					<div className="discount-code">
						<input
							type="text"
							value={promoCodeValue}
							onChange={(e) => setPromoCodeValue(e.target.value)}
							placeholder="Enter discount code"
						/>
						<button onClick={() => checkPromoCode(promoCodeValue)}>Apply</button>
					</div>

					{(promoCode !== 1) && <p className="green">Discount approved: {100 - (promoCode * 100)}% off</p>}

				</div>
			) : (
				<p>Add some items to the cart.</p>
			)}
		</div>
	);
}	  