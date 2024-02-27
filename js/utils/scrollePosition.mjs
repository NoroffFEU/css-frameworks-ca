export function storeScrollPosition() {
  const scrollPosition = window.scrollY;
  sessionStorage.setItem('scrollPosition', scrollPosition);
}

export function restoreScrollPosition() {
  const scrollPosition = sessionStorage.getItem('scrollPosition');
  if (scrollPosition !== null) {
    window.scrollTo(0, parseInt(scrollPosition));
    sessionStorage.removeItem('scrollPosition');
  }
}