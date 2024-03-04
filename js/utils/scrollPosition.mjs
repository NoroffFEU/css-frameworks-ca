/**
 * Stores the current scroll position in sessionStorage.
 */
export function storeScrollPosition() {
  const scrollPosition = window.scrollY;
  sessionStorage.setItem("scrollPosition", scrollPosition);
}

/**
 * Restores the scroll position from sessionStorage.
 */
export function restoreScrollPosition() {
  const scrollPosition = sessionStorage.getItem("scrollPosition");
  if (scrollPosition !== null) {
    window.scrollTo(0, parseInt(scrollPosition));
    sessionStorage.removeItem("scrollPosition");
  }
}
