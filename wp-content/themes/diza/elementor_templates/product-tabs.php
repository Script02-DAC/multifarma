<?php 
/**
 * Templates Name: Elementor
 * Widget: Products Tabs
 */

$cat_operator = 'IN';

extract( $settings );

$this->settings_layout();
 
$_id = diza_tbay_random_key();

$this->add_render_attribute('row', 'class', ['products']);

if ($ajax_tabs === 'yes') {
    $attr_row = $this->get_render_attribute_string('row'); 

    $json = array(
        'categories'            => $categories,
        'cat_operator'          => $cat_operator,
        'limit'                 => $limit,
        'orderby'               => $orderby,
        'order'                 => $order,
        'product_style'         => $product_style,
        'attr_row'              => $attr_row,
    );

    $encoded_settings  = wp_json_encode( $json ); 

    $tabs_data = 'data-atts="'. esc_attr( $encoded_settings ) .'"';

    $this->add_render_attribute('wrapper', 'class', 'ajax-active'); 
} else {
    $tabs_data = ''; 
}

?>

<div <?php echo trim($this->get_render_attribute_string('wrapper')); ?>>
    
    <?php $this->render_element_heading(); ?>

    <ul class="product-tabs-title tabs-list nav nav-tabs" <?php echo trim($tabs_data); ?>>
        <?php $__count = 0;?>
        <?php foreach ($list_product_tabs as $key) {
            $active = ($__count==0)? 'active':'';

            $product_tabs = $key['product_tabs'];
            $title = $this->get_title_product_type($product_tabs);
            if(!empty($key['product_tabs_title']) ) {
                $title = $key['product_tabs_title'];
            }
            $this->render_product_tabs($product_tabs, $key['_id'], $_id, $title, $active);
            $__count++;   
        }
        ?>
    </ul>

    <?php $this->render_product_tabs_content($list_product_tabs, $_id); ?>
    

</div>