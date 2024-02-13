import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { decreasingItemQuantity, deleteItem, increasingItemQuantity } from './cartSlice';

function CartItem({ item }) {
	const { pizzaId, name, quantity, totalPrice } = item;

	const dispatch = useDispatch();

	function handleDeleteItem(pizzaId) {
		dispatch(deleteItem(pizzaId));
	}

	return (
		<li className='py-3 sm:flex sm:items-center sm:justify-between'>
			<p className='mb-1 sm:mb-0'>
				{quantity}&times; {name}
			</p>
			<div className='flex items-center justify-between sm:gap-6'>
				<p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
				<div className='flex items-center gap-1 md:gap-3'>
					<Button type='round' onClick={() => dispatch(decreasingItemQuantity(pizzaId))}>
						-
					</Button>
					<span>{quantity}</span>
					<Button type='round' onClick={() => dispatch(increasingItemQuantity(pizzaId))}>
						+
					</Button>
				</div>
				<Button type='small' onClick={() => handleDeleteItem(pizzaId)}>
					Delete
				</Button>
			</div>
		</li>
	);
}

export default CartItem;
