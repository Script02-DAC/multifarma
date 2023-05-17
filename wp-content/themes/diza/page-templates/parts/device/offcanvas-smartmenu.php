<?php 
    $location = 'mobile-menu';
    $tbay_location  = '';
    if ( has_nav_menu( $location ) ) { 
        $tbay_location = $location;
    }

    $menu_attribute         = '';
    $menu_title             = diza_tbay_get_config('menu_mobile_title', 'Menu mobile');
    $menu_search_category   = diza_tbay_get_config('enable_menu_mobile_search_category', false); 

    $menu_third             = diza_tbay_get_config('enable_menu_third', false);  
    $menu_third_id          =  diza_tbay_get_config('menu_mobile_third_select');

    $menu_counters          = diza_tbay_get_config('enable_menu_mobile_counters', false);  

    $menu_second            = diza_tbay_get_config('enable_menu_second', false);  


    /*Socials*/
    $enable_menu_social           = diza_tbay_get_config('enable_menu_social', false); 

    if( $enable_menu_social ||  $menu_third) {
        $menu_attribute    .= 'data-enablebottom="true" '; 
    }

    if( $enable_menu_social ) {
        $social_slides            = diza_tbay_get_config('menu_social_slides');  

        $social_array = array();

        if(count($social_slides) == 1 && empty($social_slides['0']['title']) && empty($social_slides['0']['url']) ) {
             $menu_attribute           .= 'data-enablesocial="false" '; 
        } else {
            $menu_attribute    .= 'data-enablesocial="true" ';
            foreach ($social_slides as $index => $val) {

                $social_array[$index]['icon']     =   $val['title'];
                $social_array[$index]['url']      =   $val['url'];
            }

            $social_json = str_replace('"', "'", json_encode($social_array));

            $menu_attribute         .= 'data-socialjsons="' . $social_json . '" ';
        }

    }

    /*tabs icon*/
    if( $menu_second ) {

        $menu_second_id         =  diza_tbay_get_config('menu_mobile_second_select');

        $menu_tab_one           = diza_tbay_get_config('menu_mobile_tab_one', 'Menu');
        $menu_tab_one_icon      = diza_tbay_get_config('menu_mobile_tab_one_icon', 'fa fa-bars');            

        $menu_tab_second        = diza_tbay_get_config('menu_mobile_tab_scond', 'Categories');
        $menu_tab_second_icon   = diza_tbay_get_config('menu_mobile_tab_second_icon', 'fa fa-th');


        $menu_attribute         .= 'data-enabletabs="' . $menu_second . '" ';


        $menu_attribute         .= 'data-tabone="' . $menu_tab_one . '" ';
        $menu_attribute         .= 'data-taboneicon="' . $menu_tab_one_icon . '" ';            

        $menu_attribute         .= 'data-tabsecond="' . $menu_tab_second . '" ';
        $menu_attribute         .= 'data-tabsecondicon="' . $menu_tab_second_icon . '" ';

    }

    /*Effect */
    $enable_effects            = diza_tbay_get_config('enable_menu_mobile_effects', false);  
    $menu_attribute           .= 'data-enableeffects="' . $enable_effects . '" '; 

    if($enable_effects) {
        $effects_panels        =  diza_tbay_get_config('menu_mobile_effects_panels', '');
        $effects_listitems     =  diza_tbay_get_config('menu_mobile_effects_listitems', '');

        $menu_attribute         .= 'data-effectspanels="' . $effects_panels . '" ';
        $menu_attribute         .= 'data-effectslistitems="' . $effects_listitems . '" ';
    }


    $menu_attribute         .= 'data-counters="' . $menu_counters . '" ';
    $menu_attribute         .= 'data-title="' . $menu_title . '" ';

    $menu_one_id    =  diza_tbay_get_config('menu_mobile_one_select');

?>
  
<div id="tbay-mobile-smartmenu" <?php echo trim($menu_attribute); ?> class="tbay-mmenu d-xl-none"> 

    <?php if( $menu_third ) : ?>
        <div id="mm-searchfield" class="mm-searchfield__input" >

            <?php if( isset($menu_third) && $menu_third ) : ?>
            <div class="mmenu-account">
                <?php 
                    $args_third = array(
                        'menu'    => $menu_third_id,
                        'fallback_cb' => '',
                    );

                    $menu_third_name = $menu_third_id;
                    if( !empty($menu_third_id) ) {
                        $menu_third_obj = wp_get_nav_menu_object($menu_third_id);
                        $menu_third_name = diza_get_transliterate($menu_third_obj->slug);
                    }

                    $args_third['container_id']       =   'mobile-menu-third-mmenu';
                    $args_third['items_wrap']               =   '<ul id="%1$s" class="%2$s" data-id="'. $menu_third_name .'">%3$s</ul>';
                    $args_third['menu_id']            =   'main-mobile-third-mmenu-wrapper';
                    $args_third['walker']             =   new Diza_Tbay_mmenu_menu();
               

                    wp_nav_menu($args_third);
                ?>
            </div> 
            <?php endif; ?>

        </div>

    <?php endif; ?>

    <div class="tbay-offcanvas-body">

        <nav id="tbay-mobile-menu-navbar" class="menu navbar navbar-offcanvas navbar-static">
            <?php


                $args = array(
                    'fallback_cb' => '',
                );

                $menu_name = $menu_id = '';

                if( empty($menu_one_id) ) {
                    $locations  = get_nav_menu_locations();

                    if ( !empty( $locations[ $tbay_location ] )) {
                        $menu_id    = $locations[ $tbay_location ] ;
                        $menu_obj   = wp_get_nav_menu_object( $menu_id );
                    }
                    $args['theme_location']     = $tbay_location;
                } else {
                    $menu_obj = wp_get_nav_menu_object($menu_one_id);
                    $args['menu']               = $menu_one_id;
                }

                if ( !empty($menu_obj) ) {
                    $menu_name = diza_get_transliterate($menu_obj->slug);
                }

                $args['container_id']       =   'main-mobile-menu-mmenu';
                $args['items_wrap']         =   '<ul id="%1$s" class="%2$s" data-id="'. $menu_name .'">%3$s</ul>';
                $args['menu_id']            =   'main-mobile-menu-mmenu-wrapper';
                $args['walker']             =   new Diza_Tbay_mmenu_menu();

                wp_nav_menu($args);


                if( isset($menu_second) && $menu_second ) {

                    $args_second = array(
                        'menu'    => $menu_second_id,
                        'fallback_cb' => '',
                    );

                    $menu_second_name = $menu_second_id;
                    if( !empty($menu_second_id) ) {
                        $menu_second_obj = wp_get_nav_menu_object($menu_second_id);
                        $menu_second_name = diza_get_transliterate($menu_second_obj->slug);
                    }

                    $args_second['container_id']       =   'mobile-menu-second-mmenu';
                    $args_second['menu_id']            =   'main-mobile-second-mmenu-wrapper';
                    $args_second['items_wrap']         =   '<ul id="%1$s" class="%2$s" data-id="'. $menu_second_name .'">%3$s</ul>';
                    $args_second['walker']             =   new Diza_Tbay_mmenu_menu();
               

                    wp_nav_menu($args_second);

                }


            ?>
        </nav>
 

    </div>
</div>