import React from "react"
import { Link } from "react-router-dom"
import { ShoppingCart } from "phosphor-react"
import '../css/Navbar.css'

export default function Navbar({ cart }) {

	let number = 0

	// Visar antal produkter finns i kundvagn
	Object.entries(cart).forEach(([itemID, quantity]) => {
		if (quantity !== 0) {
			console.log('itemID:', itemID, 'quantity', quantity);

			number += quantity
		}
	})

	return (
		<>
			<nav className="navbar">
				<div className="links">
					<Link to="/">Products</Link>
					<Link to="/cart"><ShoppingCart size={25} />
						{(number !== 0) && <> {number} </>}
					</Link>
				</div>
			</nav>
		</>
	)
}