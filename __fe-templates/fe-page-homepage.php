<?php
/**
 * Template Name: FE Dev - Homepage
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package cta_custom
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main">

			<?php
				get_template_part( '__fe-template-parts/fe-component', 'story-block' );
				get_template_part( '__fe-template-parts/fe-component', 'cat-slider' );
				get_template_part( '__fe-template-parts/fe-component', 'brand-promo' );
			?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();