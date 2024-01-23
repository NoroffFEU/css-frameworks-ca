import * as utils from "../storage/storage.js";

export function getToken() {
  const token = utils.load("token");
  return token;
}
