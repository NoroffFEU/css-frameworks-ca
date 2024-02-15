export function getParamFromUrl(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName);
  if (!paramValue) {
    throw new Error(`Sorry, we couldn't find the ${paramName} you're looking for.`);
  }
  return paramValue;
}
