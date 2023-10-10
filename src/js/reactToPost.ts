import callApi from "./callApi.js";
import endpointObject from "./endpoints.js";
import optionFactory from "./optionFactory.js";

const endpoint = endpointObject("Jarle");
const put = optionFactory("PUT", { body: "test" }, endpoint);

export default async function reactToPost(symbol: string, id: string) {
  const data = await callApi(endpoint.react(symbol, id), put);
  console.log(data);
}
