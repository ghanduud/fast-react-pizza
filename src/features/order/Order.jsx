// Test ID: IIDSAT

import OrderItem from './OrderItem';
import Button from '../../ui/Button';

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder, updateOrder } from '../../services/apiRestaurant';
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers';
import { useEffect } from 'react';

function Order() {
	const order = useLoaderData();

	// Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
	const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = order;

	const fetcher = useFetcher();

	useEffect(
		function () {
			if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
		},
		[fetcher]
	);

	const deliveryIn = calcMinutesLeft(estimatedDelivery);

	return (
		<div className='space-y-8 px-4 py-6'>
			<div className='flex flex-wrap items-center justify-between gap-2'>
				<h2 className='text-xl font-semibold'>Order #{id} status</h2>

				<div className='space-x-2'>
					{priority && (
						<span className='rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50'>
							Priority
						</span>
					)}
					<span className='rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50'>
						{status} order
					</span>
				</div>
			</div>

			<div className='flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5'>
				<p className='font-medium'>
					{deliveryIn >= 0
						? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
						: 'Order should have arrived'}
				</p>
				<p className='text-xs text-stone-500'>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
			</div>

			<ul className='dive-stone-200 divide-y border-b border-t'>
				{cart.map((item) => (
					<OrderItem
						item={item}
						key={item.pizzaId}
						ingredients={fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? []}
						isLoadingIngredients={fetcher.state === 'loading'}
					/>
				))}
			</ul>

			<div className='space-y-2 bg-stone-200 px-6 py-5'>
				<p className='text-sm font-medium text-stone-600'>Price pizza: {formatCurrency(orderPrice)}</p>
				{priority && (
					<p className='text-sm font-medium text-stone-600'>
						Price priority: {formatCurrency(priorityPrice)}
					</p>
				)}
				<p className='font-bold'>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
			</div>
			<fetcher.Form method='PATCH' className='text-right'>
				<Button type='primary'>Make Priority</Button>
			</fetcher.Form>
		</div>
	);
}

export async function action({ params }) {
	const data = { priority: true };
	await updateOrder(params.orderId, data);
	return null;
}

export async function loader({ params }) {
	const order = await getOrder(params.orderId);
	return order;
}

export default Order;
