export default async function callApi(
  endpoint: string,
  options: {}
): Promise<[]> {
  try {
    const response = await fetch(endpoint, options);
    const data = await response.json();
    console.log(data);
    if (data.length > 0 && data) {
      return data;
    } else {
      throw new Error("response is empty, or not what expected");
    }
  } catch (err) {
    console.log(err.message);
  }
}
