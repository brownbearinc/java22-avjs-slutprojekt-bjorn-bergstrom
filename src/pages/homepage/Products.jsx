import Cards from './Cards';
import '../../css/Products.css';

export default function Products({ cart, addItemInCart, database, promoCode }) {

	return (
		<div>
			<h1>Västerbottensost produkter</h1>
			<div className="products">

				{database.map((product) => (
					<Cards cart={cart} addItemInCart={addItemInCart} product={product} promoCode={promoCode} />
				))}

			</div>
		</div>

	);
}
