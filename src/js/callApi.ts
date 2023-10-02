export default async function callApi(
  endpoint: string,
  options: {}
): Promise<[]> {
  const response = await fetch(endpoint, options);
  const data = await response.json();
  console.log(data, "author????");
  if (data.length > 0 && data) {
    return data;
  } else {
    throw new Error("there was an error");
  }
}
