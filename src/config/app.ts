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
