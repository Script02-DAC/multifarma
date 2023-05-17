<?php
/**
 * @version    1.0
 * @package    diza
 * @author     Thembay Team <support@thembay.com>
 * @copyright  Copyright (C) 2019 Thembay.com. All Rights Reserved.
 * @license    GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Websites: https://thembay.com
 */
  function diza_child_enqueue_styles() {
    wp_enqueue_style( 'diza-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'diza-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( 'diza-style' ),
        wp_get_theme()->get('Version')
    );
  }

add_action(  'wp_enqueue_scripts', 'diza_child_enqueue_styles', 10000 );