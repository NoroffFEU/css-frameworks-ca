import callApi from "./callApi.js";
import endpointObject from "./endpoints.js";
import optionFactory from "./optionFactory.js";
const endpoint = endpointObject("Jarle");

export default async function commentPost(message: string, id: number) {
  const postOption = optionFactory("POST", { body: message }, endpoint);
  const data = await callApi(endpoint.comment(id), postOption);
}
