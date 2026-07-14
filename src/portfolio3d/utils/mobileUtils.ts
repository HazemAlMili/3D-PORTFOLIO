/**
 * mobileUtils.ts
 * Shared mobile/touch device detection utilities.
 * Using pointer media query as the primary signal (most reliable cross-browser).
 */

let _isMobile: boolean | null = null;

/**
 * Returns true if the device is a touch/mobile device.
 * Result is memoized after first call.
 */
export function isMobileDevice(): boolean {
  if (_isMobile !== null) return _isMobile;
  if (typeof window === "undefined") return false;
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
    _isMobile = true;
    return true;
  }
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    _isMobile = true;
    return true;
  }
  _isMobile = false;
  return false;
}
