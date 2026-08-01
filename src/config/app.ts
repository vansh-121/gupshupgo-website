/**
 * Shared app-wide configuration constants.
 *
 * Single source of truth for the Android package name, the Play Store listing
 * URL, the canonical site origin, and the platform availability label.
 * `DownloadButton.tsx` is the only module that imports `PLAY_STORE_URL`.
 */
export const PACKAGE_NAME = 'com.gupshupgo.app';
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;
export const SITE_URL = 'https://www.gupshupgo.app';
export const PLATFORM_LABEL = 'Available on Android';

/**
 * Single build-time gate for every GupShupGo Pro surface on this site.
 *
 * This mirrors the Android app's `pro_enabled` Remote Config flag, which is
 * currently **false**: the Pro UI is hidden in the app and nothing is
 * purchasable while Google Play merchant approval is still outstanding. A site
 * that advertises Pro while the app cannot sell it makes an unfulfillable
 * claim, so every Pro claim here is gated on this constant.
 *
 * It must stay `false` until Play merchant approval lands and `pro_enabled` is
 * flipped to `true` in Remote Config. Flipping this one constant to `true`
 * restores every Pro surface on the site — the Pro section, the Pro feature
 * entry and its nav link, the Pro badges, and the Pro FAQ answers — because all
 * of that content is still present in the codebase, only gated.
 */
export const PRO_LAUNCHED = false;
