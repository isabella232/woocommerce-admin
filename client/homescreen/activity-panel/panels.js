/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import OrdersPanel from './orders';
import StockPanel from './stock';
import ReviewsPanel from './reviews';

export function getAllPanels( {
	countLowStockProducts,
	countUnapprovedReviews,
	countUnreadOrders,
	isTaskListHidden,
	manageStock,
	orderStatuses,
	publishedProductCount,
	reviewsEnabled,
	totalOrderCount,
} ) {
	return [
		totalOrderCount > 0 && {
			className: 'woocommerce-homescreen-card',
			count: countUnreadOrders,
			collapsible: true,
			id: 'orders-panel',
			initialOpen: true,
			panel: (
				<OrdersPanel
					countUnreadOrders={ countUnreadOrders }
					orderStatuses={ orderStatuses }
				/>
			),
			title: __( 'Orders', 'woocommerce-admin' ),
		},
		totalOrderCount > 0 &&
			publishedProductCount > 0 &&
			isTaskListHidden === 'yes' &&
			manageStock === 'yes' && {
				className: 'woocommerce-homescreen-card',
				count: countLowStockProducts,
				id: 'stock-panel',
				initialOpen: false,
				collapsible: countLowStockProducts !== 0,
				panel: (
					<StockPanel
						countLowStockProducts={ countLowStockProducts }
					/>
				),
				title: __( 'Stock', 'woocommerce-admin' ),
			},
		publishedProductCount > 0 &&
			isTaskListHidden === 'yes' &&
			reviewsEnabled === 'yes' && {
				className: 'woocommerce-homescreen-card',
				id: 'reviews-panel',
				count: countUnapprovedReviews,
				initialOpen: false,
				collapsible: countUnapprovedReviews !== 0,
				panel: (
					<ReviewsPanel
						hasUnapprovedReviews={ countUnapprovedReviews > 0 }
					/>
				),
				title: __( 'Reviews', 'woocommerce-admin' ),
			},
		// Add another panel row here
	].filter( Boolean );
}
