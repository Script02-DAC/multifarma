<?php

error_reporting(0);
ini_set("display_errors", false);

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'multifarmas' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'pGezU]i+xUL@MdW8)z[v/7R;4?{s{,e?IC>v_ha4&Paj?e/c}@!%7K>@r!oIQ]n.' );
define( 'SECURE_AUTH_KEY',  'i8AKqO%(e=F?6Q. r<jq/R>+8W>7`_EO/Xz*Z5297=??0j`bT!q.iGzNkCNYn&pY' );
define( 'LOGGED_IN_KEY',    '0Ja;QZn<0HGv5rf9RA_:zu QbVE>_rz%3?sM5f{ukRT*wWvs3w:K*u/A0k}FB4*Z' );
define( 'NONCE_KEY',        'x^%;$cs>K}l@Y0i.f/Krwl<{ew@88./DiDR8^C.QW?(xqll*%`tlUM?]%3`U@1Vq' );
define( 'AUTH_SALT',        '=1:ZSltO6Dc&k#pHCbIak]6DOcSca)yo9L7aV8|P*J@Fbg[wSOj>%yJD@e|9B8]]' );
define( 'SECURE_AUTH_SALT', 'a`udiF)!yZ@k;nUj~D`4[v@oIGFLsc IRm0J&+y=D{v`$>^CX2Ekm_X<}O1Tapod' );
define( 'LOGGED_IN_SALT',   '_moYn]=l=jB4!HibRIMu8b!;]Yg|wNpM0!pxTMA,+=ruo#k|SG@q?_M{t2S5>^cV' );
define( 'NONCE_SALT',       'l6^1!kxD6ysM}*1!!Ez_onpsvQsmmwd@rQsw-;a<4g[JhOp6Lyiq8_WMY7I)<}Ku' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
