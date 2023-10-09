import callApi from "./callApi";
import endpointObject from "./endpoints";
import optionFactory from "./optionFactory";

const endpoint = endpointObject("Jarle");
const put = optionFactory("PUT", {}, endpoint);

export default async function reactToPost(symbol: string, id: string) {
  const data = await callApi(endpoint.react(symbol, id), put);
  console.log(data);
}
