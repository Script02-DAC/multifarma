<?php

$footer = apply_filters('diza_tbay_get_footer_layout', 'footer_default');

?>

	</div><!-- .site-content -->
	<?php if (diza_tbay_active_newsletter_sidebar()) : ?>
		<div id="newsletter-popup" class="newsletter-popup">
			<?php dynamic_sidebar('newsletter-popup'); ?>
		</div>
	<?php endif; ?>
	
	<footer id="tbay-footer" class="tbay-footer <?php echo (!empty($footer)) ? esc_attr($footer) : ''; ?>">
		<?php if ($footer != 'footer_default'): ?>
			
			<?php diza_tbay_display_footer_builder(); ?>

		<?php else: ?> 
			
			<?php get_template_part('page-templates/footer-default'); ?>
			
		<?php endif; ?>			
	</footer><!-- .site-footer -->

	<?php
        /**
         * diza_after_do_footer hook.
         *
         * @hooked diza_after_do_footer - 10
         */
        do_action('diza_after_do_footer');
    ?>
	
</div><!-- .site -->

<?php wp_footer(); ?>

</body>
</html>