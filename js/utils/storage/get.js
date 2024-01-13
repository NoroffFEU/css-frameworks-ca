export function get(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}
