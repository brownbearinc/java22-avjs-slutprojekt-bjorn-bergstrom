

export default function CartItem({ promoCode, product, quantity }) {


	// Next mission:
	// <button id={product.id} onClick={handleClick}>Add/Remove</button>

	function handleClick() {
		// Remove or add more items to the cart
	}

	return (
		<div className="cartItem">
			<img src={product.url} alt="" />
			<div>
				<h3>{product.title}</h3>
				<p>Qty: {quantity}</p>
				<div className="pricebox">
					{(promoCode === 1) ? (
						<p className="bold">${product.price * quantity}</p>
					) : (
						<>
							<p className="line-through ml5 bold"> ${product.price * quantity}</p>
							<p className="red ml5 bold">${Number(product.price * promoCode * quantity).toFixed(2)}</p>
						</>
					)}

				</div>


			</div>
		</div>
	)
}