<?php 

if( !(defined('DIZA_WOOCOMMERCE_ACTIVED') && DIZA_WOOCOMMERCE_ACTIVED) || is_user_logged_in() ) return;

do_action( 'diza_woocommerce_before_customer_login_form' ); 
?>

<div id="custom-login-wrapper" class="modal fade" role="dialog">

    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <button type="button" class="btn-close" data-dismiss="modal"><i class="tb-icon tb-icon-cross2"></i></button>
            <div class="modal-body">

                <ul class="nav nav-tabs">
                    <li><a data-toggle="tab" class="active" href="#tab-customlogin"><i class="tb-icon tb-icon-user d-xl-none"></i><?php esc_html_e('Login', 'diza'); ?></a></li>

                    <?php if ( get_option( 'woocommerce_enable_myaccount_registration' ) === 'yes' ) : ?>
                    <li><a data-toggle="tab" href="#tab-customregister"><i class="tb-icon tb-icon-pencil4 d-xl-none"></i><?php esc_html_e('Register', 'diza'); ?></a></li>
                    <?php endif; ?>

                </ul>

                <div class="tab-content clearfix">
                    <div id="tab-customlogin" class="tab-pane fade show active">
                        <form id="custom-login" class="ajax-auth" action="login" method="post">
                            <?php do_action( 'woocommerce_login_form_start' ); ?>

                            <h3><?php esc_html_e('Enter your username and password to login.', 'diza'); ?></h3>
                            <p class="status"></p>  
                            <?php wp_nonce_field('ajax-login-nonce', 'security'); ?>  
                            <input id="cus-username" type="text" placeholder="<?php esc_attr_e('Username/ Email', 'diza'); ?>" class="required form-control" name="username" autocomplete="username" value="<?php echo ( ! empty( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; ?>">
                            <input id="cus-password" type="password" placeholder="<?php esc_attr_e('Password', 'diza'); ?>" class="required form-control" name="password" autocomplete="current-password"> 
                            
                            <div class="rememberme-wrapper">
                                <input name="rememberme" type="checkbox" id="cus-rememberme" value="forever">
                                <label for="cus-rememberme"><?php esc_html_e('Remember me', 'diza'); ?></label>
                            </div>
                            <a id="pop_forgot" class="text-link" href="<?php
                            echo wp_lostpassword_url(); ?>"><?php esc_html_e('Lost password?', 'diza'); ?></a>
                            <input class="submit_button<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>" type="submit" value="<?php esc_html_e('Login', 'diza') ?>">

                            <div class="clear"></div>
                            <?php do_action( 'woocommerce_login_form_end' ); ?>
                        </form>
                    </div>

                    <?php if ( get_option( 'woocommerce_enable_myaccount_registration' ) === 'yes' ) : ?>
                    <div id="tab-customregister" class="tab-pane fade">
                        <form id="custom-register" class="ajax-auth"  action="register" method="post">
                            <?php do_action( 'woocommerce_register_form_start' ); ?>

                            <h3><?php esc_html_e('Fill to the forms to create your account', 'diza'); ?></h3>
                            <p class="status"></p>
                            <?php wp_nonce_field('ajax-register-nonce', 'signonsecurity'); ?>         
                            <input id="signonname" type="text" placeholder="<?php esc_attr_e('Username', 'diza'); ?>" name="signonname" class="required form-control" value="<?php echo ( ! empty( $_POST['signonname'] ) ) ? esc_attr( wp_unslash( $_POST['signonname'] ) ) : ''; ?>">
                            <input id="signonemail" type="text" placeholder="<?php esc_attr_e('Email', 'diza'); ?>" class="required email form-control" name="email" autocomplete="email" value="<?php echo ( ! empty( $_POST['email'] ) ) ? esc_attr( wp_unslash( $_POST['email'] ) ) : ''; ?>">
                            <input id="signonpassword" type="password" placeholder="<?php esc_attr_e('Password', 'diza'); ?>" class="required form-control" name="signonpassword" autocomplete="new-password">
                            
                            <?php if( diza_tbay_get_config('show_confirm_password', true) ) : ?>
                                <input type="password" id="password2" placeholder="<?php esc_attr_e('Confirm Password', 'diza'); ?>" class="required form-control" name="password2" autocomplete="new-password">
                            <?php endif; ?>

                            <input class="submit_button<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>" type="submit" value="<?php esc_html_e('Register', 'diza'); ?>">

                            <div class="clear"></div>
                            <?php do_action( 'diza_custom_woocommerce_register_form_end' ); ?>
                        </form>
                    </div>
                    <?php endif; ?>

                    <?php if( class_exists('NextendSocialLogin') ) echo '<div class="log-with-social">'; ?>
                        <?php do_action( 'woocommerce_register_form_end' ); ?>
                    <?php if( class_exists('NextendSocialLogin') ) echo '</div>'; ?>
                </div>
            </div>
        </div>
    </div>
</div>