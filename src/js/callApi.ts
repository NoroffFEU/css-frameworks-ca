export default async function callApi(
  endpoint: string,
  callBack: Function,
  options: {}
) {
  const response = await fetch(endpoint, options);
  const data = await response.json();
  callBack(data);
}
