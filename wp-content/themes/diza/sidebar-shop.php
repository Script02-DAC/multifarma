<?php
$class_shop = '';
$sidebar_configs = diza_tbay_get_woocommerce_layout_configs();
$sidebar_id = $sidebar_configs['sidebar']['id'];

if( empty($sidebar_id) )  return;

if( diza_woo_is_vendor_page() ) {
	$class_shop .= ' vendor_sidebar';
}

if( diza_woo_is_wcmp_vendor_store() ) {
	$sidebar_id = 'wc-marketplace-store';
}

if( !is_singular( 'product' ) ) {
	$product_archive_layout  =   ( isset($_GET['product_archive_layout']) ) ? $_GET['product_archive_layout'] : diza_tbay_get_config('product_archive_layout', 'shop-left');

	$class_sidebar = ( $product_archive_layout !== 'full-width' ) ? ' d-none d-xl-block' : '';
} else {
	$class_sidebar = ' d-none d-xl-block';
}


?> 
<?php  if (  isset($sidebar_configs['sidebar']) && is_active_sidebar($sidebar_id) ) : ?>

	<aside id="sidebar-shop" class="sidebar <?php echo esc_attr($class_sidebar); ?> <?php echo esc_attr($sidebar_configs['sidebar']['class']); ?> <?php echo esc_attr($class_shop); ?>">
		<?php dynamic_sidebar($sidebar_id); ?>
	</aside>

<?php endif; ?>