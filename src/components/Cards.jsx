import { useNavigate } from "react-router-dom"

export default function Cards({ cart, addItemInCart, product, promoCode }) {

	const cartItemAmount = cart[product.id]

	// Adderar varans ID i addItemInCart
	function handleClick(id) {
		addItemInCart(id)
	}

	return (
		<>
			<div product={product.id} className='card'>
				<img src={product.url} alt="picture" />
				<h3>{product.title}</h3>

				<div className="productPrice">
					{(promoCode === 1) ? (
						<p className="bold">${product.price}</p>
					) : (
						<>
							<p className="line-through bold"> ${product.price}</p>

							<p className="red bold">${Number(product.price * promoCode).toFixed(2)}

							</p>
						</>
					)}

				</div>

				<p>stock balance: {product.stock_balance}</p>
				{
					(product.stock_balance > 0 && product.stock_balance > cartItemAmount) ?

						<button id={product.id} onClick={() => handleClick(product.id)}>Add to Cart{cartItemAmount > 0 && <>({cartItemAmount})</>}</button>
						:
						<p className="red">out of stock</p>

				}
			</div>
		</>
	)
}